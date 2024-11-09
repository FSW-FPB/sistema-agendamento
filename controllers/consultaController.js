// controllers/consultaController.js
const Consulta = require("../models/Consulta");

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
    } = req.body;

    const novaConsulta = await Consulta.create({
      data_consulta,
      horario_atendimento,
      horario_encerramento,
      id_paciente,
      id_medico,
      id_prescricao: id_prescricao || null,
    });

    return res.status(201).json(novaConsulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao agendar consulta", error });
  }
};

// Função para listar todas as consultas
const listarConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.findAll();
    return res.status(200).json(consultas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar consultas", error });
  }
};

// Função para buscar uma consulta específica por ID
const buscarConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.findByPk(req.params.id);
    if (!consulta) {
      return res.status(404).json({ message: "Consulta não encontrada" });
    }
    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar consulta", error });
  }
};

// Função para atualizar uma consulta existente
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
    } = req.body;

    consulta.data_consulta = data_consulta || consulta.data_consulta;
    consulta.horario_atendimento =
      horario_atendimento || consulta.horario_atendimento;
    consulta.horario_encerramento =
      horario_encerramento || consulta.horario_encerramento;
    consulta.id_paciente = id_paciente || consulta.id_paciente;
    consulta.id_medico = id_medico || consulta.id_medico;
    consulta.id_prescricao = id_prescricao || consulta.id_prescricao;

    await consulta.save();
    return res.status(200).json(consulta);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao atualizar consulta", error });
  }
};

// Função para deletar uma consulta
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

// Função para atualizar a prescrição de uma consulta
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

module.exports = {
  criarConsulta,
  listarConsultas,
  buscarConsulta,
  atualizarConsulta,
  deletarConsulta,
  atualizarPrescricao,
};
