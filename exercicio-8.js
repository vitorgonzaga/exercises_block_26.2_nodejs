const fizzBuzz = (number) => {
  return new Promise((resolve, reject) => {
    if (number % 3 === 0 && number % 5 === 0) {
      return resolve("FizzBuzz");
    } else if (number % 3 === 0) {
      return resolve("Fizz");
    } else if (number % 5 === 0) {
      return resolve("Buzz");
    } else {
      return reject(number);
    }
  });
};

fizzBuzz(1).catch(console.error); // Deve escrever "1" no console
fizzBuzz(3).then(console.log); // Deve escrever "Fizz" no console
fizzBuzz(5).then(console.log); // Deve escrever "Buzz" no console
fizzBuzz(15).then(console.log); // Deve escrever "FizzBuzz" no console
