// Exercicio 1 =============================================

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

// Exercicio 2 =========================================================

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

// Exercicio 3 ======================================================
// Reescreva o código do exercício anterior para que utilize async/await.

const callMyFunction2 = async () => {
  const numbers = randomArrayNumbers();
  console.log("numbers2: ", numbers);
  console.log("com async/await");
  // A sintaxe Try/catch deve ser utilizada para o tratamento de erros
  try {
    // Para isso lembre-se que é necessário atribuir o resultado da função a uma variável, nesse caso fora utilizado "result"
    const result = await myFunction(...numbers);
    // Considerando que o retorno do "resolve" da promisse em questão é um string, basta utilizar um console.log para a variável "result"
    console.log(result);
  } catch (batatinha) {
    console.error(batatinha); // usei "batatinha" só para testar se funcionava e funcionou perfeitamente.
  }
};

callMyFunction2();
