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

// testando a promise:

myFunction(10, 10, 10)
  .then((resolve) => console.log(resolve))
  .catch((error) => console.log(error));

myFunction(1, 1, "a")
  .then((resolve) => console.log(resolve))
  .catch((error) => console.log(error));

myFunction(1, 1, 1)
  .then((resolve) => console.log(resolve))
  .catch((error) => console.log(error));

// const main = () => {

//   const randomNumber1 = Math.floor(Math.random() * 100 + 1 )
//   const randomNumber2 = Math.floor(Math.random() * 100 + 1 )
//   const randomNumber3 = Math.floor(Math.random() * 100 + 1 )

//   const strResult = myFunction(randomNumber1, randomNumber2, randomNumber3)

//   strResult.then()

// }
