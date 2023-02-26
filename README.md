# Stumble Guys NODE
Utilize esse módulo para interagir com o servidor do jogo Stumble Guys.

# 🚀 Como Instalar
```
npm i stumble-guys-node
```

# 💎 Como utilizar

```js
// Verificando todos os torneios do jogo (agendado/já no jogo)
const StumbleGuys = require('stumble-guys-node');
const sg = new StumbleGuys();

let server = "sa";
// Servidor que você deseja ver os torneios (VAZIO = TODOS)

await sg.getTournamentsList(server) // Retorna um array com todos o torneios
    .then(response => {
        console.log(`Torneios:\n${response.map(x => `${x.tournamentName} [${x.tournamentIcon}]`)}`);
    });
```
Em breve mais atualizações. :)
