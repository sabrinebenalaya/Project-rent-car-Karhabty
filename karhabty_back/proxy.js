
const corsAnywhere = require('cors-anywhere');

const host = '0.0.0.0';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Permet toutes les demandes en provenance de tous les domaines
}).listen(port, host, () => {
  console.log(`CORS Anywhere est en cours d'exécution sur ${host}:${port}`);
});
