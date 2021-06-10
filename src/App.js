import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Members from './components/Members/Members'
import Form from './components/Form/Form'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      member: [],
      first_name: '',
      last_name: '',
      buttonDisable: false,
      formStatus: "create",
      memberIdSelected: null
    };
  }
  // request ke api
  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=1')
      .then( response => {
        this.setState({member: response.data.data})
      })
      .catch( error => {
        console.log(error)
      })
  }

  // menangkap inputan
  inputOnChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  // ketika tombol submit di tekan
  submitHandler = event => {
    event.preventDefault();
    this.setState({buttonDisable: true});

    var payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };
    var url = '';

    if(this.state.formStatus === "create"){
      url = 'https://reqres.in/api/users';
      this.addMember(url, payload);
    } else {
      url = `https://reqres.in/api/users/${this.state.memberIdSelected}`;
      this.editMember(url, payload);
    }
  };

  addMember = (url, payload) => {
    axios.post(url, payload)
      .then(response => {
        var member = [...this.state.member]
        member.push(response.data)
        this.setState({member, buttonDisable: false, first_name:"", last_name:""});
      })
      .catch(error => {
        console.log(error);
      });
  };

  editMember = (url, payload) => {
    axios.put(url, payload)
      .then(response => {
        var member = [...this.state.member]
        var indexmember = member.findIndex(member => member.id === this.state.memberIdSelected)

        member[indexmember].first_name = response.data.first_name
        member[indexmember].last_name = response.data.last_name

        this.setState({
          member,
          buttonDisable: false,
          first_name: "",
          last_name: "",
          formStatus: "create"
        })
      }).catch(error => {
        console.log(error)
      })
  }

  editButtonHandler = member => {
    this.setState({
      first_name: member.first_name,
      last_name: member.last_name,
      formStatus: "edit",
      memberIdSelected: member.id
    });
  };

  deleteButtonHandler = id => {
    var url = `https://reqres.in/api/users/${id}`
    axios.delete(url)
      .then(response => {
        if(response.status === 204){
          var member = [...this.state.member];
          var index = member.findIndex(member => member.id === id);
          member.splice(index, 1);

          this.setState({member});
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render(){
    return (
      <div className="container">
        <h1>DevSchool</h1>
        <div className="row">
          <div className="col-md-6" style={{border: '1px solid black'}}>
            <h2>Member</h2>
            <div className="row">
            <Members 
              member={this.state.member}
              editButtonHandler={(member) => this.editButtonHandler(member)}
              deleteButtonHandler={(id) => this.deleteButtonHandler(id)}
            />
            </div>
          </div>

          <div className="col-md-6" style={{border: '1px solid black'}}>
            <h2>Form {this.state.formStatus}</h2>
            <Form 
              onSubmitForm={this.submitHandler}
              onChange={this.inputOnChange}
              first_name={this.state.first_name}
              last_name={this.state.last_name}
              buttonDisabled={this.state.buttonDisabled}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
