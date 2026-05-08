// src/controllers/tarefaController.ts

import { Request, Response } from "express";

import * as TarefaModel from "../models/tarefaModel";

import { ApiResponse, Tarefa, FiltroQuery } from "../interfaces";


// LISTAR
export async function listar(
  req: Request<{},{},{},FiltroQuery>,
  res: Response
) {

  try {

    let tarefas = await TarefaModel.listarTodas();

    if (req.query.concluida === "true") {
      tarefas = tarefas.filter(t => t.concluida);
    }

    if (req.query.concluida === "false") {
      tarefas = tarefas.filter(t => !t.concluida);
    }

    if (req.query.prioridade) {
      tarefas = tarefas.filter(
        t => t.prioridade === req.query.prioridade
      );
    }

    res.json({
      sucesso: true,
      dados: tarefas
    } as ApiResponse<Tarefa[]>);

  } catch {

    res.status(500).render("erro", {
      mensagem: "Erro interno ao listar tarefas"
    });

  }
}


// CRIAR
export async function criar(req: Request, res: Response) {

  try {

    const { titulo, descricao, prioridade } = req.body;

    const erros: string[] = [];

    if (!titulo || typeof titulo !== "string") {
      erros.push("titulo é obrigatório");
    }

    if (!["alta","media","baixa"].includes(prioridade)) {
      erros.push("prioridade inválida");
    }

    if (erros.length > 0) {

      return res.status(400).render("erro", {
        mensagem: erros.join(", ")
      });

    }

    const nova = await TarefaModel.criar({
      titulo,
      descricao,
      prioridade
    });

    res.status(201).json({
      sucesso: true,
      dados: nova
    });

  } catch {

    res.status(500).render("erro", {
      mensagem: "Erro interno ao criar tarefa"
    });

  }
}


// DETALHE
export async function detalhe(req: Request, res: Response) {

  try {

    const id = Number(req.params.id);

    const tarefas = await TarefaModel.listarTodas();

    const busca = tarefas.find(t => t.id === id);

    if (!busca) {

      return res.status(404).render("erro", {
        mensagem: "Tarefa não encontrada"
      });

    }

    res.render("detalhe", {
      tarefa: busca
    });

  } catch {

    res.status(500).render("erro", {
      mensagem: "Erro ao buscar tarefa"
    });

  }
}