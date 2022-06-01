const OAuthRedirectUrl = 'https://auth.calendly.com/oauth/authorize';
const OAuthTokenUrl = 'https://auth.calendly.com/oauth/token';
const GRANT_TYPE_CODE = 'authorization_code';
const GRANT_TYPE_REFRESH = 'refresh_token';
// some change
const statusOptions = [
  { text: 'Active', value: '&status=active' },
  { text: 'Canceled', value: '&status=canceled' },
  { text: 'All', value: 'all' },
];

module.exports = {
  OAuthRedirectUrl,
  OAuthTokenUrl,
  GRANT_TYPE_CODE,
  GRANT_TYPE_REFRESH,
  statusOptions,
};
