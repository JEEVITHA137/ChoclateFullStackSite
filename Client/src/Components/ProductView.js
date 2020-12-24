import React,{Component} from 'react';

class ProductView extends Component{
  state={
    cart:[],
    cartvalue:[]
  }

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
          cart:response[0].myCart
        })
      })
      .catch(err=>console.log(err))
    }

  }

  ispresentincart = (e) => {

    let existingproduct = this.state.cart.filter(p => p._id === e)
    if(existingproduct.length > 0)
    {
      return true;
    }
    else{
      return false;
    }
   
  }
  
  AddCart=(e)=>{
    if(this.props.emailId !== "")
    {
      e.quantity = 1;
      this.setState({
        cart:[...this.state.cart,e]
      });

      const values = {
        mailId:this.props.emailId,
        cart:this.state.cart.concat(e)
      }

      const headers = {
        method:'PUT', 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
  
      fetch( `http://localhost:3000/users/addtocart`, headers)
      .then(response=>response.json())
      .then(response=>response)
      .catch(err=>console.log(err))
    }
  }

  render(){
    return (
      <div>
        <h1>Product View</h1>
        <div onClick={()=>{this.props.history.push('./cart')}}>Cart</div>
        <img src={`/${this.props.viewproduct.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
        <div>{this.props.viewproduct.name}</div>
        <div>{this.props.viewproduct.brand}</div>
        <div>{this.props.viewproduct.flavour}</div>
        <div>{this.props.viewproduct.cost}</div>
        {
          this.ispresentincart(this.props.viewproduct._id) === true ?<button>In Cart</button> : <button onClick={()=>{this.AddCart(this.props.viewproduct)}}>AddtoCart</button>
        }
      </div>
    );
  }
}

export default ProductView;
