import { Router } from "express";

import {
  listar,
  criar,
  detalhe,
  paginaTarefas
} from "../controllers/tarefacontroller";

const router = Router();


// 🔥 AGORA ISSO RENDERIZA A PÁGINA
router.get("/pagina/tarefas.ejs", paginaTarefas);


// DETALHE
router.get("pagina/tarefas/:id", detalhe);


// CRIAR
router.post("pagina/tarefas", criar);


// CADASTRO
router.get("pagina/cadastrar", (req, res) => {
  res.render("cadastrar", { tarefas: [] });
});


export default router;