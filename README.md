# Stumble Guys NODE
Utilize esse módulo para interagir com o servidor do jogo Stumble Guys.

# 🚀 Como Instalar
```
npm i stumble-guys-node
```

# 💎 Como utilizar

- 🇧🇷 - Verificando todos os torneios do jogo (agendado/já no jogo)<br><br>
- 🇺🇸 - Checking all in-game tournaments (scheduled/already in-game)

```js
const StumbleGuys = require('stumble-guys-node');
const sg = new StumbleGuys();

let server = "sa";
// Servidor que você deseja ver os torneios (VAZIO = TODOS)

await sg.getTournamentsList(server) // Retorna um array com todos o torneios
    .then(response => {
        console.log(`Torneios:\n${response.map(x => `${x.tournamentName} [${x.tournamentIcon}]`)}`);
    });
```

- 🇧🇷 - Conseguindo as informações da conta (nickname/id e etc) pelo accessToken.<br><br>
- 🇺🇸 - Getting account information (nickname/id and etc) by accessToken.

```js
const StumbleGuys = require('stumble-guys-node');
const sg = new StumbleGuys();

await sg.accountInfo("accessToken")
    .then(response => {
        // Resposta de exemplo:
        // Example answer:
        {
            "createdAt": "2023-03-238T18:50:51.145Z",
            "firstname": null,
            "lastname": null,
            "nick": "Nick da Conta",
            "nickhashnumber": 611,
            "id": "1234567890",
            "rank": 0,
            "ntfupdatedat": null,
            "urpupdatedat": null,
            "ban": false,
            "worldrank": 0,
            "remainingReports": 4,
            "reportsResetAt": "2023-03-23T23:03:33.070Z",
        }
    });
```

- 🇧🇷 - Trocando o nick da conta pelo accessToken, vale lembrar que isso não altera dentro do jogo, apenas no servidor do jogo (quando vão te dar ban por exemplo, tem que ser o nick que você trocar aqui.)<br><br>
- 🇺🇸 - Changing the account's nickname for the accessToken, it is worth remembering that this does not change within the game, only on the game server (when they ban you, for example, it has to be the nickname you change here.)

```js
const StumbleGuys = require('stumble-guys-node');
const sg = new StumbleGuys();

await sg.changeNickname("accessToken")
    .then(response => {
        if (response == 200) {
            // Success ✅
        };
    });
```

- 🇧🇷 - Buscando por todas as skins do jogo. [Pode ser de uma versão especifica ou de todas.]<br><br>
- 🇺🇸 - Searching for all skins in the game. [Can be a specific version or all.]

```js
const StumbleGuys = require('stumble-guys-node');
const sg = new StumbleGuys();

await sg.skinsList("0.46")
    .then(response => {
        // Resposta de exemplo:
        // Example answer:

        [
            {
                "FriendlyName": "Dynamitron",
                "SkinID": "SKIN214",
                "Version": "0.31",
                "tier": 6
            }
        ]
    });
```

Em breve mais atualizações. :)
