import React from 'react';

function input(props) {
  const divStyle = {
    margin: '20px',
  };
  return (
    <div className="ui big input" style={divStyle}>
      <input
        type="text"
        placeholder={props.name}
        onChange={props.updateInput}
        value={props.value}
      />
    </div>
  );
}

export default input;
