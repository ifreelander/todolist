import React, { useState, useEffect } from 'react';
import './App.css';
import Flexbox from 'flexbox-react';

const Header = () => {
  return <h2 className="header">TO-DO List</h2>;
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
            className="button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setList([...list, { text, done: false }]);
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
  console.log('-----list', list);

  return (
    <div className="list-div">
      {list.map((listItem, listItemIndex) => (
        <p className="list-p" key={listItemIndex}>
          <input
            className="checkbox"
            type="checkbox"
            checked={listItem.done}
            onChange={(e) => {
              const oldList = list;
              console.log('oldList', oldList);
              // const newList = [...oldList, { text: listItem.text, done: true }];
              const newList = [];
              console.log("this item's index", listItemIndex);
              for (let loopIndex = 0; loopIndex < list.length; loopIndex++) {
                console.log('loop index', loopIndex);
                const item = list[loopIndex];
                if (loopIndex === listItemIndex) {
                  newList.push({ ...listItem, done: !listItem.done });
                } else {
                  newList.push(item);
                }
              }
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
      const response = await fetch(`http://localhost:3000/todos/`);
      console.log('response', response);
      const todolist = await response.json();
      console.log('todolist', todolist);
      setList(todolist);
    };
    fetchToDoList();
  }, []);

  // TODO load existing todos from server (useEffect)

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
