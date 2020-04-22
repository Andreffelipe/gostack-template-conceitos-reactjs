import React, { useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositorie, setRepositories] = useState([])

  useEffect(() =>{

    api.get('/repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
      });
 
  },[])

  
  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories',{
      id: "123",
      title : "Estudando",
      url: "https://github.com/Andreffelipe/gostack-conceito-node",
      techs:["Vue.js","Angular.js"]
    });
    const resposta = response.data
    setRepositories([...repositorie, resposta])

  }

  async function handleRemoveRepository(id) {
    // TODO
   await api.delete(`/repositories/${id}`)
   
   setRepositories(repositorie.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">         
          { repositorie.map(repo => <li key={repo.id}>{repo.title}
          {repo.id}
          <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
