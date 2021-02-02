import React,{Component} from 'react';
import { hostname } from './hostname';
import {Card, Form, FormGroup, Label,FormText } from 'reactstrap';

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
        method:'GET'
      };

      fetch( `${hostname}users/${this.props.emailId}`, headers)
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };

      fetch( `${hostname}users/profile`, headers)
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
      <div className="container" style={{minHeight:'78vh'}}>
        <div className="row mt-3">
          <h3 className=" col-8">Profile</h3>
          {this.state.edit
                  ? null :
          <div className="buton" 
                  onClick={this.editProfile}>Edit Profile</div>}
        </div>
          {this.state.edit
             ? 
             <Card  className="col-10 m-2 profile card shadow bg-white">
                <Form className="form" onSubmit={(e) => this.uploadProfile(e)}>

                    <h3 className="p-2">Edit Profile</h3>
                    <FormGroup row >
                        <Label className="col-4 text-center" for="UName" >Name:</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="EmailUNameId" placeholder="Give your Name"
                              value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
                        </div>
                    </FormGroup>
                    <FormGroup row >
                        <Label className="col-4 text-center" for="HNo" >HouseNo/FlatNo</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="HNo" placeholder="Give your Flat No"
                            value={this.state.HouseNo} onChange={(e)=>{this.setState({HouseNo:e.target.value})}}/>
                        </div>
                    </FormGroup>
                    
                    <FormGroup row >
                        <Label className="col-4 text-center" for="Street" >Street</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="Street" placeholder="Give your Street"
                            value={this.state.Street} onChange={(e)=>{this.setState({Street:e.target.value})}}/>
                        </div>
                    </FormGroup>

                    <FormGroup row>
                        <Label className="col-4 text-center" for="LandMark" >LandMark</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="LandMark" placeholder="Give your LandMark"
                            value={this.state.LandMark} onChange={(e)=>{this.setState({LandMark:e.target.value})}}/>
                        </div>
                    </FormGroup>

                    <FormGroup row>
                        <Label className="col-4 text-center" for="Town" >Town</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="Town" placeholder="Give your Town"
                            value={this.state.Town} onChange={(e)=>{this.setState({Town:e.target.value})}}/>
                        </div>
                    </FormGroup>

                    <FormGroup row>
                        <Label className="col-4 text-center" for="District" >District</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="District" placeholder="Give your District"
                            value={this.state.District} onChange={(e)=>{this.setState({District:e.target.value})}}/>
                        </div>
                    </FormGroup>

                    <FormGroup row >
                        <Label className="col-4 text-center" for="Pincode" >Pincode</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="Pincode" placeholder="Give your Pincode"
                          value={this.state.Pincode} onChange={(e)=>{this.setState({Pincode:e.target.value})}}/>
                        </div>
                    </FormGroup>

                    <FormGroup row >
                        <Label className="col-4 text-center" for="phoneNo" >PhoneNo</Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <input type="string" style={{height:"2rem"}} id="phoneNo" placeholder="Give your phoneNo"
                          value={this.state.phoneNo} onChange={(e)=>{this.setState({phoneNo:e.target.value})}}/>
                        </div>
                    </FormGroup>
                    <FormText><h5>{this.state.error}</h5></FormText>
                    <FormGroup className="row p-1">
                        <div className="col-4 offset-7">
                            <div className="buton"
                                type = "submit" onClick={(e) => this.uploadProfile(e)}>Update</div>
                        </div>
                    </FormGroup>
                </Form>
                </Card>
             : 

             <Card  className="col-10 m-4 profileshow card shadow bg-white">
               <div className="row p-2 m-1"><div>Name : </div><div className="pl-2" style={{color:"black"}}>{this.state.name}</div></div>
               <div className="row p-2 m-1"><div>Email-Id : </div> <div className="pl-2" style={{color:"black"}}>{this.state.mailId}</div></div>

               <h5 className="row p-2 m-1 text-center" style={{color:"#400080"}}>Address</h5>

               <div className="row p-2 m-1"><div>HouseNo/FlatNo : </div> <div className="pl-2" style={{color:"black"}}>{this.state.HouseNo}</div></div>
               <div className="row p-2 m-1"><div>Street : </div> <div className="pl-2" style={{color:"black"}}>{this.state.Street}</div></div>
               <div className="row p-2 m-1"><div>LandMark : </div> <div className="pl-2" style={{color:"black"}}>{this.state.LandMark}</div></div>
               <div className="row p-2 m-1"><div>Town : </div> <div className="pl-2" style={{color:"black"}}>{this.state.Town}</div></div>
               <div className="row p-2 m-1"><div>District : </div> <div className="pl-2" style={{color:"black"}}>{this.state.District}</div></div>
               {this.state.Pincode !==0 ? <div className="row p-2 m-1"><div>Pincode : </div> <div className="pl-2" style={{color:"black"}}>{this.state.Pincode}</div></div>:
               <div className="row p-2 m-1"><div>Pincode : </div> <div className="pl-2" style={{color:"black"}}>-</div></div>}
                 {this.state.phoneNo !==0 ? <div className="row p-2 m-1" > <div>PhoneNo : </div> <div className="pl-2" style={{color:"black"}}>{this.state.phoneNo}</div></div>:
                      <div className="row p-2 m-1" > <div >PhoneNo : </div> <div className="pl-2" style={{color:"black"}}>-</div></div>}

                </Card>
          }
      </div>
    );
  }
}

export default Profile;
