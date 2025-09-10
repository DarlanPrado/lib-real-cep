# 📦 real-cep

Biblioteca simples para validação e consulta de **CEPs do Brasil**, além de fornecer utilitários de estados e municípios via **IBGE** e dataset interno.

## 🚀 Instalação

```bash
npm install real-cep
# ou
yarn add real-cep
# ou
pnpm add real-cep
```

## 📖 Uso básico

```ts
import { Validator, Cep, Regiao } from "real-cep"
```

---

## 🔍 Validação de CEP

```ts
// Valida se o CEP é válido (com ou sem traço)
Validator.isValid("12345-678") // true
Validator.isValid("12345678")  // true
Validator.isValid("00000000")  // false
```

---

## 📬 Consultar CEP

```ts
// Consulta informações de um CEP via API externa
const data = await Cep.search("01001-000")

console.log(data)
/*
{
  cep: "01001-000",
  logradouro: "Praça da Sé",
  bairro: "Sé",
  localidade: "São Paulo",
  uf: "SP",
  ibge: "3550308",
  ...
}
*/
```

---

## 🌎 Dados regionais (IBGE + Dataset)

```ts
// Buscar todos os estados do IBGE
const estados = await Regiao.findEstados()
console.log(estados)

/*
[
  { id: 35, sigla: "SP", nome: "São Paulo" },
  { id: 33, sigla: "RJ", nome: "Rio de Janeiro" },
  ...
]
*/

// Buscar todos os municípios do IBGE
const municipios = await Regiao.findMunicipios()
console.log(municipios)

// Acessar dataset estático de municípios
import { MUNICIPIOS } from "real-cep"

console.log(MUNICIPIOS["SP"]) // municípios de São Paulo
```

---

## 📌 Recursos disponíveis

* `Validator.isValid(cep: string)` → valida o CEP.
* `Cep.search(cep: string)` → consulta CEP na API externa.
* `Regiao.findEstados()` → lista estados do IBGE.
* `Regiao.findMunicipios()` → lista municípios do IBGE.
* `Regiao.municipios` → dataset estático com todos os municípios.
* `MUNICIPIOS` → exportação direta do dataset de municípios.

---

## 🛠️ Roadmap

* [ ] Suporte a cache de consultas
* [ ] Integração completa com o IBGE
* [ ] Tipagem avançada dos retornos de API
* [ ] Suporte a busca de CEP offline via dataset interno

---

## 📄 Licença

MIT © Darlan Prado
