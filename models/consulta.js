const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Status = require("./status");

const Consulta = sequelize.define("Consulta", {
  id_consulta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data_consulta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horario_atendimento: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horario_encerramento: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_prescricao: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  id_status: {
    type: DataTypes.INTEGER,
    references: {
      model: Status,
      key: "id_status",
    },
    allowNull: false,
  },
});

Consulta.belongsTo(Status, { foreignKey: "id_status" });
Status.hasMany(Consulta, { foreignKey: "id_status" });

module.exports = Consulta;
