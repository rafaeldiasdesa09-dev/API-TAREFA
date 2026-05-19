import { Router } from "express";

import {
  listar,
  criar,
  detalhe,
  paginaTarefas,
  paginaCadastrar
} from "../controllers/tarefacontroller";

const router = Router();


// 🔥 AGORA ISSO RENDERIZA A PÁGINA
router.get("/tarefas", paginaTarefas);


// DETALHE
router.get("/tarefas/:id", detalhe);


// CRIAR
router.post("/tarefas", criar);


// CADASTRO
router.get("/cadastrar", paginaCadastrar);


export default router;