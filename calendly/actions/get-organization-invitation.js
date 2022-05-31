const { validateURI } = require('../utils');
const sampleData = {};
const getOrganizationInvitations = async (data) => {
  const {
    libs: { fetch },
    input: { invitationUrl },
    authData: { organization: orgUrl },
  } = data;
  validateURI(invitationUrl, ['/invitations/']);
  validateURI(orgUrl, ['/organizations/']);
  const inviteId = invitationUrl.split('/invitations/')[1];
  const orgId = orgUrl.split('/organizations/')[1];
  const url = `https://api.calendly.com/organizations/${orgId}/invitations/${inviteId}`;
  const r = await fetch(url);
  return r.json.resource;
};

module.exports = {
  key: 'get_organization_invitation',
  noun: 'invitation',
  title: 'Get organization invitation',
  type: 'read',
  params: [
    {
      key: 'invitationUrl',
      name: 'Event types',
      description: '15 Minute Meeting',
      type: 'string',
      required: true,
      source: 'list_organization_invitations',
    },
  ],
  handler: getOrganizationInvitations,
  sample: sampleData,
};
