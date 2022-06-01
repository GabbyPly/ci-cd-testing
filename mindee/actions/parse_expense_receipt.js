const FormData = require('form-data');
const { EXPENSE_RECEIPT } = require('../consts');

const parseExpenseReceipt = async (data) => {
    const { fetch } = data.libs;
    const form = new FormData();
    const { expense_receipt_url } = data.input;
    const url = 'https://api.mindee.net/v1/products/mindee/expense_receipts/v3/predict';
    form.append('document', expense_receipt_url);
    const { json } = await fetch(url, {
        method: 'POST',
        body: form,
        headers: { api_to_use: EXPENSE_RECEIPT },
    });

    const { api_request, ...item } = json;
    return item;
};

module.exports = {
    key: 'parse_expense_receipt',
    noun: 'expense receipt',
    title: 'Parse an expense receipt',
    type: 'write',
    params: [
        {
            key: 'expense_receipt_url',
            name: 'Expense receipt URL',
            description: 'https://sample-expense-receipts.com/sample-expense-receipt#1',
            type: 'string',
            required: true,
        },
    ],
    handler: parseExpenseReceipt,
};
