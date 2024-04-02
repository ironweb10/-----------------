const axios = require('axios').default;
const Tokens = require("./Tokens.js");
const Endpoints = require("./Endpoints.js");




module.exports = async function () {

    const Auth = (
        await axios.post(
            Endpoints.OAUTH_TOKEN_CREATE,
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: 'Basic ' + Tokens.LAUNCHER_WINDOWS
                }
            }
        )
    ).data;

    const ClientToken = Auth.access_token;

   
    const LightSwitchInfo = (
        await axios.get(
            'https://lightswitch-public-service-prod.ol.epicgames.com/lightswitch/api/service/Fortnite/status',
            {
                headers: { Authorization: `Bearer ${ClientToken}` }
            }
        )
    ).data;


    const CatalogItem = (
        await axios.get(
            `https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/public/assets/v2/platform/Windows/namespace/${LightSwitchInfo.launcherInfoDTO.namespace}/catalogItem/${LightSwitchInfo.launcherInfoDTO.catalogItemId}/app/Fortnite/label/Live`,
            {
                headers: { Authorization: `Bearer ${ClientToken}` }
            }
        )
    ).data.elements[0];

    axios.delete(
        `${Endpoints.OAUTH_TOKEN_KILL}/${ClientToken}`,
        {
            headers: { Authorization: `Bearer ${ClientToken}` }
        }
    );

    return CatalogItem.buildVersion;
}