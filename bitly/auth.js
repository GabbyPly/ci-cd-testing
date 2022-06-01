const { OAuthRedirectUrl, OAuthTokenUrl, UserUrl } = require('./consts');

const { CLIENT_SECRET, CLIENT_ID } = process.env;

const getAuthURL = (data) => {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: data.input.redirect_uri,
    });
    return `${OAuthRedirectUrl}?${params.toString()}`;
};
const getAccessToken = async (data) => {
    const { fetch } = data.libs;
    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: data.input.code || null,
        redirect_uri: data.input.redirect_uri,
    });

    const r = await fetch(OAuthTokenUrl, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' }, // Essential
    });

    const jsonResponse = r.json;
    return jsonResponse;
};

const verifyAPI = async (data) => {
    const { fetch } = data.libs;
    const r = await fetch(UserUrl);
    return r.json;
};

const getConnectionName = async ({ input }) => input.name || input.login || 'Problem getting name';

module.exports = {
    type: 'oauth2',
    config: {
        authURL: getAuthURL,
        getAccessToken,
        getConnectionName,
    },
    verifyAPI,
};
