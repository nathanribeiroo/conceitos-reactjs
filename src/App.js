import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Sistema ${Date.now()}`,
      "url": "https://github.com/nathanribeiroo/conceitos-reactjs",
      "techs": ["javascript", "php"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const newRep = repositories;
    newRep.splice(repositoryIndex, 1);

    setRepositories([...newRep]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>)
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
