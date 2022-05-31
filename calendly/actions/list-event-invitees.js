const { validateURI } = require('../utils');
const { statusOptions } = require('../consts');

const sampleData = {};
const listEventInvitees = async (data) => {
  const { fetch } = data.libs;
  const { uri } = data.input;
  validateURI(uri, ['scheduled_events/']);
  const uuid = uri.split('scheduled_events/');
  const url = `https://api.calendly.com/scheduled_events/${uuid[1]}/invitees`;
  const r = await fetch(url);
  return { results: r.json.collection };
};

const mappingHandler = ({ results }) => ({
  results: results.map((obj) => ({
    option: obj.email || obj.name,
    value: obj.uri,
  })),
});

module.exports = {
  key: 'list_event_invitees',
  noun: 'invitee',
  title: 'List event invitees',
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
      name: 'Event type/name',
      description: '15 Minute Meeting',
      type: 'string',
      required: true,
      source: 'list_events.id',
      depends_on: ['status'],
    },
  ],
  handler: listEventInvitees,
  sample: sampleData,
  is_multiple: true,
  ac_mappings: mappingHandler,
};
