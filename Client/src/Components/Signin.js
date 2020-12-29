import React,{Component} from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';

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
    e.preventDefault();
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
      <div className="container">
      <Form className="form" onSubmit={(e) => this.submit(e)}>
          <h3 className="m-2">Signin</h3>
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="EmailId" ><h5>Email-Id:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="EmailId" placeholder="Give your Email Id"
                     value={this.state.mailId} onChange={this.handleEmailChange} />
              </div>
          </FormGroup>
          <FormText>
              {this.state.EmailError}
          </FormText>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Username" ><h5>Username:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Username" placeholder="Give your Username"
                     value={this.state.name} onChange={this.handleNameChange}/>
              </div>
          </FormGroup>
          <FormText>
              {this.state.NameError}
          </FormText>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Password" ><h5>Password:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="password" style={{height:"2rem"}} id="Password" placeholder="Give your Password"
                     value={this.state.pass} onChange={this.handlePassChange} />
                  <FormText>
                      {this.state.passError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.passError}</h6>}
                  </FormText>
              </div>
          </FormGroup>
          <FormText>
          {this.state.PassError}
          </FormText>
          <FormText>
              {this.state.loginError}
          </FormText>
          <FormGroup className="row p-2">
              <div className="col-4 offset-7">
                  <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                      type = "submit" onClick={this.submit}>Login</Button>
              </div>
          </FormGroup>
          <h5>Already user?<a href="/login"> Login</a></h5>
      </Form>
  
  </div>
    );
  }
}

export default Signin;
