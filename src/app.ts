// src/app.ts

import express from "express";
import path from "path";

import tarefaRoutes from "./routes/tarefaroutes";
import * as logger from "./middlewares/logger"

const app = express();
app.use(logger.logger)

// CONFIGURAÇÕES
app.set("view engine", "ejs");

// 👇 CORRETO quando views está dentro de src/views
app.set("views", path.join(__dirname, "views"));


// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));


// ROTA INICIAL
app.get("/", (req, res) => {
  res.send("API de tarefas funcionando");
});


// ROTAS
app.use(tarefaRoutes);


// TESTE DE VIEW (DEBUG)
app.get("/teste-erro", (req, res) => {
  res.render("erro", {
    mensagem: "teste direto"
  });
});


// 404
app.use((req, res) => {
  res.status(404).render("erro", {
    mensagem: "Página não encontrada"
  });
});


// SERVIDOR
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});