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

module.exports = function (corsOptions, { stanConnection }) {
  const api = express();

  api.use(express.json());
  api.use(cors(corsOptions));

  api.get('/', (req, res) => {
    res.send('Tapioca').end();
  });

  api.post('/pedido', validatePedido, (req, res, next) => {
    const body = req.body;

    stanConnection.publish("PEDIDO_REALIZADO", JSON.stringify(body));
    res.json({
      success: true,
      message: `Pedido realizado: ${body.nome} | R$ ${body.valor}`
    })
  })

  return api;
}