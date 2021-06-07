const API = require("./api");
const brokerClient = require("./nats");

const PORT = 3000;
const ALLOWED_ORIGINS = JSON.parse("[]");

const corsOptions = {
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Maldito erro de CORS"));
    }
  },
};

async function main() {
  try {
    const stanConnection = brokerClient();

    const context = { stanConnection };

    const api = API(corsOptions, context);

    api.listen(PORT, () => {
      console.log(`DEREGULATE TAPIOCA ON PORT: ${PORT}`);
    })
  } catch (e) {
    console.error(`Deu merda: ${e}`);
  }
}

main();