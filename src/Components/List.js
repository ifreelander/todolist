import React from 'react';

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
          <span style={{ textDecoration: listItem.done ? 'line-through' : 'none' }}>
            {listItem.text}
          </span>
          <hr className="hr" />
        </span>
      ))}
    </div>
  );
};

export default List;
