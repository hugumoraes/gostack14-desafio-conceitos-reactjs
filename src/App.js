import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(r => setRepositories(r.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `${new Date()} - Novo repositório`,
      url: 'www.github.com.br/hugumoraes',
      techs: ['ReactJS', 'React native']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const repository = repositories.findIndex(r => id === r.id);
    const repos = [...repositories];

    repos.splice(repository, 1);
    
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories ? repositories.map(r => (
          <li key={r.id}>
            {r.title}

            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        )) : null}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
