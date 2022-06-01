const { EXPENSE_RECEIPT } = require('./consts');

// Add headers needed of the access token
const applyToRequest = function (url, options, data) {
    // Way to differ invoice key from receipt key
    if (data.authData && (data.authData.invoice_api_key || data.authData.receipt_api_key)) {
        options.headers = options.headers || {};
        if (options.headers.api_to_use === EXPENSE_RECEIPT) {
            options.headers['Authorization'] = `Token ${data.authData.receipt_api_key}`;
        } else {
            options.headers['Authorization'] = `Token ${data.authData.invoice_api_key}`;
        }
    }

    return { url, options };
};

module.exports = {
    beforeMiddlewares: [applyToRequest],
    afterMiddlewares: [],
};
