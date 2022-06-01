// const sample_url =
//     'https://res.cloudinary.com/practicaldev/image/fetch/s--o8C-S1ZA--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://mindee-public-website.s3.amazonaws.com/documentation/parse_an_invoice_multiples_article.jpg';

const FormData = require('form-data');

const verifyAPI = async (data) => {
    const form = new FormData();
    const {
        authData: { email, valid_image_url },
        libs: { fetch },
    } = data;
    form.append('document', valid_image_url);

    const url = 'https://api.mindee.net/v1/products/mindee/invoices/v3/predict';
    const r = await fetch(url, {
        method: 'POST',
        body: form,
    });
    if (!r.ok) {
        throw new Error('Unsuccessful request');
    }
    const resJSON = { ...r.json, email };

    return resJSON;
};

const getConnectionName = async (data) => {
    return data.input.email || 'Mindee';
};

const AUTH_INSTRUCTIONS = '';

module.exports = {
    type: 'custom',
    config: {
        getConnectionName,
    },
    verifyAPI,
    auth_fields: [
        {
            key: 'invoice_api_key',
            type: 'string',
            description: 'Invoice API Key. Go to Account -> Generate API key',
            text: '91b194487099c5d55858155781d6cf41',
        },
        {
            key: 'receipt_api_key',
            type: 'string',
            description: 'Receipt API Key. Go to Account -> Generate API key',
            text: '91b194487099c5d55858155781d6cf41',
        },
        {
            key: 'email',
            type: 'string',
            description: 'Email account associated with your Mindee account',
            text: 'john_doe@gmail.com',
        },
        {
            key: 'valid_image_url',
            type: 'string',
            description: 'Paste a URL of a valid image file',
            text: 'https://images.com/invoice-no-1.png',
        },
    ],
    auth_instructions: AUTH_INSTRUCTIONS,
};

// Used for custom API (not invoice/receipt)
// {
//     key: 'account_name',
//     type: 'string',
//     description: 'Account name',
//     text: 'john123',
// },
// {
//     key: 'api_name',
//     type: 'string',
//     description: 'API name. To get your API name,go to Account -> Settings',
//     text: 'johndoe@gmail.com',
// },
