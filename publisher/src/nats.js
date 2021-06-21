const stan = require("node-nats-streaming");


module.exports = function natsInit() {
  const connection = stan.connect("test-cluster", "test-publisher", {
    url: `nats://${process.env.BROKER_URL}:4222`
  });

  console.log(`Trying to connect to broker on url: ${process.env.BROKER_URL}`);

  connection.on("connect", () => {
    console.log("Conectado ao NATS Streaming");

    const pedidoSub = connection.subscribe("PEDIDO_REALIZADO");
    pedidoSub.on("message", async (message) => {
      const pedido = JSON.parse(message.getData());

      console.log(`Pedido recebido no publisher: ${JSON.stringify(pedido)}`);
    });
  });

  return connection;
};
