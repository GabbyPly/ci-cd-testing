const sampleData = {};
const listOrganizationMemberships = async (data) => {
  const {
    libs: { fetch },
    authData: { owner: ownerUrl },
  } = data;
  const url = `https://api.calendly.com/organization_memberships?user=${ownerUrl}`;
  const r = await fetch(url);
  return { results: r.json.collection };
};

const mappingHandler = (data) => {
  const results = data.results.map((obj) => ({
    option: obj.user.name,
    value: obj.uri,
  }));
  return { ...data, results }; // Left data as preparation for pagination
};

module.exports = {
  key: 'list_organization_memberships',
  noun: 'membership',
  title: 'List organization memberships',
  type: 'read',
  params: [],
  handler: listOrganizationMemberships,
  sample: sampleData,
  is_multiple: true,
  ac_mappings: mappingHandler,
};
