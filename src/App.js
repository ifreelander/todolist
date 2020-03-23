import React from 'react';
import './App.css';
import Flexbox from 'flexbox-react';

const App = () => {
  return (
    <div className="container">
      <h2 className="header">TO-DO List</h2>
      <form className="form">
        <div className="form-div-p">
          <p>
            <input className="input" placeholder="add new task"></input>
            <button className="button" type="submit">
              add
            </button>
          </p>
        </div>
      </form>

      <div className="list-div">
        <p className="list-p">
          water the plants
          <button className="list-button" type="submit">
            edit
          </button>
          <hr className="hr" />
        </p>
        <p className="list-p">
          water the plants
          <button className="list-button" type="submit">
            edit
          </button>
          <hr className="hr" />
        </p>
        <p className="list-p">
          water the plants
          <button className="list-button" type="submit">
            edit
          </button>
          <hr className="hr" />
        </p>
        <p className="list-p">
          water the plants
          <button className="list-button" type="submit">
            edit
          </button>
          <hr className="hr" />
        </p>
      </div>
    </div>
  );
};

export default App;
