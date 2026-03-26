# ANTT Freight

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

API que realiza webscraping da portaria SUROC/ANTT publicada no Diário Oficial da União (DOU) e disponibiliza os coeficientes de custo do frete rodoviário de carga via endpoint REST.

## 🔑️ Key components

1. Scraper

Faz fetch direto na URL da [portaria SUROC nº 4](https://www.in.gov.br/en/web/dou/-/portaria-suroc-n-4-de-20-de-marco-de-2026-694437180) do DOU, com cache de 24h para evitar requests desnecessários.

2. Parser

Utiliza [Cheerio](https://cheerio.js.org/) para extrair as 4 tabelas de coeficientes (A, B, C, D) do HTML retornado.

| Tabela | Descrição |
|--------|-----------|
| A | Carga Lotação — composição veicular ou caminhão simples |
| B | Carga Lotação — apenas unidade de tração |
| C | Alto Desempenho — composição veicular ou caminhão simples |
| D | Alto Desempenho — apenas unidade de tração |

## 💨️ Running Project

```shell
npm install
npm run start:dev
```

## 📡️ API

```shell
curl -X POST http://localhost:3333/frete/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "tabela": "A",
    "tipo_carga": "granel_sólido",
    "eixos": 5,
    "distancia": 500,
    "retorno_vazio": false
  }'
```

Tipos de carga disponíveis:

`granel_sólido` · `granel_líquido` · `frigorificada_ou_aquecida` · `conteinerizada` · `carga_geral` · `neogranel` · `perigosa_(granel_sólido)` · `perigosa_(granel_líquido)` · `perigosa_(frigorificada_ou_aquecida)` · `perigosa_(conteinerizada)` · `perigosa_(carga_geral)` · `carga_granel_pressurizada`

## 🧗️ Authors

- [Wagner Nascimento](https://github.com/WagnerNasc)

## 📓️ License

This project is licensed under the [CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/)
