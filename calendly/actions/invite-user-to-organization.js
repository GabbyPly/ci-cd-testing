const { validateURI } = require('../utils');

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const sampleData = {};
const inviteUserToAnOrganization = async (data) => {
  const {
    libs: { fetch },
    input: { userEmail },
    authData: { organization: orgUrl },
  } = data;
  if (!validateEmail(userEmail)) return { error: 'Invalid Email' };
  validateURI(orgUrl, ['/organizations/']);
  const orgId = orgUrl.split('/organizations/')[1];
  const url = `https://api.calendly.com/organizations/${orgId}/invitations`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail }),
  };
  const r = await fetch(url, options);
  return r.json.resource;
};

module.exports = {
  key: 'invite_user_to_organization',
  noun: 'user',
  title: 'Invite user to an organization',
  type: 'write',
  params: [
    {
      key: 'userEmail',
      name: 'User email',
      description: 'john_doe@gmail.com',
      type: 'string',
      required: true,
    },
  ],
  handler: inviteUserToAnOrganization,
  sample: sampleData,
};
