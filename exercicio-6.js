// Crie um script que mostre na tela o conteúdo de um arquivo escolhido pela pessoa usuária:
// Pergunte à pessoa usuária qual arquivo ela deseja ler.
// Leia o arquivo indicado.
// Caso o arquivo não exista, exiba na tela "Arquivo inexistente" e encerre a execução do script.
// Caso o arquivo exista, escreva seu conteúdo na tela.

const fs = require("fs").promises;
const readline = require("readline");

// criando uma interface que retorna uma promisse
const question = (message) => {
  // A sintaxe abaixo é padrão para a criação de uma interface no readline (vide documentação)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    // Nesse caso essa promisse só terá o param resolve, pois o tratamento do reject será realizado por outra função que irá trabalhar com o conteúdo digitado pelo usuário no terminal
    rl.question(message, (answer) => {
      rl.close(); // Isso é necessário pois precisamos liberar o terminal para outro "serviço"
      resolve(answer); // retorna a string que o usuário digitou
    });
  });
};

const start = async () => {
  const fileName = await question(
    "Digite o caminho do arquivo que deseja ler: "
  ); // vai iniciar o interface e armazenar na variável 'fileName' a string que o usuário digitou
  try {
    const fileContent = await fs.readFile(fileName, "utf-8"); // Tenta abrir o arquivo utilizando a string que o usuário digitou no terminal
    console.log(fileContent);
  } catch (err) {
    throw new Error(err.message);
  }
};

start();
