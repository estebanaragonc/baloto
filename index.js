const crypto = require('crypto');

function generateNumbers(numNumbers, rangeMax) {
  const numbers = new Set();
  while (numbers.size < numNumbers) {
    const number = crypto.randomBytes(2).readUInt16LE(0) % (rangeMax + 1);
    numbers.add(number);
  }
  const lastNumber = (crypto.randomBytes(2).readUInt16LE(0) % 16) + 1;  
  numbers.add(lastNumber);
  return Array.from(numbers);
}

function checkLikelihood(generatedNumbers, pastWinningNumbers) {
  let count = 0;
  for (const num of generatedNumbers) {
    if (pastWinningNumbers.includes(num)) {
      count += 1;
    }
  }
  return count / generatedNumbers.length;
}

const generatedNumbers = generateNumbers(6, 46);
const pastWinningNumbers = [2, 14, 23, 27, 32, 46]; // api call on 
//console.log("Baloto hacer: " + generatedNumbers);
const likelihood = checkLikelihood(generatedNumbers, pastWinningNumbers);
// console.log("Probabilidad de caer de nuevo: " + likelihood);