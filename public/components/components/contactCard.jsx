import React from 'react';

function ContactCard(props) {
  const divStyle = {
    margin: '20px',
    backgroundColor: '#e6fff2',
  };
  return (
    <div className="ui card" style={divStyle}>
      <div className="content">
        <a className="header">{props.name}</a>
        <div className="description">{props.email}</div>
        <div className="description">{props.number}</div>
      </div>
      <div className="extra content">
        <div className="ui buttons">
          <button
            className="ui button"
            onClick={(e) => props.deleteCard(e, props.iD)}
          >
            Delete
          </button>
          <div className="or"></div>
          <button className="ui positive button">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
