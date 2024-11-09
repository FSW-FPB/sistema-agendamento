# Sistema de Agendamento de Consultas

Este é um sistema de agendamento de consultas médicas desenvolvido com Node.js, Express, Sequelize e MySQL. Ele permite o cadastro, atualização e exclusão de consultas, além de associar prescrições a consultas específicas.

## Funcionalidades

- **Cadastrar uma consulta**
- **Listar todas as consultas**
- **Buscar uma consulta específica**
- **Atualizar dados de uma consulta**
- **Deletar uma consulta**
- **Atualizar a prescrição de uma consulta**

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs RESTful.
- **Sequelize**: ORM (Object-Relational Mapping) para interação com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional para armazenar informações das consultas e prescrições.

## Endpoints da API

### 1. `POST /consultas`

Cria uma nova consulta.

**Corpo da requisição**:

```json
{
  "data_consulta": "2024-11-10T10:00:00Z",
  "horario_atendimento": "10:00",
  "horario_encerramento": "10:45",
  "id_paciente": 1,
  "id_medico": 1,
  "id_prescricao": "12345"
}
```

### 2. `GET /consultas`

Lista todas as consultas.

### 3. `GET /consultas/:id`

Busca uma consulta pelo ID.

### 4. `PUT /consultas/:id`

Atualiza os dados de uma consulta.

**Corpo da requisição**:

```json
{
  "data_consulta": "2024-11-11T10:00:00Z",
  "horario_atendimento": "11:00",
  "horario_encerramento": "11:45",
  "id_paciente": 1,
  "id_medico": 1,
  "id_prescricao": "54321"
}
```

### 5. `DELETE /consultas/:id`

Deleta uma consulta.

### 6. `PATCH /consultas/:id/prescricao`

Atualiza a prescrição de uma consulta.

**Corpo da requisição**:

```json
{
  "id_prescricao": "12345"
}
```

## Como Rodar a Aplicação

### 1. Clonar o repositório:

```bash
git clone https://github.com/SEU_USUARIO/sistema-agendamento.git
```

### 2. Instalar dependências:

```bash
cd sistema-agendamento
npm install
```

### 3. Configurar o banco de dados MySQL:

- Crie um banco de dados chamado `agendamento` no MySQL.
- Atualize as credenciais de banco de dados no arquivo `config/database.js`.

### 4. Rodar o servidor:

```bash
npm start
```

O servidor estará disponível em `http://localhost:4000`.

## Contribuição

Sinta-se à vontade para contribuir para este projeto! Para isso, basta seguir estas etapas:

1. Faça um fork do repositório.
2. Crie uma nova branch para a sua feature (`git checkout -b minha-feature`).
3. Faça as mudanças e commit com uma mensagem significativa (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie suas alterações (`git push origin minha-feature`).
5. Abra um Pull Request.

## Observações finais

Este projeto foi feito por [CarlosKarlos](https://github.com/CarlosKarlos) e refatorado por [Reed0ne](https://github.com/Reed0ne) com autorização do criador, para a criação do sistema de prontuário-clínico.

- [Repositório Original](https://github.com/CarlosKarlos/A3_agendamento)

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
