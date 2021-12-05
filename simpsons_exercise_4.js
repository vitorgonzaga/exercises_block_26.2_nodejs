// 1. Crie uma função que leia todos os dados do arquivo e imprima cada personagem no formato id - Nome . Por exemplo: 1 - Homer Simpson .
// step by step
// importar o modulo fs/promises
// converter o conteudo do arquivo em objeto javascript (JSON.parse)
// Mapear cada item gerando um array de strings no formato `${id} - ${nome}`
// Exibir as strings na tela (iterar sobre o array de strings e para cada item chamar um console.log)

// ==========================================================================

const fs = require("fs").promises;

// ==========================================================================

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

const getSimpsonById = async (id) => {
  // atribuindo o retorno da promisse a uma variável
  const simpsons = await fs
    .readFile("./simpsons.json", "utf-8") // o retorno dessa leitura vem no formato JSON
    .then((fileContent) => JSON.parse(fileContent));

  const findCharacter = simpsons.find((item) => item.id === id);

  console.log("Dados do personagem encontrado: ", findCharacter);

  if (!findCharacter) {
    throw new Error("id não encontrado");
    /* A palavra-chave `throw` dispara um erro que deve ser tratado por quem chamou nossa função.
     * Em funções `async`, utilizar `throw` faz com que a Promise seja rejeitada,
     * tendo como motivo o que passarmos para o `throw`.
     * Ou seja, a linha abaixo rejeita a Promise da nossa função com o motivo 'id não encontrado'
     */
  }
  return findCharacter;
  /* Da mesma forma que `throw` aciona o fluxo de erro e rejeita a Promise,
   * `return` aciona o fluxo de sucesso e resolve a Promise.
   * Sendo assim, a linha abaixo é equivalente a chamar `resolve(chosenSimpson)`
   * dentro do executor de uma Promise.
   */
};

//utilizando try/catch para tratar um possível erro de leitura do arquivo json
const getSimpsonById2 = async (id) => {
  try {
    // atribuindo o retorno da promisse a uma variável
    const simpsons = await fs
      .readFile("./simpsons.json", "utf-8") // o retorno dessa leitura vem no formato JSON
      .then((fileContent) => JSON.parse(fileContent));
    const findCharacter = simpsons.find((item) => item.id === id);
    console.log("Dados do personagem encontrado: ", findCharacter);
    if (!findCharacter) {
      throw new Error("id não encontrado");
    }
    return findCharacter;
  } catch (err) {
    // Esse cacth é para tratamento de erro com a promisse apenas. Qualquer outro tratamento deve ser tratado a parte.
    throw new Error(err.message);
  }
};

// exemplo:
getSimpsonById2("10");

// Crie uma função que altere o arquivo simpsons.json retirando os personagens com id 10 e 6.

const updateSimpsons = async () => {
  try {
    const simpsons = await fs
      .readFile("./simpsons.json", "utf-8")
      .then((fileContent) => JSON.parse(fileContent));
    // O JSON.parse transforma para objeto, contudo importante lembrar que os objetos estão envoltos por [], ou seja, já são um array.
    const idsToExclude = ["10", "6"];
    const arrSimpsons = simpsons.filter(
      (item) => !idsToExclude.includes(item.id)
    );
    console.log("arrSimpsons", arrSimpsons);
    return arrSimpsons;
  } catch (err) {
    throw new Error(err.message);
  }
};

updateSimpsons();

// Crie uma função que leia o arquivo simpsons.json e crie um novo arquivo, chamado simpsonFamily.json , contendo as personagens com id de 1 a 4.

const getDataSimpsons = async () => {
  try {
    const simpsons = await fs
      .readFile("./simpsons.json", "utf-8")
      .then((fileContent) => JSON.parse(fileContent));
    console.log("getDataSimpsons", simpsons);
    return simpsons;
  } catch (err) {
    throw new Error(err.message);
  }
};

const filterSimpsonsFamily = async () => {
  try {
    const data = await getDataSimpsons();
    const arrFamilyIds = ["1", "2", "3", "4"];
    const filteredData = data.filter((person) =>
      arrFamilyIds.includes(person.id)
    );
    console.log("filteredData", filteredData);
    // ==========================================================================================
    // await fs.writeFile("./family-simpsons.json", JSON.stringify(filteredData), {
    //   flag: "wx",
    // }); // A flag 'wx' não sobscreve o arquivo caso ele já exista, ao inves disso, lança um erro
    // ==========================================================================================
    await fs.writeFile("./family-simpsons.json", JSON.stringify(filteredData));
  } catch (err) {
    throw new Error(err.message);
  }
};

filterSimpsonsFamily();

// Crie uma função que adicione ao arquivo simpsonFamily.json o personagem Nelson Muntz .

const getDataSimpsonsFamily = async () => {
  try {
    const simpsons = await fs
      .readFile("./family-simpsons.json", "utf-8")
      .then((fileContent) => JSON.parse(fileContent));
    return simpsons;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addNelsonMuntz = async () => {
  try {
    // obter os dados de simpsons-family;
    const familyData = await getDataSimpsonsFamily();
    // filtrar os dados ref. a Nelson Muntz;
    const allData = await getDataSimpsons();
    const nelsonData = allData.filter((item) => item.name === "Nelson Muntz");
    // appendar o objeto no arquivo family-simpsons.json (pushing in array);
    familyData.push(...nelsonData);
    // sobrescrever o arquivo simpsons-family.json com os dados atualizados salvos em alguma variável;
    await fs.writeFile("./family-simpsons.json", JSON.stringify(familyData));
  } catch (err) {
    throw new Error(err.message);
  }
};

// addNelsonMuntz(); Essa execução concorre com a função changeNelsonMuntz... Na vida real deve-se criar uma função async para que uma função aguarde o tempo de execução da outra

// Crie uma função que substitua o personagem Nelson Muntz pela personagem Maggie Simpson no arquivo simpsonFamily.json .

const changeNelsonMuntz = async () => {
  try {
    // atribuir uma variavel com os dados da Maggie Simpson
    const maggieSimpson = [{ id: "5", name: "Maggie Simpson" }];
    // obter dados da familia
    const simpsonsFamily = await getDataSimpsonsFamily();
    // criar novo array sem o Nelson;
    const withoutNelson = simpsonsFamily.filter(
      (simpson) => simpson.id !== "8"
    );
    console.log("withoutNelson", withoutNelson);
    // appendar a Maggie
    const withMaggie = withoutNelson.concat(maggieSimpson);
    // sobrescrever o arquivo family-simpsons.json
    console.log(withMaggie);
    await fs.writeFile("./family-simpsons.json", JSON.stringify(withMaggie));
  } catch (err) {
    throw new Error(err.message);
  }
};

changeNelsonMuntz();
