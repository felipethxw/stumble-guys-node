const core = require("./resources/core.json");

module.exports = class StumbleGuys {
    constructor() { }

    async getTournamentsList(server) {
        if (server?.length > 1 && !['eu', 'sa', 'us', 'asia', 'in'].includes(server?.toLowerCase())) {
            throw new Error("Invalid server [ EU/SA/US/ASIA/IN ]");
        };
        const apiURL = "https://backbone-client-api.azurewebsites.net/api/v2/tournamentGetList";
        const options = {
            method: "POST",
            headers: {
                "Host": "backbone-client-api.azurewebsites.net",
                "User-Agent": "UnityPlayer/2020.3.38f1 (UnityWebRequest/1.0, libcurl/7.80.0-DEV)",
                "Accept": "*/*",
                "BACKBONE_APP_ID": '8561191D-03B7-423E-B779-D2F6E77A3A45',
                "ACCESS_TOKEN": core.ACCESS_TOKEN,
                "X-Unity-Version": "2020.3.38f1",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "sinceDate=2023-02-23T19%3a01%3a48&untilDate=2023-03-12T19%3a01%3a48&maxResults=25&page=1&accessToken=682301312854927512-MbK7nPWPQQRWspCe09sghB2kpIVPyVZS%3aeGcF%2fVXTSrTlVAi6I%2fpOxt6Cner6HkGBhHde4xuuZUjz5CcpsypfXNYQLxPcsOI1WSJf74cglBZFBK1BB2xfug%3d%3d"
        };

        let result;

        await fetch(apiURL, options)
            .then(r => r.json())
            .then(data => {
                if (!server) {
                    let dataMapeada = data.tournaments.map(x => x = {
                        tournamentName: x.name,
                        tournamentId: x.id,
                        tournamentTime: x.tournamenttime,
                        tournamentIcon: x.icon,
                        tournamentData: x.data
                    });

                    result = dataMapeada;
                } else {
                    let dataFiltrada = data.tournaments.filter(x => x.data['tournament-data']['invitation-setting'][0].requirements[0]['custom-requirement'][0]['@value'] == server);
                    let dataMapeada = dataFiltrada.map(x => x = {
                        tournamentName: x.name,
                        tournamentId: x.id,
                        tournamentTime: x.tournamenttime,
                        tournamentIcon: x.icon,
                        tournamentData: x.data
                    });

                    result = dataMapeada;
                };
            });

        return result;
    };

    async accountInfo(accessToken) {
        if (!accessToken) {
            throw new Error("Invalid Access Token.");
        };

        let result;

       await fetch("https://backbone-client-api.azurewebsites.net/api/v1/userGet", {
            "method": "POST",
            "headers": {
                "Host": "backbone-client-api.azurewebsites.net",
                "User-Agent": "UnityPlayer/2020.3.38f1 (UnityWebRequest/1.0, libcurl/7.80.0-DEV)",
                "Accept": "*/*",
                "BACKBONE_APP_ID": "8561191D-03B7-423E-B779-D2F6E77A3A45",
                "ACCESS_TOKEN": accessToken,
                "X-Unity-Version": "2020.3.38f1",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive"
            },
            "body": `lastUpdate=1900-01-01T00%3a00%3a00&lastSync=1900-01-01T00%3a00%3a00&generateQuests=0&getQuests=0&getTiles=0&getLayouts=0&accessToken=${encodeURIComponent(accessToken)}`
        })
            .then(r => r.json())
            .then(data => {
                result = data;
            })
            .catch(() => {
                throw new Error("Invalid Access Token.");
            });

        return result;
    };

    async changeNickname(accessToken, nickname) {
        /*
        🇧🇷 Português: A função changeNickname altera apenas dentro dos servidores do jogo (quando você ganhar um torneio, quando algum influenciador/moderador do jogo for te dar ban terá que colocar este nick.)
        🇺🇸 English: The changeNickname function changes only within the game servers (when you win a tournament, when an influencer/moderator of the game wants to ban you, you will have to put this nickname.)
        */

        if (!accessToken) {
            throw new Error("Invalid Access Token\nExample:\nchangeNickname('Acess Token', 'New Nickname')");
        };

        let returnMessage;

        await fetch("https://backbone-client-api.azurewebsites.net/api/v1/userChangeNick", {
            method: "POST",
            headers: {
                "Host": "backbone-client-api.azurewebsites.net",
                "User-Agent": "UnityPlayer/2020.3.38f1 (UnityWebRequest/1.0, libcurl/7.80.0-DEV)",
                "Accept": "*/*",
                "BACKBONE_APP_ID": "8561191D-03B7-423E-B779-D2F6E77A3A45",
                "ACCESS_TOKEN": accessToken,
                "X-Unity-Version": "2020.3.38f1",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `nickName=${nickname}&accessToken=${encodeURIComponent(accessToken)}`
        })
            .then(r => r.json())
            .then(data => {
                if (data.nickName == nickname) {
                    // ✅
                    returnMessage = 200;
                };
            })
            .catch(() => {
                throw new Error("Invalid Access Token.");
            });

        return returnMessage;
    };

    async skinsList(version) {
        let returnArray;
        await fetch('https://api.test.stumbleguys.com/shared/1/StumbleGuysNode', {
            method: 'GET'
        })
            .then(r => r.json())
            .then(data => {
                if (version) {
                    returnArray = data.Skins_v4.filter(x => x.Version == version);
                } else {
                    returnArray = data.Skins_v4;
                };
            });

        return returnArray;
    }
}
