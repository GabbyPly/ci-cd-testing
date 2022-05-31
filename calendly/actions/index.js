// const me = require('./me');
const listEvents = require('./list-events');
const getAnEvent = require('./get-an-event');
const listEventTypes = require('./list-event-types');
const listEventInvitees = require('./list-event-invitees');
const getEventInvitee = require('./get-event-invitee');
const listMultipleUseSchedulingLinks = require('./list-multiple-use-scheduling-links');
const singleUseLink = require('./create-single-use-scheduling-link');
const listOrganizationMemberships = require('./list-organization-memberships');
const getOrganizationMembership = require('./get-organization-membership');
const listOrganizationInvitations = require('./list-organization-invitations');
const getOrganizationInvitations = require('./get-organization-invitation');
const inviteUserToAnOrganization = require('./invite-user-to-organization');

const actions = {
  [listEvents.key]: listEvents,
  [getAnEvent.key]: getAnEvent,
  [listEventTypes.key]: listEventTypes,
  [listEventInvitees.key]: listEventInvitees,
  [getEventInvitee.key]: getEventInvitee,
  [listMultipleUseSchedulingLinks.key]: listMultipleUseSchedulingLinks,
  [singleUseLink.key]: singleUseLink,
  [listOrganizationMemberships.key]: listOrganizationMemberships,
  [getOrganizationMembership.key]: getOrganizationMembership,
  [listOrganizationInvitations.key]: listOrganizationInvitations,
  [getOrganizationInvitations.key]: getOrganizationInvitations,
  [inviteUserToAnOrganization.key]: inviteUserToAnOrganization,
  // [me.key]: me,
};

module.exports = actions;
