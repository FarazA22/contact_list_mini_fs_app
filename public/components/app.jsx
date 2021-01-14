import React from 'react';
import ContactCard from './components/contactCard.jsx';
import Button from './components/button.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      showNewContactModal: false,
      showExistingContactModal: false,
    };
    this.showNewContactModal = this.showNewContactModal.bind(this);
    this.hideNewContactModal = this.hideNewContactModal.bind(this);
    this.showExistingContactModal = this.showExistingContactModal.bind(this);
    this.hideExistingContactModal = this.hideExistingContactModal.bind(this);
  }

  showNewContactModal = () => {
    this.setState({ showNewContactModal: true });
  };

  hideNewContactModal = () => {
    this.setState({ showNewContactModal: false });
  };

  showExistingContactModal = () => {
    this.setState({ showExistingContactModal: true });
  };

  hideExistingContactModal = () => {
    this.setState({ hideExistingContactModal: false });
  };

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
        />
      );
    });

    return (
      <div className="ui center aligned container">
        <div>
          <h1>My Contacts</h1>
          <h4 className="ui horizontal divider header">
            <i className="address book icon"></i>
            ### Contacts
          </h4>
        </div>
        <div style={divStyle}></div>
        <Button />
        <div className="ui padded center aligned grid">{totalContacts}</div>
      </div>
    );
  }
}

export default App;
