export function alphanumericToNumber(code) {
  let num = parseInt(code, 36);

  // If the code is not a valid number, return NaN
  if (isNaN(num)) {
    return NaN;
  }

  // Generate a random number between 0 and 1 using Math.random()
  let random = Math.random();

  // Multiply the random number by 100 to get a new number between 0 and 100
  let scaled = random * 100;

  // Add 1 to the scaled number to get a number between 1 and 100
  let shifted = scaled + 1;

  // Round the shifted number down to the nearest integer
  let result = Math.floor(shifted);

  return result;
}

export function selectHobbies(count, seed) {
    // Load the JSON file
    const hobbies = require('./hobby.json');

    // Check if count is greater than the number of hobbies in the file
    if (count > hobbies.length) {
        return "Count exceeds the number of hobbies in the file";
    }

    // Use the seed value to create a deterministic shuffle
    let shuffledHobbies = hobbies.slice();
    for (let i = shuffledHobbies.length - 1; i > 0; i--) {
        const j = Math.floor((seed + i) % (i + 1));
        [shuffledHobbies[i], shuffledHobbies[j]] = [shuffledHobbies[j], shuffledHobbies[i]];
    }

    // Select the first 5 hobbies from the shuffled array
    return shuffledHobbies.slice(0, count).map(obj => obj.hobby);
}
