import React from 'react';

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

export default ClearButton;
