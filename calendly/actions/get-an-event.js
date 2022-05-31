const { validateURI } = require('../utils');

const sampleData = {};
const getEvent = async (data) => {
  const { fetch } = data.libs;
  const { uri } = data.input;
  validateURI(uri, ['scheduled_events/']);
  const uuid = uri.split('scheduled_events/')[1];
  const url = `https://api.calendly.com/scheduled_events/${uuid}`;
  const r = await fetch(url);
  return r.json;
};

const statusOptions = [
  { text: 'Active', value: '&status=active' },
  { text: 'Canceled', value: '&status=canceled' },
  { text: 'All', value: 'all' },
];

module.exports = {
  key: 'get_event',
  noun: 'event',
  title: 'Get an event',
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
    {
      key: 'uri',
      name: 'Event name/type',
      description: '15 Minute Meeting',
      type: 'string',
      required: true,
      depends_on: ['status'],
      source: 'list_events.id',
    },
  ],
  handler: getEvent,
  sample: sampleData,
};
