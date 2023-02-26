const core = require("./resources/core.json");

module.exports = class StumbleGuys {
    constructor() {}

    async getTournamentsList(server) {
        if (server && typeof server !== 'string' || !['eu', 'sa', 'us', 'asia', 'in'].includes(server.toLowerCase())) {
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
}