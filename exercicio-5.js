// Crie uma função que lê e escreve vários arquivos ao mesmo tempo.
// Utilize o Promise.all para manipular vários arquivos ao mesmo tempo.
// Dado o seguinte array de strings: ['Finalmente', 'estou', 'usando', 'Promise.all', '!!!'] Faça com que sua função crie um arquivo contendo cada string, sendo o nome de cada arquivo igual a file<index + 1>.txt . Por exemplo, para a string "Finalmente", o nome do arquivo é file1.txt .
// Programe sua função para que ela faça a leitura de todos os arquivos criados no item anterior, armazene essa informação e escreva em um arquivo chamado fileAll.txt .
// O conteúdo do arquivo fileAll.txt deverá ser Finalmente estou usando Promise.all !!! .

const fs = require("fs").promises;

const creatingMultipleFiles = async () => {
  // const arrPromises = [];
  const arrStrings = ["Finalmente", "estou", "usando", "Promise.all", "!!!"];
  arrStrings.forEach((item, index) => {
    const path = "./";
    const fileName = path.concat("file", index + 1, ".txt");
    console.log("fileName: ", fileName);
    // const promise = fs.writeFile(fileName, item);
    // arrPromises.push(promisse);
    // arrPromises.push(fs.writeFile(fileName, item));
    fs.writeFile(fileName, item);
  });
  const fileContents = await Promise.all([
    fs.readFile("./file1.txt", "utf-8"),
    fs.readFile("./file2.txt", "utf-8"),
    fs.readFile("./file3.txt", "utf-8"),
    fs.readFile("./file4.txt", "utf-8"),
    fs.readFile("./file5.txt", "utf-8"),
  ]);
  const newFileContent = fileContents.join(" ");

  await fs.writeFile("./fileAll.txt", newFileContent);
};

// creatingMultipleFiles();

// No caso acima, utilizando o Promise.all seria melhor utilizar o map para iterar no array de strings pois ele retorna um array que pode ser utilizado como parametro dentro da função promise.all()

// Dica: utilze template literal para trabalhar com variaveis dinamicas dentro de uma string;

const creatingMultipleFiles2 = async () => {
  const arrStrings = ["Finalmente", "estou", "usando", "Promise.all", "!!!"];
  const creatingArrayOfOperations = arrStrings.map((item, index) => {
    fs.writeFile(`./file${index + 1}.txt`, item);
  });
  await Promise.all(creatingArrayOfOperations);
  // uma vez criados todos os arquivos temos:
  const arrFileNames = [
    "file1.txt",
    "file2.txt",
    "file3.txt",
    "file4.txt",
    "file5.txt",
  ];
  // utilizando a higher order function MAP, juntamente com o fs.readFile teremos um array com os conteúdos em formato de string em cada item do array. Basta utilizar esse array como param do Promise.all

  const fileContent = await Promise.all(
    arrFileNames.map((fileName) => fs.readFile(fileName, "utf-8"))
  );
  const stringFull = fileContent.join(" ");
  await fs.writeFile("./fileAll.txt", stringFull);
};

creatingMultipleFiles2();
