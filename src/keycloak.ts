import Keycloak from "keycloak-js";

const initOptions = {
  url: "https://authn.diamond.ac.uk",
  realm: "master",
  clientId: "visr-app-dev",
};

const keycloak = new Keycloak(initOptions);

export default keycloak;
