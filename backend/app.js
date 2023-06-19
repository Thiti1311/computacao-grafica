const express = require("express");

const app = express();

const port = 9090;
const portFront = 3000;

const RoutesFiguras = require('./routes/figura.routes')
const RoutesTransformacoesFiguras = require('./routes/transformaçõesFiguras.routes')
const RoutesFiltros = require('./routes/filtros.routes')
const RoutesOperadoresMorfologicos = require('./routes/operadoresMorfologicos.routes')
const RoutesTransformacoesImagens = require('./routes/transformacaoImagem.routes')

//ativa CORS para possibilitar usar servidor e fron-end na mesma maquina
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${portFront}`);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Middleware para fazer o parse do corpo da requisição
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use(RoutesFiguras);
app.use(RoutesTransformacoesFiguras);
app.use(RoutesFiltros);
app.use(RoutesOperadoresMorfologicos);
app.use(RoutesTransformacoesImagens);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
