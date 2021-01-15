import React from 'react';

function Button(props) {
  return (
    <div>
      <button
        type="button"
        className="ui primary button"
        onClick={props.submitContact}
      >
        Add New Contact
      </button>
    </div>
  );
}

export default Button;
