const sampleData = {};
const getMe = async (data) => {
  const { fetch } = data.libs;
  const url = `https://api.calendly.com/users/me`;
  const r = await fetch(url);
  return r.json.resource;
};

module.exports = {
  key: 'get_me',
  noun: 'user',
  title: 'Get me',
  type: 'read',
  params: [],
  handler: getMe,
  sample: sampleData,
};
