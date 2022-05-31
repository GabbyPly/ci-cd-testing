const { statusOptions } = require('../consts');

const { validateURI } = require('../utils');
function mappingHandler(data) {
  const { results } = data;
  const events = results.map((obj) => {
    validateURI(obj.event_memberships[0].user, ['users/']);
    const option = obj.event_guests.email
      ? `Event guest: ${obj.event_guests.email}`
      : `Event name: ${obj.name}`;
    return {
      option,
      value: obj.uri,
    };
  });
  return { ...data, results: events }; // Left data as preparation for pagination
}

const sampleData = {};
const listEvents = async (data) => {
  const {
    libs: { fetch },
    authData: { owner: ownerUrl },
    input: { status },
  } = data;
  const finalStatus = status === 'all' ? '' : status;
  const url = `https://api.calendly.com/scheduled_events?user=${ownerUrl}${finalStatus}`;
  const r = await fetch(url);
  return { results: r.json.collection };
};

module.exports = {
  key: 'list_events',
  noun: 'event',
  title: 'List events',
  type: 'read',
  params: [
    {
      key: 'status',
      name: 'Event status',
      description: 'Active/Cancelled',
      type: 'select',
      options: statusOptions,
      required: true,
    },
  ],
  handler: listEvents,
  ac_mappings: mappingHandler,
  is_multiple: true,
  sample: sampleData,
};
