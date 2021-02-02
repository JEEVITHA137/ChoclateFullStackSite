import React,{Component} from 'react';
import { Form, FormGroup, Label, FormText} from 'reactstrap';
import { hostname } from './hostname';

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
    type:"password"
  };

  componentDidMount(){
    this.props.getLogin()
  }

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

      fetch( `${hostname}users`, headers)
        .then(response=>response.json())
        .then(response => {
          this.props.getEmail(this.state.mailId,this.state.name);
          this.props.addToCart(false);
          this.props.history.push('./');
        })
        .catch((err)=>{
        console.log(err)
        this.setState({
            EmailError:"Already exist"
        });
        })        
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
      EmailError:"",
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
      <div className="background">
      <img src="./logo.png" className="logo1" alt="Logo" onClick={() =>  this.props.history.push("/")}></img>
      <div class="container login">
        <div class="row justify-content-center m-2">
          <div class="col-md-5 login-form-1">
          </div>
          <div class="col-md-5 login-form-2">
            <Form className="container" onSubmit={(e) => this.submit(e)}>
            <h3 className="pb-2" >Signin</h3>
            
            <FormText color="white">{this.state.loginError}</FormText>

            <FormGroup row className="p-2">
                <Label className="col-4 text-center" for="EmailId" ><h5>Email-Id:</h5></Label>
                <div className="col-8 col-md-7 justify-content-center">
                    <input type="string" style={{height:"2rem"}} placeholder="Give your Email Id"
                      value={this.state.mailId} onChange={this.handleEmailChange}/>
                    <FormText>{this.state.EmailError}</FormText>
                </div>
            </FormGroup>
          
            <FormGroup row className="p-2">
                <Label className="col-4 text-center" for="Username" ><h5>Username:</h5></Label>
                <div className="col-8 col-md-7 justify-content-center">
                    <input type="string" style={{height:"2rem"}} placeholder="Give your Username"
                      value={this.state.name} onChange={this.handleNameChange}/>
                    <FormText>{this.state.NameError}</FormText>
                </div>
            </FormGroup>
            
            <FormGroup row className="p-2">
                <Label className="col-4 text-center" for="Password" ><h5>Password:</h5></Label>
                <div className="col-8 col-md-7 justify-content-center">
                  <div className="pass-wrapper">
                    <input type={this.state.type} style={{height:"2rem"}} placeholder="Give your Password"
                      value={this.state.pass} onChange={this.handlePassChange}/>
                    <img src={this.state.type === "password" ? "./show-password1.png" : "./show-password.png"} alt="show" style={{height:"1.5rem"}} onClick={this.state.type === "password" ? () => {this.setState({type:"text"})} : ()=>{this.setState({type:"password"})} }></img>
                  </div>
                    <FormText>{this.state.PassError}</FormText>
                </div>
            </FormGroup>
            <FormGroup className="row p-2">
                <div className="col-2 offset-4">
                    <div className="buton" type = "submit" style={{width:"150px"}} onClick={this.submit}>Signin</div>
                </div>
            </FormGroup>
            <h5 className="p-3">Already user?<a href="/login" style={{color:"#400080"}}> Login</a></h5>
            </Form>   
          </div>
         </div>
      </div>

      
  
  </div>
    );
  }
}

export default Signin;
