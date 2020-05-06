import React, { useState, useEffect } from 'react';
import './App.css';
import Flexbox from 'flexbox-react';

const addTodo = async (todo) => {
  const postRequest = {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
  };

  // return fetch('http://localhost:3000/todos/', postRequest)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  try {
    const response = await fetch('http://localhost:3000/todos', postRequest);
    //console.log(response);
    const addedTodo = await response.json();
    // console.log('console.log(******---addedTodo.id----*****', addedTodo.id);
    return addedTodo;
  } catch (error) {
    //console.log(error);
  }
};

const updateTodo = async (todo) => {
  // console.log('todo', todo);
  const updateRequest = {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, updateRequest);
    //console.log(response);
    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    //console.log(error);
  }
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
  //console.log('-----list', list);

  return (
    <div className="list-div">
      {list.map((listItem, listItemIndex) => (
        <p className="list-p" key={listItemIndex}>
          <input
            className="checkbox"
            type="checkbox"
            data-testid="checkbox"
            checked={listItem.done}
            onChange={(e) => {
              const oldList = list;
              //console.log('oldList', oldList);
              // const newList = [...oldList, { text: listItem.text, done: true }];
              const newList = [];
              //console.log("this item's index", listItemIndex);
              for (let loopIndex = 0; loopIndex < list.length; loopIndex++) {
                // console.log('loop index', loopIndex);
                const item = list[loopIndex];
                // console.log('listItem', listItem);
                // console.log('Item', item);
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
        </p>
      ))}
    </div>
  );
};

const ClearButton = ({ setList }) => {
  //const [showClearButton, setShowClearButton] = useState(false);
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
      //console.log(response);
      const todolist = await response.json();
      // console.log('todolist', todolist);
      setList(todolist);
    };
    fetchToDoList();
  }, []);

  // const listHasItems = list.length > 0;

  // return (
  //   <div className="container">
  //     <Header />
  //     <Input setList={setList} list={list} />
  //     {listHasItems && (
  //       <>
  //         <List list={list} setList={setList} />
  //         <ClearButton setList={setList} />
  //       </>
  //     )}
  //   </div>
  // );

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
