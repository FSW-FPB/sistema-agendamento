const Consulta = require("../models/Consulta");
const Status = require("../models/status");

// Função para criar uma nova consulta
const criarConsulta = async (req, res) => {
  try {
    const {
      data_consulta,
      horario_atendimento,
      horario_encerramento,
      id_paciente,
      id_medico,
      id_prescricao,
      id_status,
    } = req.body;

    const novaConsulta = await Consulta.create({
      data_consulta,
      horario_atendimento,
      horario_encerramento,
      id_paciente,
      id_medico,
      id_prescricao: id_prescricao || null,
      id_status: id_status || 1,
    });

    return res.status(201).json(novaConsulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao agendar consulta", error });
  }
};

const listarConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.findAll({
      include: [{ model: Status, attributes: ["descricao"] }],
    });
    return res.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar consultas", error });
  }
};

const buscarConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id, {
      include: [{ model: Status, attributes: ["descricao"] }],
    });
    if (!consulta) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }
    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar consulta", error });
  }
};

const atualizarConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id);
    if (!consulta) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    const {
      data_consulta,
      horario_atendimento,
      horario_encerramento,
      id_paciente,
      id_medico,
      id_prescricao,
      id_status,
    } = req.body;

    consulta.data_consulta = data_consulta || consulta.data_consulta;
    consulta.horario_atendimento =
      horario_atendimento || consulta.horario_atendimento;
    consulta.horario_encerramento =
      horario_encerramento || consulta.horario_encerramento;
    consulta.id_paciente = id_paciente || consulta.id_paciente;
    consulta.id_medico = id_medico || consulta.id_medico;
    consulta.id_prescricao = id_prescricao || consulta.id_prescricao;
    consulta.id_status = id_status || consulta.id_status;

    await consulta.save();
    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar consulta", error });
  }
};

const deletarConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id);
    if (!consulta) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    await consulta.destroy();
    return res.status(204).json({ message: "Consulta deletada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar consulta", error });
  }
};

const atualizarPrescricao = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id);
    if (!consulta) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    const { id_prescricao } = req.body;

    if (!id_prescricao) {
      return res
        .status(400)
        .json({ message: "O campo id_prescricao é obrigatório" });
    }

    consulta.id_prescricao = id_prescricao;
    await consulta.save();
    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar prescrição", error });
  }
};

const listarConsultasPorOrdemDeChamada = async (req, res) => {
  try {
    const consultas = await Consulta.findAll({
      where: { id_status: 1 },
      order: [
        ["data_consulta", "ASC"],
        ["horario_atendimento", "ASC"],
      ],
      attributes: ["id_consulta", "horario_atendimento"],
    });

    const consultasComPosicao = consultas.map((consulta, index) => ({
      id_consulta: consulta.id_consulta,
      lugar_fila: index + 1,
      horario_atendimento: consulta.horario_atendimento,
    }));

    return res.status(200).json(consultasComPosicao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao listar consultas por ordem de chamada",
      error,
    });
  }
};

const atualizarStatusConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id);
    if (!consulta) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }

    const { id_status, id_prescricao } = req.body;

    if (!id_status) {
      return res
        .status(400)
        .json({ message: "O campo id_status é obrigatório" });
    }

    if (id_status == "2") {
      if (!id_prescricao)
        return res.status(400).json({
          message:
            "Quando o atendimento for concluído é obrigatório ter o id_prescricao",
        });
      consulta.id_prescricao = id_prescricao;
    }

    consulta.id_status = id_status;
    await consulta.save();

    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao atualizar status ou prescrição da consulta",
      error,
    });
  }
};

module.exports = {
  criarConsulta,
  listarConsultas,
  buscarConsulta,
  atualizarConsulta,
  deletarConsulta,
  atualizarPrescricao,
  listarConsultasPorOrdemDeChamada,
  atualizarStatusConsulta,
};
