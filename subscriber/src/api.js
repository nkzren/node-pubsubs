const express = require("express");
const cors = require("cors");


const validatePedido = (req, res, next) => {
  const body = req.body;

  if (!body.nome) {
    res.status(400).json({
      success: false,
      message: "Pedido sem nome"
    });
  } else {
    next();
  }

}

module.exports = function (corsOptions, { stanConnection, mongoClient }) {
  const api = express();
  const pedidosCollection = mongoClient.db().collection('pedido');

  api.use(express.json());
  api.use(cors(corsOptions));

  api.get('/', (req, res) => {
    res.send('Tapioca');
  });

  api.get('/pedido', async (req, res) => {
    const pedidos = await pedidosCollection.find({}).toArray();

    const pedidosFormatado = pedidos.map(e => {
      return {
        nome: e.nome,
        valor: e.valor
      }
    });
    res.json(pedidosFormatado);
  })

  return api;
}