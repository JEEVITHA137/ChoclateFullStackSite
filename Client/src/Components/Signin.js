import React,{Component} from 'react';
import { Form, FormGroup, Label, Input,FormText} from 'reactstrap';

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
    EmailValid:"",
    NameValud:"",
    PassValid:""
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

    if(error===0 && this.state.EmailError === "" && this.state.NameError === "" && this.state.PassError === "")
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        };

    fetch( `https://choclatesite.herokuapp.com/users`, headers)
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
      EmailError:"Email must be at the Correct format",
      EmailValid:""
      })
    }
    else {
      this.setState({
      EmailError:"",
      EmailValid:"valid"
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
      NameError:"Username needs to be atleast 5 characters long",
      NameValid:""
      })
    }
    else if(!(alph.test(this.state.name))){
      this.setState({
      NameError:"Must be an alphabetics only",
      NameValid:"",
      })
    }
    else{
      this.setState({
      NameError:"",
      NameValid:"valid"
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
        PassError:"Must 6 letters",
        PassValid:""
      })
    }
    else if(!(passRegex.test(this.state.pass))){
      this.setState({
        PassError:"Must had Capital,Small and Numeric letters",
        PassValid:""
      })
    }
    else {
      this.setState({
         PassError:"",
         PassValid:"valid"
      })
    }
  }

  render(){
    return (
      <div className="container pt-5">
      <Form className="login" onSubmit={(e) => this.submit(e)}>
          <h3 className="m-2">Signin</h3>
          
          <FormText color="white">{this.state.loginError}</FormText>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="EmailId" ><h5>Email-Id:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="EmailId" placeholder="Give your Email Id"
                     value={this.state.mailId} onChange={this.handleEmailChange} valid={this.state.EmailValid}/>
                  <FormText color="white">{this.state.EmailError}</FormText>
              </div>
          </FormGroup>
        
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Username" ><h5>Username:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Username" placeholder="Give your Username"
                     value={this.state.name} onChange={this.handleNameChange} valid={this.state.NameValid}/>
                  <FormText color="white">{this.state.NameError}</FormText>
              </div>
          </FormGroup>
          
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Password" ><h5>Password:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="password" style={{height:"2rem"}} id="Password" placeholder="Give your Password"
                     value={this.state.pass} onChange={this.handlePassChange}  valid={this.state.PassValid}/>
                  <FormText color="white">{this.state.PassError}</FormText>
              </div>
          </FormGroup>
          <FormGroup className="row p-2">
              <div className="col-4 offset-7">
                  <div className="buton" type = "submit" onClick={this.submit}>Signin</div>
              </div>
          </FormGroup>
          <h5>Already user?<a href="/login" style={{color:"#1a2980"}}> Login</a></h5>
      </Form>
  
  </div>
    );
  }
}

export default Signin;
