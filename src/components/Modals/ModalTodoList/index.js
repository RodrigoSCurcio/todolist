import React, { useState, useEffect } from 'react';
import styles from './modal.css';
import axios from "axios";
import { useForm } from 'react-hook-form';

const ModalTodo = (props) => {
  const [todos, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState()
  const [theNewTodo, setTheNewTodo] = useState()
  const { handleSubmit } = useForm();
  const { details } = props


  const [modalId, setModalId] = useState('modal');
  const handleOutsideClick = (e) => {
    if (e.target.id === modalId) props.onClose();
    setModalId(modalId === '' ? styles.modalClose : '');
  };

  const handleNewTodo = async () => {
    let theNewTodo = await axios.post(`http://jsonplaceholder.typicode.com/user/${details.id}/todos`, {
      userId: details.id,
      title: newTodo,
      completed: false,
    })
    setTheNewTodo(theNewTodo)
  };

  useEffect(() => {
    async function fetchResult() {
      let result = await axios.get(`http://jsonplaceholder.typicode.com/user/${details.id}/todos`)
      await new Promise((x) => setTimeout(x, 1000));
      setTodo(result.data)
    }
    fetchResult()
  }, [])


  return (
    <>
      <div className='overlay' >

        <div id={modalId} onClick={handleOutsideClick} className='backgroundFocus' />
        <div className='modal'>
          <div className='header'>
            <p>Detalhes das Tarefas</p>
            <p id={modalId} onClick={handleOutsideClick} className='closeIcon'>X</p>
          </div>
          <div className='container'>
            {todos.length > 0 ? (
              <div>
                <div className='main'>
                  {todos.map((todo) =>
                    <div
                      key={todo.id}
                      className='todoList'
                    >
                      <p>{todo.title}</p>
                      <input
                        type="checkbox"
                        checked={todo.completed === true ? 'checked' : todo.completed === false ? undefined : 'checked'}
                      />
                    </div>
                  )}
                  {theNewTodo !== undefined ? (
                    <div
                      key={theNewTodo.data.id}
                      className="todoList"
                    >
                      <p>{theNewTodo.data.title}</p>
                      <input type="checkbox" />
                    </div>
                  ) : (<></>)}
                </div>
                <form onSubmit={handleSubmit(handleNewTodo)}>
                  <h3>Adicionar uma Tarefa</h3>
                  <input
                    type="text"
                    name="newTodo"
                    placeholder="Nova Todo"
                    id="newTodo"
                    required
                    onChange={(e) => {
                      const { value } = e.target
                      e.target.value = value
                      setNewTodo(e.target.value)
                    }}
                  />
                  <button
                  >
                    Enviar
                  </button>
                </form>
              </div>
            ) : (
              <img src="/img/Loading.gif" className='loadingModal' />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTodo;
