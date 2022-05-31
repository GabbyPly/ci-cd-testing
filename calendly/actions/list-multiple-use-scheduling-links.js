const sampleData = {};
const listEventTypes = async (data) => {
  const { fetch } = data.libs;
  const { owner: ownerUrl } = data.authData;
  const url = `https://api.calendly.com/event_types?user=${ownerUrl}`;
  const r = await fetch(url);
  const schedulingUrls = r.json.collection.map(
    ({ name, scheduling_url: sUrl }) => ({
      'Event name': name,
      'Scheduling link': sUrl,
    })
  );
  return { results: schedulingUrls };
};

module.exports = {
  key: 'list_scheduling_links',
  noun: 'link',
  title: 'List scheduling links',
  type: 'read',
  params: [],
  handler: listEventTypes,
  sample: sampleData,
  is_multiple: true,
  ac_mappings: {
    option: 'name',
    value: 'uri',
  },
};
