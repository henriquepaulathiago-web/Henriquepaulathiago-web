import chalk from "chalk";
import fs from "fs";
import path from "path";

const BANCODADOS = path.join(import.meta.dirname, 'base.txt');

function lerDados(nomeArquivo){
    const dados = fs.readFileSync(nomeArquivo, "utf-8").split(/\r?\n/);
    const produtos = [];
    dados.forEach(dado => {
        produtos.push(new Produto(dado));
    });
    return produtos;
}

function mostrarProdutos(produtos){
    console.log(chalk.bgBlueBright(" Nome do produto\t\t\t| Preço\t | Estoque\t"));
    produtos.forEach(produto => {
        let tamanho = produto.nome.length;
        console.log(chalk.rgb(60, 0, 150)(`${produto.nome}\t| R$ ${produto.preco}\t| ${produto.estoque}`));
    });
    console.log(chalk.bgGreen(`Total de Produtos: ${produtos.length}`));
}

function Produto(linha){
    const propriedades = linha.split("|");
    const prod = {};
    propriedades.forEach(propriedade => {
        const atributos = propriedade.split(":");
        prod[atributos[0].trim()] = atributos[1].trim();
    });
    this.nome = prod.nome;
    this.preco = Number.parseFloat(prod.preco);
    this.estoque = Number.parseInt(prod.estoque);
}

function rodarServidor(){
    const listaDeProdutos = lerDados(BANCODADOS);
    mostrarProdutos(listaDeProdutos);
}

rodarServidor();