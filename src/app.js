const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryFindIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryFindIndex === -1) {
    return response.send(400);
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryFindIndex].likes
  }

  repositories[repositoryFindIndex] = repository;

  return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryFindIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryFindIndex === -1) {
    return response.send(400);
  }

  repositories.splice(repositoryFindIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryFind = repositories.find(repo => repo.id === id);

  if (!repositoryFind) {
    return response.send(400);
  }

  repositoryFind.likes += 1;

  return response.json(repositoryFind);


});

module.exports = app;
