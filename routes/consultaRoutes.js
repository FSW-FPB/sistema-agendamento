const express = require("express");
const router = express.Router();
const {
  criarConsulta,
  listarConsultas,
  buscarConsulta,
  atualizarConsulta,
  deletarConsulta,
  atualizarPrescricao,
  listarConsultasPorOrdemDeChamada,
  atualizarStatusConsulta,
  listarConsultasPorIdMedico,
  listarConsultasPorIdPaciente,
} = require("../controllers/consultaController");

router.post("/consultas", criarConsulta);
router.get("/consultas", listarConsultas);
router.get("/consultas/:id", buscarConsulta);
router.get("/consultas/paciente/:id_paciente", listarConsultasPorIdPaciente);
router.get("/consultas/medico/:id_medico", listarConsultasPorIdMedico);
router.put("/consultas/:id", atualizarConsulta);
router.delete("/consultas/:id", deletarConsulta);
router.patch("/consultas/:id/prescricao", atualizarPrescricao);
router.get("/fila", listarConsultasPorOrdemDeChamada);
router.patch("/consultas/:id/status", atualizarStatusConsulta);

module.exports = router;
