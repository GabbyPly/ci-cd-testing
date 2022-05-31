const sampleData = {};

const listEventTypes = async (data) => {
  const { fetch } = data.libs;
  const { owner: ownerUrl } = data.authData;
  const url = `https://api.calendly.com/event_types?user=${ownerUrl}`;
  const { json } = await fetch(url);

  const eventTypes = json.collection.map((obj) => {
    const event = obj;
    delete event.description_html;
    return event;
  });
  return { results: eventTypes };
};

module.exports = {
  key: 'list_event_types',
  noun: 'type',
  title: 'List event types',
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
