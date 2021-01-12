import React,{Component} from 'react';
import {
  Card, Button, Form, FormGroup, Label, Input,FormText
} from 'reactstrap';

class Profile extends Component{
  state = {
    userDetails:[],
    HouseNo:"",
    Street:"",
    LandMark:"",
    Town:"",
    District:"",
    Pincode:"",
    edit:false,
    name:"",
    mailId:"",
    phoneNo:"",
    error:""
  };

  componentDidMount(){
    if(this.props.emailId !== "")
    {
      const headers = {
        method:'GET', 
        credentials: 'include'
      };

      fetch( `http://localhost:3000/users/${this.props.emailId}`, headers)
        .then(response=>response.json())
        .then(response=>{
          this.setState({
            name:response[0].name,
            mailId:response[0].mailId,
            phoneNo:response[0].phoneNo,
            HouseNo:response[0].address.HouseNo,
            Street:response[0].address.Street,
            LandMark:response[0].address.LandMark,
            Town:response[0].address.Town,
            District:response[0].address.District,
            Pincode:response[0].address.Pincode,
          })
        })
        .catch(err=>console.log(err))
    } 
  }

  editProfile = () => {
    this.setState({
      edit:true
    })
  }

  uploadProfile = (e) => {
    e.preventDefault();
    if(this.state.Street !== null && this.state.LandMark !== null && this.state.Town !== null &&  this.state.District !== null && this.state.Pincode !== 0 && this.state.phoneNo !== 0)
    {
      const values = {
        mailId:this.props.emailId,
        name:this.state.name,
        address:{
          HouseNo:this.state.HouseNo,
          Street:this.state.Street,
          LandMark:this.state.LandMark,
          Town:this.state.Town,
          District:this.state.District,
          Pincode:this.state.Pincode
        },
        phoneNo:this.state.phoneNo
      }

      const headers = {
        method:'PUT', 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };

      fetch( `http://localhost:3000/users/profile`, headers)
      .then(response=>response.json())
      .then(response=>response)
      .catch(err=>console.log(err))

      this.setState({
        edit:false,
        error:""
      })
    }
    else
    {
      this.setState({
        error:"Enter the required fields"
      })
    }
  }

  render(){
    return (
      <div className="container" >
         <div className="row p-2">
     <h4 className="col-5 m-1" >Profile</h4>
     {this.state.edit
             ? null :
     <Button className="col-5 m-1"
             onClick={this.editProfile}>Edit Profile</Button>}
     </div>
          {this.state.edit
             ? 
             <Card body outline color="secondary" className="col-10 m-1">
        <Form className="form" onSubmit={(e) => this.uploadProfile(e)}>

          <h3 className="m-2">Edit Profile</h3>
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="UName" ><h5>Name:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="EmailUNameId" placeholder="Give your Name"
                    value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
              </div>
          </FormGroup>
          <h6>Address: </h6>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="HNo" ><h5>HouseNo/FlatNo</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="HNo" placeholder="Give your Flat No"
                   value={this.state.HouseNo} onChange={(e)=>{this.setState({HouseNo:e.target.value})}}/>
              </div>
          </FormGroup>
          
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Street" ><h5>Street</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Street" placeholder="Give your Street"
                  value={this.state.Street} onChange={(e)=>{this.setState({Street:e.target.value})}}/>
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="LandMark" ><h5>LandMark</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="LandMark" placeholder="Give your LandMark"
                   value={this.state.LandMark} onChange={(e)=>{this.setState({LandMark:e.target.value})}}/>
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Town" ><h5>Town</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Town" placeholder="Give your Town"
                  value={this.state.Town} onChange={(e)=>{this.setState({Town:e.target.value})}}/>
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="District" ><h5>District</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="District" placeholder="Give your District"
                  value={this.state.District} onChange={(e)=>{this.setState({District:e.target.value})}}/>
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Pincode" ><h5>Pincode</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="Pincode" placeholder="Give your Pincode"
                 value={this.state.Pincode} onChange={(e)=>{this.setState({Pincode:e.target.value})}}/>
              </div>
          </FormGroup>

          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="phoneNo" ><h5>phoneNo</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <Input type="string" style={{height:"2rem"}} id="phoneNo" placeholder="Give your phoneNo"
                 value={this.state.phoneNo} onChange={(e)=>{this.setState({phoneNo:e.target.value})}}/>
              </div>
          </FormGroup>
          <FormText><h5>{this.state.error}</h5></FormText>
          <FormGroup className="row p-2">
              <div className="col-4 offset-7">
                  <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                      type = "submit" onClick={(e) => this.uploadProfile(e)}>Update</Button>
              </div>
          </FormGroup>
      </Form>
                </Card>
             : 

             <Card body outline color="secondary" className="col-10 m-1">
               <div className="row p-2 m-1">Name: {this.state.name}</div>
               <div className="row p-2 m-1">EmailId: {this.state.mailId}</div>

               <h6 className="row p-2 m-1 text-center">Address: </h6>

               <div className="row p-2 m-1">HouseNo/FlatNo: {this.state.HouseNo}</div>
               <div className="row p-2 m-1">Street: {this.state.Street}</div>
               <div className="row p-2 m-1">LandMark: {this.state.LandMark}</div>
               <div className="row p-2 m-1">Town: {this.state.Town}</div>
               <div className="row p-2 m-1">District: {this.state.District}</div>
               {this.state.Pincode !==0 ? <div className="row p-2 m-1">Pincode:{this.state.Pincode}</div>:
               <div className="row p-2 m-1">Pincode: -</div>}
                 {this.state.phoneNo !==0 ? <div className="row p-2 m-1" > phoneNo:{this.state.phoneNo}</div>:
                      <div className="row p-2 m-1" >phoneNo:</div>}

                </Card>
          }
      </div>
    );
  }
}

export default Profile;
