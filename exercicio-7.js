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
  try {
    const fileName = await question(
      "Digite o caminho do arquivo que deseja ler: "
    ); // vai iniciar o interface e armazenar na variável 'fileName' a string que o usuário digitou
    const fileContent = await fs.readFile(fileName, "utf-8"); // Tenta abrir o arquivo utilizando a string que o usuário digitou no terminal
    console.log(fileContent);
    // if (!fileContent) return;
    const oldWord = await question("Qual palavra deseja substituir? ");
    const newWord = await question("E qual palavra deve ficar em seu lugar? ");
    const newContent = fileContent.replace(new RegExp(oldWord, "g"), newWord);
    console.log("Resultado da substituição: ");
    console.log(newContent);
    const path = await question(
      "Onde deseja salvar o resultado (informe o caminho + o nome do arquivo)? "
    );
    await fs.writeFile(path, newContent);
  } catch (err) {
    throw new Error(err.message);
  }
};

start();
