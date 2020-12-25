import React,{Component} from 'react';

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

  uploadProfile = () => {

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
      <div>
        <header>
          <h1>Profile</h1>
          <div>{this.state.error}</div>
          </header>
          <button onClick={this.editProfile}>Edit Profile</button>
          {this.state.edit
             ? 
              <div>
                <label>Name</label><input value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}></input><br/>
                <label>Address:</label><br/>
                <label>HouseNo/FlatNo</label><br/><input value={this.state.HouseNo} onChange={(e)=>{this.setState({HouseNo:e.target.value})}}></input><br/>
                <label>Street</label><br/><input value={this.state.Street} onChange={(e)=>{this.setState({Street:e.target.value})}}></input><br/>
                <label>LandMark</label><br/><input value={this.state.LandMark} onChange={(e)=>{this.setState({LandMark:e.target.value})}}></input><br/>
                <label>Town</label><br/><input value={this.state.Town} onChange={(e)=>{this.setState({Town:e.target.value})}}></input><br/>
                <label>District</label><br/><input value={this.state.District} onChange={(e)=>{this.setState({District:e.target.value})}}></input><br/>
                <label>Pincode</label><br/><input value={this.state.Pincode} onChange={(e)=>{this.setState({Pincode:e.target.value})}}></input><br/>
                <label>phoneNo</label><input value={this.state.phoneNo} onChange={(e)=>{this.setState({phoneNo:e.target.value})}}></input><br/>
                <button onClick={this.uploadProfile}>Update</button>
              </div>
             : <div>
                  <div>Name: {this.state.name}</div>
                  <div>EmailId: {this.state.mailId}</div>
                  {this.state.phoneNo !==0 ? <div>phoneNo:{this.state.phoneNo}</div>:<div>phoneNo:</div>}
                  <div>Address:
                    <div>{this.state.HouseNo}</div>
                    <div>{this.state.Street}</div>
                    <div>{this.state.LandMark}</div>
                    <div>{this.state.Town}</div>
                    <div>{this.state.District}</div>
                    {this.state.Pincode !==0 ? <div>Pincode:{this.state.Pincode}</div>:<div>Pincode:</div>}
                  </div>
                </div>
          }
          
        
      </div>
    );
  }
}

export default Profile;
