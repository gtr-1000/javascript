# Library Catalog Parser

Um pequeno utilitário em JavaScript que recebe um catálogo "cru" de biblioteca
(linhas de texto separadas por `|`) e transforma em dados estruturados: parsing,
busca por autor, agrupamento por década, validação de entradas e exportação
para JSON/CSV.

Este projeto existe em **duas versões** propositalmente — não são a mesma
solução com sintaxes diferentes por acaso, mas duas formas de pensar o mesmo
problema:

| Arquivo | Estilo | Por quê |
|---|---|---|
| `library-catalog-classic.js` | Loops `for` tradicionais, sem métodos de array de alto nível | Base sólida: mostra que o algoritmo é entendido no nível de iteração, índice e acumulador manual |
| `library-catalog-modern.js` | ES6+: `map`, `filter`, `reduce`, destructuring, arrow functions | Código idiomático: mostra fluência no JavaScript que se espera em produção hoje |

## O que cada versão resolve

- **`parseCard` / `parseCatalog`** — transforma cada linha crua
  (`"Título | Autor | Ano | Local"`) em um objeto `{ title, author, year, location }`,
  preenchendo `"Unknown"` para campos ausentes.
- **`findByAuthor`** — busca parcial e case-insensitive pelo nome do autor.
- **`groupByDecade`** — agrupa os livros por década (`"1980s"`, etc.), com um
  balde `"Unknown"` para livros sem ano.
- **`renderEntry`** — formata uma entrada como bloco de texto legível.
- **`validateEntry`** — verifica se uma entrada tem todos os campos obrigatórios
  preenchidos (nenhum ausente ou igual a `"Unknown"`).
- **`exportToJSON` / `exportToCSV`** — exporta o catálogo inteiro nos dois formatos.

## Por que a versão moderna é escrita do jeito que é

Não é só "trocar `for` por `map`". Cada troca resolve algo específico:

- **`reduce` em `groupByDecade`** evita reescrever a lógica de "criar o balde
  se ele não existir" duas vezes (uma para `"Unknown"`, outra para a década) —
  o operador `??=` cobre os dois casos com uma linha.
- **Destructuring com valores default** em `renderEntry` substitui os quatro
  `||| "Unknown"` repetidos por um único ponto de fallback, direto na
  assinatura da função.
- **`.every()` em `validateEntry`** transforma quatro blocos `if` quase
  idênticos em uma lista de campos obrigatórios — adicionar um novo campo
  obrigatório vira uma linha, não um novo `if`.
- **`Math.min`/`Math.max` com spread** em vez de acumuladores manuais
  (`Infinity` / `0`) elimina o risco de esquecer de inicializar a variável
  errada.

Ambas as versões têm exatamente a mesma assinatura de função e o mesmo
comportamento — dá para rodar os mesmos casos de teste contra as duas e
comparar a saída.

## Como rodar

```bash
node library-catalog-classic.js
node library-catalog-modern.js
```

## Casos de borda cobertos

O catálogo de exemplo inclui entradas com dados faltando de propósito:

- Título ausente
- Autor ausente
- Ano ausente
- Localização ausente

Essas linhas testam se o parser preenche `"Unknown"` corretamente em vez de
quebrar ou propagar `undefined`.
