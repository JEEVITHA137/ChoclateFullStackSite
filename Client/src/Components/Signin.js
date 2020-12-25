import React,{Component} from 'react';

class Signin extends Component{
  state = {
    name:"",
    mailId:"",
    pass:"",
    NameError:"",
    EmailError:"",
    PassError:"",
    signin:[],
    login:false,
  };

  submit= (e) =>{

    let error = 0;
    if(this.state.name==="")
    {
      error=1;
      this.setState({
      NameError:"Must Enter Inputs"
      })
    }
    if(this.state.mailId==="")
    {
      error=1;
      this.setState({
      EmailError:"Must Enter Inputs"
      })
    }
    if(this.state.pass==="")
    {
      error=1;
      this.setState({
      PassError:"Must Enter Inputs"
      })
    }

    if(error===0)
    {
        this.props.getEmail(this.state.mailId);
        
        const values = {
          name: this.state.name,
          mailId: this.state.mailId,
          passWord: this.state.pass,
          address:{
            HouseNo:"",
            Street:"",
            LandMark:"",
            Town:"",
            District:"",
            Pincode:0
           },
           phoneNo:0
        }

        const headers = {
          method:'POST', 
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        };

    fetch( `http://localhost:3000/users`, headers)
        .then(response=>response.json())
        .catch((err)=>{
        console.log(err)
        this.setState({
            EmailError:"Already exist"
        });
        })

        this.props.history.push('./');
    }
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
          <p>Already user?<a href="/login">Login</a></p>
      </div>
    );
  }
}

export default Signin;
