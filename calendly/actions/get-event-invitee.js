const { validateURI } = require('../utils');
const { statusOptions } = require('../consts');

const sampleData = {};
const getEventInvitee = async (data) => {
  const { fetch } = data.libs;
  const { inviteeUri } = data.input;
  validateURI(inviteeUri, ['scheduled_events/', '/invitees/']);
  const [uriId, inviteeId] = inviteeUri
    .split('scheduled_events/')[1]
    .split('/invitees/');
  const url = `https://api.calendly.com/scheduled_events/${uriId}/invitees/${inviteeId}`;
  const r = await fetch(url);
  return r.json;
};

module.exports = {
  key: 'get_event_invitee',
  noun: 'event',
  title: 'Get an event invitee',
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
    {
      key: 'inviteeUri',
      name: 'Invitee name',
      description: 'gabby',
      type: 'string',
      required: true,
      depends_on: ['uri'],
      source: 'list_event_invitees.id',
    },
  ],
  handler: getEventInvitee,
  sample: sampleData,
};
