const parseInvoice = require('./parse_invoice');
const parseExpenseReceipt = require('./parse_expense_receipt');

const actions = {
    [parseInvoice.key]: parseInvoice,
    [parseExpenseReceipt.key]: parseExpenseReceipt,
};

module.exports = actions;
