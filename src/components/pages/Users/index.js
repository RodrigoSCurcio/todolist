import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import './Users.css';
import ModalTodo from '../../Modals/ModalTodoList';

const Users = (props) => {
  const [user, setUser] = useState([])
  const [dataDetails, setDataDetails] = useState();

  const reRef = useRef();

  const [showModalTodo, setShowModalTodo] = useState(false);
  const TheShowModalTodo = React.forwardRef((props, reRef) => <ModalTodo {...props} />)
  
  useEffect(() => {
    async function fetchResult() {
      let result = await axios.get("https://jsonplaceholder.typicode.com/users")
      await new Promise((x) => setTimeout(x, 1000));
      setUser(result.data)
    }
    fetchResult()
  }, [])

  return (
    <div className='container'>
      {showModalTodo ? <TheShowModalTodo reference={reRef} details={dataDetails} onClose={() => setShowModalTodo(false)}/> : null}
      <h2>Lista de Usuários :</h2>
      {user.length > 0 ? (
        <div className='list'>
          {user.map((user) =>
            <div key={user.id} className='user' >
              <img
                src="/img/avatar.png"
                alt="guys"
              />
              <div>
                <p>Usuário: {user.username}</p>
                <p>Nome: {user.name}</p>
              </div>
              <button
                onClick={() => {setDataDetails(user); setShowModalTodo(true);}}
              >
                Tarefas
              </button> 
            </div>
          )}
        </div>
      ) : (
        <img src="/img/Loading.gif" className='loading'/>
      )}
    </div>
  );
}

export default Users;
