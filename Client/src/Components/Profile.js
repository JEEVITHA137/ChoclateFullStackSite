import React,{Component} from 'react';

class Profile extends Component{
  state = {
    userDetails:[]
  };

  componentDidMount(){
    if(this.props.emailId !== "")
    {
      const values = {
        mailId:this.props.emailId
      } 
      const headers = {
        method:'GET', 
        credentials: 'include'
      };

      fetch( `http://localhost:3000/users/${this.props.emailId}`, headers)
        .then(response=>response.json())
        .then(response=>{
          this.setState({
            userDetails:response
          })
          console.log(response)
        })
        .catch(err=>console.log(err))

      fetch( `http://localhost:3000/products`, headers)
        .then(response=>response.json())
        .then(response=>{
          this.setState({
            products:response
          })
        })
        .catch(err=>console.log(err))
    } 
  }

  render(){

    return (
      <div>
        <header>
          <h1>Profile</h1>
          {
                this.state.userDetails.length !==0 ? 
                        <div>{this.state.userDetails[0].name}{this.state.userDetails[0].address}{this.state.userDetails[0].mailId}</div>
                :<div></div>
          }
        </header>
      </div>
    );
  }
}

export default Profile;
