const { validateURI } = require('../utils');

const sampleData = {};
const getOrganizationMembership = async (data) => {
  const {
    libs: { fetch },
    input: { membershipUrl },
  } = data;
  validateURI(membershipUrl, ['/organization_memberships/']);
  const membershipId = membershipUrl.split('/organization_memberships/')[1];
  const url = `https://api.calendly.com/organization_memberships/${membershipId}`;
  const r = await fetch(url);
  return r.json.resource;
};
module.exports = {
  key: 'get_organization_membership',
  noun: 'membership',
  title: 'Get organization membership',
  type: 'read',
  params: [
    {
      key: 'membershipUrl',
      name: 'Membership ID',
      description: '1234567890',
      type: 'string',
      required: true,
      source: 'list_organization_memberships',
    },
  ],
  handler: getOrganizationMembership,
  sample: sampleData,
};
