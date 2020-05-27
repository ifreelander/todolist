import React, { useState } from 'react';

const addTodo = async (todo) => {
  const postRequest = {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch('http://localhost:3000/todos', postRequest);
    const addedTodo = await response.json();
    return addedTodo;
  } catch (error) {}
};

const Input = ({ setList, list }) => {
  const [text, setText] = useState('');

  //debugger;
  return (
    <form className="form">
      <div className="form-div-p">
        <p>
          <input
            className="input"
            placeholder="add new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            data-testid="add"
            className="button"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              const newTodo = { text, done: false };
              const addedTodo = await addTodo(newTodo);
              setList([...list, addedTodo]);
              setText('');
            }}
          >
            add
          </button>
        </p>
      </div>
    </form>
  );
};

export default Input;
