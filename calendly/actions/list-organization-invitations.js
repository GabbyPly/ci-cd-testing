const { validateURI } = require('../utils');

const sampleData = {};
const listOrganizationInvitations = async (data) => {
  const {
    libs: { fetch },
  } = data;
  const { organization: orgUrl } = data.authData;
  validateURI(orgUrl, ['/organizations/']);
  const orgId = orgUrl.split('/organizations/')[1];
  const url = `https://api.calendly.com/organizations/${orgId}/invitations`;
  const r = await fetch(url);
  if (r.json.collection.length < 1) {
    return { results: ['No invitations sent to this organization'] };
  }
  return { results: r.json.collection };
};

module.exports = {
  key: 'list_organization_invitations',
  noun: 'invitation',
  title: 'List organization invitations',
  type: 'read',
  params: [],
  handler: listOrganizationInvitations,
  sample: sampleData,
  is_multiple: true,
  ac_mappings: { option: 'email', value: 'uri' },
};
