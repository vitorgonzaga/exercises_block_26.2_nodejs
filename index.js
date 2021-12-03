const myFunction = (param1, param2, param3) => {
  return new Promise((resolve, reject) => {
    if (
      typeof param1 !== "number" ||
      typeof param2 !== "number" ||
      typeof param3 !== "number"
    )
      reject("Informe apenas números");

    const result = (param1 + param2) * param3;

    if (result < 50) {
      return reject("Valor muito baixo");
    }

    resolve(result);
  });
};

console.log("função myFunction declarada");

// exemplos:

// myFunction(10, 10, 10)
//   .then((resolve) => console.log(resolve))
//   .catch((error) => console.log(error));

// console.log("exemplo 1");

// myFunction(1, 1, "a")
//   .then((resolve) => console.log(resolve))
//   .catch((error) => console.log(error));

// console.log("exemplo 2");

// myFunction(1, 1, 1)
//   .then((resolve) => console.log(resolve))
//   .catch((error) => console.log(error));

// console.log("exemplo 3");

// função para criar um número aleatório entre 0 e 100
const getRandomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

console.log("funcao getRandomNumber declarada");

// funcao para criar um array de tamanho 3 com número aleatórios entre 0 e 100
const randomArrayNumbers = () => {
  return Array.from({ length: 3 }).map(getRandomNumber);
};

console.log("funcao ramdomArrayNumbers declarada");

// funcao para chamar a funcao assincrona

const callMyFunction = () => {
  const numbers = randomArrayNumbers();
  console.log("numbers: ", numbers);
  myFunction(...numbers)
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));
};

callMyFunction();

console.log("ultimo teste");
