import React, { useState, useEffect } from 'react';
import './App.css';
import Flexbox from 'flexbox-react';

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

const updateTodo = async (todo) => {
  const updateRequest = {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, updateRequest);
    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {}
};

const Header = () => {
  return (
    <h2 data-testid="title" className="header">
      TO-DO List
    </h2>
  );
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

const List = ({ list, setList }) => {
  return (
    <div className="list-div">
      {list.map((listItem, listItemIndex) => (
        <span className="list-p" key={listItemIndex}>
          <input
            className="checkbox"
            type="checkbox"
            data-testid="checkbox"
            checked={listItem.done}
            onChange={(e) => {
              const oldList = list;
              // const newList = [...oldList, { text: listItem.text, done: true }];
              const newList = [];
              for (let loopIndex = 0; loopIndex < list.length; loopIndex++) {
                const item = list[loopIndex];
                if (loopIndex === listItemIndex) {
                  newList.push({ ...listItem, done: !listItem.done });
                } else {
                  newList.push(item);
                }
              }

              updateTodo({ ...listItem, done: !listItem.done });
              setList(newList);

              // setList(list.map(item, loopIndex) => loopIndex === listItemIndex ? { ...item, done: true} : item);
            }}
          />
          {/* <text style={{ textDecoration: 'line-through' }}>hi</text> */}
          <span style={{ textDecoration: listItem.done ? 'line-through' : 'none' }}>
            {listItem.text}
          </span>
          <hr className="hr" />
        </span>
      ))}
    </div>
  );
};

const ClearButton = ({ setList }) => {
  return (
    <button
      className="button"
      type="submit"
      onClick={(e) => {
        const emptyList = [];
        e.preventDefault();
        setList(emptyList);
      }}
    >
      Clear
    </button>
  );
};

const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchToDoList = async () => {
      const response = await fetch(`http://localhost:3000/todos`);
      const todolist = await response.json();
      setList(todolist);
    };
    fetchToDoList();
  }, []);

  if (list.length > 0) {
    return (
      <div className="container">
        <Header />
        <Input setList={setList} list={list} />
        <List list={list} setList={setList} />
        <ClearButton setList={setList} />
      </div>
    );
  } else
    return (
      <div className="container">
        <Header />
        <Input setList={setList} list={list} />
      </div>
    );
};

export default App;
