const validBankCodes = require('./assets/validBankCodes');

function validateBankAccount(bankAccountNumber) {

	//Remove all non-digit characters.
	bankAccountNumber = bankAccountNumber.replace(/\D/g, '');

	//Check the length.
	if (bankAccountNumber.length !== 16 && bankAccountNumber.length !== 24) {
		return false;
	}

	//Append trailing zeros if the bank account number is only 16 digits long.
	if (bankAccountNumber.length === 16) {
		bankAccountNumber += '00000000';
	}
	  
	//Check if the first three digits of the bank account number are a valid bank code.
	const bankCode = parseInt(bankAccountNumber.slice(0, 3), 10);
	if (!validBankCodes[bankCode]) {
	  return false;
	}
  
	//Split the bank account number into its parts.
	const firstPart = bankAccountNumber.slice(0, 8);
	const secondPart = bankAccountNumber.slice(8, 24);

	//Validate the check digits.
	const parts = [firstPart, secondPart];
	const weights = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3, 1, 9, 7, 3, 1];

	for (let part of parts) {
		let digits = part.toString().split('');
		digits = digits.map(Number)

		//Loop through the digits
		let sum = 0;
		for (let i = 0; i < digits.length; i++) {
			sum += digits[i] * weights[i];
		}
		
		//Check if sum can be divided by 10
		if(sum % 10 != 0) {
			return false;
		}
	}

	//Insert hyphens.
	let formattedNumber = bankAccountNumber.replace(/(\d{8})(\d{8})(\d{8})/, '$1-$2-$3');
	  
	//If the bank account number is valid, return the name of the bank and the BIC code
	return {
		bic: validBankCodes[bankCode].bicCode,
		name: validBankCodes[bankCode].bankName,
		number: formattedNumber
	};
}

module.exports = validateBankAccount;
