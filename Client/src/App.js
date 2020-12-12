import React,{Component} from 'react';
import './App.css';

const axios = require('axios');

class App extends Component{
  state = {
    name:"",
    mailId:"",
    pass:"",
    NameError:"",
    EmailError:"",
    PassError:""
  };

  submit= (e) =>{
    axios.post(`http://localhost:3000/users`,{
      name: this.state.name,
      mailId: this.state.mailId,
      passWord: this.state.pass
    })
    .then(response=>{
      console.log(response)
    })
    .catch(err=>console.log(err))
  }

  handleEmailChange = (e) => {
    this.setState({
      mailId:e.target.value
    })
    if(this.state.mailId.length<5)
    {
      this.setState({
      EmailError:"Email must be at the Correct format"
      })
    }
    else {
      this.setState({
      EmailError:""
      })
    }
  }

  handleNameChange = (e) => {
    let alph=/^[a-zA-Z]+$/
    this.setState({
      name:e.target.value
    })
    if(this.state.name.length<4)
    {
      this.setState({
      NameError:"Username needs to be atleast 5 characters long"
      })
    }
    else if(!(alph.test(this.state.name))){
      this.setState({
      NameError:"Must be an alphabetics only"
      })
    }
    else{
      this.setState({
      NameError:""
      })
    }
  }

  handlePassChange = (e) => {
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    this.setState({
      pass:e.target.value
    })
    if(this.state.pass.length<6)
    {
      this.setState({
        PassError:"Must 6 letters"
      })
    }
    else if(!(passRegex.test(this.state.pass))){
      this.setState({
        PassError:"Must had Capital,Small and Numeric letters"
      })
    }
    else {
      this.setState({
         PassError:""
      })
    }
  }

  render(){
    return (
      <div>
        <header>
          <h1>Signin</h1>
          </header>
          <p>Email-Id:<input type="text" value={this.state.mailId} onChange={this.handleEmailChange}/><span>{this.state.EmailError}</span></p>
          <p>UserName:<input type="text" value={this.state.name} onChange={this.handleNameChange}/><span>{this.state.NameError}</span></p>
          <p>Password:<input type="text" value={this.state.pass} onChange={this.handlePassChange}/><span>{this.state.PassError}</span></p>
          <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default App;
