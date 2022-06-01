const { OAuthRedirectUrl, OAuthTokenUrl } = require('./consts');
const { GRANT_TYPE_CODE, GRANT_TYPE_REFRESH } = require('./consts');

const { CLIENT_SECRET, CLIENT_ID } = process.env;

const getAuthURL = (data) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: data.input.redirect_uri,
    response_type: 'code',
  });
  return `${OAuthRedirectUrl}?${params.toString()}`;
};

const getAccessToken = async (data) => {
  const { fetch } = data.libs;
  const body = new URLSearchParams({
    grant_type: GRANT_TYPE_CODE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: data.input.code || null,
    redirect_uri: data.input.redirect_uri,
  });
  const headers = { 'Content-type': 'application/x-www-form-urlencoded' }; // This is the default header
  const r = await fetch(OAuthTokenUrl, {
    method: 'POST',
    headers,
    body,
  });
  return r.json;
};

const refreshAccessToken = async (data) => {
  const { fetch } = data.libs;
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    refresh_token: data.input.refresh_token,
    redirect_uri: data.input.redirect_uri,
    grant_type: GRANT_TYPE_REFRESH,
    client_secret: CLIENT_SECRET,
  });
  const r = await fetch(OAuthTokenUrl, {
    method: 'POST',
    body,
  });
  return r.json;
};

const verifyAPI = async (data) => {
  const { fetch } = data.libs;
  const url = `https://api.calendly.com/users/me`;
  const r = await fetch(url);
  return r.json;
};

const getConnectionName = async (data) =>
  data.input.resource.name || 'Problem getting name';

module.exports = {
  type: 'oauth2',
  config: {
    authURL: getAuthURL,
    getAccessToken,
    refreshAccessToken,
    getConnectionName,
  },
  verifyAPI,
};
