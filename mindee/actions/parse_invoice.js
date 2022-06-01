const FormData = require('form-data');

const parseInvoice = async (data) => {
    const { fetch } = data.libs;
    const form = new FormData();
    const { invoice_url } = data.input;
    const url = 'https://api.mindee.net/v1/products/mindee/invoices/v3/predict';
    form.append('document', invoice_url);
    const { json } = await fetch(url, {
        method: 'POST',
        body: form,
    });

    const { api_request, ...item } = json;
    return item;
};

module.exports = {
    key: 'parse_invoice',
    noun: 'invoice',
    title: 'Parse an invoice',
    type: 'write',
    params: [
        {
            key: 'invoice_url',
            name: 'Invoice URL',
            description: 'https://sample-invoices.com/sample_invoice#1',
            type: 'string',
            required: true,
        },
    ],
    handler: parseInvoice,
};
