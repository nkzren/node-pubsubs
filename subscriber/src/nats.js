const stan = require("node-nats-streaming");


module.exports = function natsInit() {
  const connection = stan.connect("test-cluster", "test-subscriber", {
    url: "nats://broker:4222",
  });

  connection.on("connect", () => {
    console.log("Conectado ao NATS Streaming");

    const pedidoSub = connection.subscribe("PEDIDO_REALIZADO");
    pedidoSub.on("message", async (message) => {
      const pedido = JSON.parse(message.getData());

      console.log(`Pedido recebido no subscriber: ${JSON.stringify(pedido)}`);
    });
  });

  return connection;
};
