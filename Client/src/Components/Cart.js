import React,{Component} from 'react';

class Cart extends Component{
  state={
    cart:[]
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

  render(){
    return (
      <div>
        <h1>Cart</h1>
        <div className="d-flex">
        {
          this.state.cart.length === 0  ? <div>No results found</div>
              :  this.state.cart.map((product,i)=>{
                  return(
                    <div key={i}>
                    <img src={`/${product.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
                    <div>{product.name}</div>
                    <div>{product.brand}</div>
                    <div>{product.flavour}</div>
                    <div>{product.cost}</div>
                    <button>Buy Now</button>
                  </div>
                )})
        }
        </div>
      </div>
    );
  }
}

export default Cart;
