import React from 'react';
import ContactCard from './components/contactCard.jsx';
import Button from './components/button.jsx';
import Input from './components/input.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      name: '',
      email: '',
      number: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  handleChange(event) {
    const key = event.target.placeholder.toLowerCase();
    this.setState({ [key]: event.target.value });
  }

  handleClick(event) {
    const { name, email, number } = this.state;

    const numberToNum = Number(number);
    console.log(numberToNum);
    if (
      name !== '' &&
      email !== '' &&
      number !== '' &&
      isNaN(numberToNum) !== true
    ) {
      const requestDetails = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, number: numberToNum }),
      };
      fetch('http://localhost:3000/api/addNewContact', requestDetails)
        .then((response) => response.json())
        .then((data) =>
          this.setState({ contacts: data, name: '', number: '', email: '' })
        );
    }
  }

  deleteContact(event) {
    console.log(event);
    console.log(name);
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/initial')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          contacts: data,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const divStyle = {
      margin: '20px',
    };

    const totalContacts = this.state.contacts.map((contact) => {
      const iD = contact['_id'];
      const name = contact['name'];
      const email = contact['email'];
      const number = contact['number'];

      return (
        <ContactCard
          key={iD}
          iD={iD}
          name={name}
          email={email}
          number={number}
          deleteCard={this.deleteContact}
        />
      );
    });

    console.log(this.state.number);

    return (
      <div className="ui center aligned container">
        <div>
          <h1>My Contacts</h1>
          <h4 className="ui horizontal divider header">Add New Contact</h4>
        </div>
        <div style={divStyle}></div>
        <Input
          name="Name"
          value={this.state.name}
          updateInput={this.handleChange}
        />
        <Input
          name="Email"
          value={this.state.email}
          updateInput={this.handleChange}
        />
        <Input
          name="Number"
          value={this.state.number}
          updateInput={this.handleChange}
        />
        <Button submitContact={this.handleClick} />
        <h4 className="ui horizontal divider header">
          <i className="address book icon"></i>
          {totalContacts.length} Contacts
        </h4>
        <div className="ui padded center aligned grid">{totalContacts}</div>
      </div>
    );
  }
}

export default App;
