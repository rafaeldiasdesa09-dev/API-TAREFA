// src/routes/tarefaroutes.ts

import { Router } from "express";

import {
  listar,
  criar,
  detalhe
} from "../controllers/tarefacontroller";

const router = Router();


// LISTAR TAREFAS
router.get("/tarefas", listar);


// DETALHE DA TAREFA
router.get("/tarefas/:id", detalhe);


// CRIAR TAREFA
router.post("/tarefas", criar);


export default router;