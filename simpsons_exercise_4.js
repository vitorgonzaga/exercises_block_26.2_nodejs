// 1. Crie uma função que leia todos os dados do arquivo e imprima cada personagem no formato id - Nome . Por exemplo: 1 - Homer Simpson .
// step by step
// importar o modulo fs/promises
// converter o conteudo do arquivo em objeto javascript (JSON.parse)
// Mapear cada item gerando um array de strings no formato `${id} - ${nome}`
// Exibir as strings na tela (iterar sobre o array de strings e para cada item chamar um console.log)

const fs = require("fs").promises;

fs.readFile("./simpsons.json", "utf-8")
  .then((fileContent) => {
    console.log("fileContent: ", fileContent); // [ {"id": "1", "name": "Homer Simpson"}.. ] - chave e valor dentro de aspas duplas (formato JSON)
    const result = JSON.parse(fileContent); // O JSON.parse transforma o json em objeto javascript (retira as aspas duplas)
    console.log("result tratado: ", result);
    return result;
  })
  .then((arrObjSimpsons) => {
    console.log("arrObjSimpsons: ", arrObjSimpsons);
    return arrObjSimpsons.map(({ id, name }) => `${id} - ${name}`); // Lembrando que o retorno do map é um novo array. Nesse caso um array onde cada item é uma string
  })
  .then((arrStrings) => {
    console.log("arrStrings: ", arrStrings);
    arrStrings.forEach((string) => console.log(string));
  });

// 2. Crie uma função que receba o id de uma personagem como parâmetro e retorne uma Promise que é resolvida com os dados da personagem que possui o id informado. Caso não haja uma personagem com o id informado, rejeite a Promise com o motivo "id não encontrado".
