const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Status = sequelize.define("Status", {
  id_status: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Inserir valores predefinidos
Status.sync().then(async () => {
  await Status.findOrCreate({ where: { descricao: "Aguardando atendimento" } });
  await Status.findOrCreate({ where: { descricao: "Atendido" } });
  await Status.findOrCreate({ where: { descricao: "Cancelado" } });
});

module.exports = Status;
