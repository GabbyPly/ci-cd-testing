const applyToRequest = function (url, options, data) {
  if (data.authData && data.authData.access_token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${data.authData.access_token}`;
  }
  return { url, options };
};

module.exports = {
  beforeMiddlewares: [applyToRequest],
  afterMiddlewares: [],
};
