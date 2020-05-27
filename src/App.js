import React, { useState, useEffect } from 'react';
import './App.css';
import Flexbox from 'flexbox-react';
import ClearButton from './Components/ClearButton';
import Header from './Components/Header';
import Input from './Components/Input';
import List from './Components/List';

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
