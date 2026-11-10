# NBA Player Sorter

Um ranking interativo dos principais times da NBA na temporada 2026/27, inspirado no fluxo do [Player Sorter](https://player-sorter.github.io/#/mens-clubs).

## Como usar

Abra `index.html` no navegador. Escolha um time ou use o botão de time aleatório, compare os jogadores do elenco em pares e veja o seu ranking final. Também é possível escolher **Ranking da Liga** para comparar 30 dos principais jogadores da NBA.

O projeto é uma aplicação estática, sem dependências de build ou servidor. O `index.html` é o ponto de entrada; os estilos ficam em `assets/css/styles.css` e a aplicação em `assets/js/app.js`.

Os elencos foram atualizados com base na lista oficial de jogadores da [NBA](https://www.nba.com/players). Como os dados ficam incorporados na aplicação estática, eles representam um retrato da consulta realizada e podem ser sincronizados novamente quando houver novas trocas, dispensas ou contratações.

## Estrutura

```text
index.html
assets/
  data/2026-27.js
  css/styles.css
  js/app.js
  js/sorter.js
  js/ui.js
```

Essa organização segue o padrão de recursos estáticos do projeto Player Sorter de referência e mantém o site compatível com GitHub Pages sem etapa de build.