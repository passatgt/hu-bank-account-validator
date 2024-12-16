const validateBankAccount = require('../index');

test('Valid OTP Bank account number', () => {
    const result = validateBankAccount('10002003-93489306-00000000');
    expect(result.name).toBe('Magyar Államkincstár');
    expect(result.bic).toBe('HUSTHUHB');
    expect(result.number).toBe('10002003-93489306-00000000');
});

test('Unknown bank account number', () => {
    const result = validateBankAccount('10002003-93489307-00000000');
    expect(result).toBe(false);
});
