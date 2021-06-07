const express = require("express");
const cors = require("cors");


const validatePedido = (req, res, next) => {
  const body = req.body;

  if (!body.nome) {
    response.status(400).json({
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
    res.send('Tapioca');
  });

  return api;
}