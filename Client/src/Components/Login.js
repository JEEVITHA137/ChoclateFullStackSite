import React,{Component} from 'react';
import {Form, FormGroup, Label, FormText } from 'reactstrap';
import { hostname } from './hostname';

class Login extends Component{
  state = {
    mailId:"",
    pass:"",
    EmailError:"",
    PassError:"",
    login:[],
    loginError:"",
    istrue:false,
    type:"password"
  };

  componentDidMount(){
    this.props.getLogin()
  }

  submit= (e) =>{   
    e.preventDefault();
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
          method:'GET'
        };
          
        fetch( `${hostname}users/${this.state.mailId}/${this.state.pass}`, headers)
          .then(response=>response.json())
          .then(response=>{
            if(response.length > 0)
            {
              this.props.getEmail(this.state.mailId,response[0].name);
              if(this.state.mailId === "Admin@gmail.com")
              {
                this.props.history.push('./adminproducts');
              }
              else
              {
                this.props.addToCart(true);
                this.props.history.push('./');
              }
              
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
      <div className="background" >
      <img src="./logo.png" className="logo1" alt="Logo" onClick={() =>  this.props.history.push("/")}></img>
      <div class="container login">
            <div class="row justify-content-center m-2">
                <div class="col-md-5 login-form-1">
               
                </div>
                <div class="col-md-5 login-form-2">
                 <Form className="login" onSubmit={(e) => this.submit(e)}>
                  <h3 className="pb-2">Login</h3>

                  <FormText>{this.state.loginError}</FormText>
                  
                  <FormGroup row className="p-2">
                      <Label className="col-4 text-center" for="EmailId"  ><h5>Email-Id:</h5></Label>
                      <div className="col-8 col-md-7 justify-content-center">
                          <input type="string" style={{height:"2rem"}} placeholder="Give your Email Id"
                            value={this.state.mailId} onChange={this.handleEmailChange} />
                          <FormText>{this.state.EmailError}</FormText>
                      </div>
                  </FormGroup>
                  
                  <FormGroup row className="p-2">
                      <Label className="col-4 text-center" for="Password" ><h5>Password:</h5></Label>
                      <div className="col-8 col-md-7 justify-content-center">
                        <div className="pass-wrapper">
                          <input  type={this.state.type} style={{height:"2rem"}} placeholder="Give your Password"
                            value={this.state.pass} onChange={this.handlePassChange}  /> 
                          <img src={this.state.type === "password" ? "./show-password1.png" : "./show-password.png"} alt="show" style={{height:"1.5rem"}} onClick={this.state.type === "password" ? () => {this.setState({type:"text"})} : ()=>{this.setState({type:"password"})} }></img>
                        </div>
                          <FormText className=" p-1">{this.state.PassError}</FormText>
                      </div>
                  </FormGroup>

                  <FormGroup className="row">
                      <div className="col-2 offset-4">
                          <div className="buton" type = "submit" style={{width:"150px"}} onClick={this.submit}>Login</div>
                      </div>
                  </FormGroup>
                  <h5 className="p-3">New user?<a href="/signin" style={{color:"#400080"}}> Signup</a></h5>
                  </Form>
                </div>
            </div>
        </div>

      </div>
    );
  }
}

export default Login;
