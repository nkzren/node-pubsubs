const stan = require("node-nats-streaming");


module.exports = function natsInit(mongoClient) {
  const connection = stan.connect("test-cluster", "test-subscriber", {
    url: "nats://broker:4222",
  });

  connection.on("connect", () => {
    console.log("Conectado ao NATS Streaming");

    const collectionName = "pedido"

    const db = mongoClient.db().collection(collectionName);

    const pedidoSub = connection.subscribe("PEDIDO_REALIZADO");
    pedidoSub.on("message", async (message) => {
      const pedido = JSON.parse(message.getData());
      await db.insertOne(pedido);

      console.log(`Pedido recebido no subscriber: ${JSON.stringify(pedido)}`);
    });
  });

  return connection;
};
