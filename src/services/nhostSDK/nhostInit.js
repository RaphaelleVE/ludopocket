//import { AUTH_ENDPOINT } from "../API";

//import nhost from 'nhost-js-sdk';


/*export const nhost = new NhostClient({
  subdomain: "xtsxnjrbljpyoktbqmac",
  region: "eu-central-1"
});
/*const config = {
  base_url: 'https://backend-xtsxnjrbljpyoktbqmac.nhost.app', // Remplacez par l'URL de votre backend Nhost
  AUTH_ENDPOINT: 'https://xtsxnjrbljpyoktbqmac.auth.eu-central-1.nhost.run/v1'


};*/
///import { NhostClient } from '@nhost/nhost-js'


import { NhostClient } from "@nhost/react";

export const nhostClient = new NhostClient({
  subdomain: 'xtsxnjrbljpyoktbqmac',
  region: 'eu-central-1',
})

//nhost.initializeApp(config);

//const auth = nhost.auth();

//export {auth};
