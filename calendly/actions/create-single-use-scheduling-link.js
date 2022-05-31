const sampleData = {};
const createSingleUseLink = async (data) => {
  const { fetch } = data.libs;
  const { uri } = data.input;
  const body = {
    max_event_count: 1,
    owner: uri,
    owner_type: 'EventType',
  };
  const url = `https://api.calendly.com/scheduling_links`;
  const headers = { 'Content-Type': 'application/json' };
  const r = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  // Should be leaved as return r.json.resource and let user see owner as well ?
  return { Link: r.json.resource.booking_url };
};
module.exports = {
  key: 'create_link',
  noun: 'link',
  title: 'Create scheduling link',
  type: 'write',
  params: [
    {
      key: 'uri',
      name: 'Event types',
      description: '15 Minute Meeting',
      type: 'string',
      required: true,
      source: 'list_event_types.id',
    },
  ],
  handler: createSingleUseLink,
  sample: sampleData,
};
