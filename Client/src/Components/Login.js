import React,{Component} from 'react';

class Login extends Component{
  state = {
    mailId:"",
    pass:"",
    EmailError:"",
    PassError:"",
    login:[],
    loginError:"",
    istrue:false
  };

  submit= (e) =>{   
    let error = 0;
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

    if(error === 0)
    {
        const headers = {
          method:'GET', 
          credentials: 'include'
        };
          
        fetch( `http://localhost:3000/users/${this.state.mailId}/${this.state.pass}`, headers)
          .then(response=>response.json())
          .then(response=>{
            if(response.length > 0)
            {
              this.props.getEmail(this.state.mailId);
              if(this.state.mailId === "Admin@gmail.com")
              {
                this.props.history.push('./adminproducts');
              }
              else
                 this.props.history.push('./');
            }
            else{
              this.setState({
                loginError:"Incorrect username and password"
              })
            }
          })
          .catch(err=>console.log(err))
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      mailId:e.target.value
    })
  }

  handlePassChange = (e) => {
    this.setState({
      pass:e.target.value
    })
  }

  render(){
    return (
      <div className="">
        <img className="login" src="./Home.jpg"></img>
      <div className="container row justify-content-center text-center">
          <div className="col-md-12" >
          <h1>Login</h1>
          <h3>Welcome To our Site</h3>
          <span>{this.state.loginError}</span>
          <p>Email-Id:<input type="text" value={this.state.mailId} onChange={this.handleEmailChange}/><span>{this.state.EmailError}</span></p>
          <p>Password:<input type="password" value={this.state.pass} onChange={this.handlePassChange}/><span>{this.state.PassError}</span></p>
          <button onClick={this.submit}>Submit</button>
          <p>New user?<a href="/signin">Signin</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
