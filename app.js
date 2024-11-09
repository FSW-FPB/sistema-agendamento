const express = require("express");
const app = express();
const sequelize = require("./config/database");
const consultaRoutes = require("./routes/consultaRoutes");
require("dotenv").config();

app.use(express.json());
app.use("/api", consultaRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
