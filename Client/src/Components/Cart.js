import React,{Component} from 'react';

class Cart extends Component{
  state={
    cart:[],
    orders:[]
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

  availablePlus = (id,i,quantity) => {
    let {cart} = this.state;

    const headers = {
      method:'GET', 
      credentials: 'include'
    };

    fetch( `http://localhost:3000/products/${id}`, headers)
    .then(response=>response.json())
    .then(response=>{
      if(quantity+1 <= response[0].quantity)
      {
        cart[i].quantity += 1;
      }
    })
    .catch(err=>console.log(err))

    this.setState({
      cart:cart
    })
  }

  availableMinus = (i,quantity) => {
    let {cart} = this.state;

    if(quantity-1 > 0)
    {
      cart[i].quantity -= 1;
    }

    this.setState({
      cart:cart
    })
  }

  order = (e) => {
    let cartproduct=[];
    cartproduct = this.state.cart.filter(p => p._id !== e._id)

    this.setState({
      cart:cartproduct
    })
    
    const values = {
      UserId:this.props.emailId,
      Tracking:"ordered",
      quantity:e.quantity,
      ProductId:e._id,
      Address:{
        Street:" River",
        LandMark: "Police Station",
        Town:"Vellore",
        District:"Vellore",
        Pincode:632107
    }
    }

    const headers = {
      method:'POST', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(values)
    };

    fetch( `http://localhost:3000/order/`, headers)
    .then(response=>response.json())
    .then(response=>response)
    .catch(err=>console.log(err))

    const cartValues = {
      mailId:this.props.emailId,
      cart:cartproduct
    }

    const cartHeaders = {
      method:'PUT', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartValues)
    };

    fetch( `http://localhost:3000/users/addtocart`, cartHeaders)
    .then(response=>response.json())
    .then(response=>response)
    .catch(err=>console.log(err))
  }


  delete = (e) => {
    let cartproduct = this.state.cart.filter(p => p._id !== e._id)

    this.setState({
      order:[...this.state.orders,e],
      cart:cartproduct
    })

    const cartValues = {
      mailId:this.props.emailId,
      cart:cartproduct
    }

    const cartHeaders = {
      method:'PUT', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartValues)
    };

    fetch( `http://localhost:3000/users/addtocart`, cartHeaders)
    .then(response=>response.json())
    .then(response=>response)
    .catch(err=>console.log(err))
  }

  render(){
    return (
      <div>
        <h1>Cart</h1>
        <div className="d-flex">
        {
          this.state.cart.length === 0  ? <div>Cart is Empty</div>
              :  this.state.cart.map((product,i)=>{
                  return(
                    <div key={i}>
                    <img src={`/${product.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
                    <div>{product.name}</div>
                    <div>{product.brand}</div>
                    <div>{product.flavour}</div>
                    <div>{product.cost}</div>
                    <div className="d-flex">
                      <button onClick={()=>{this.availablePlus(product._id,i,product.quantity)}}>+</button><div>{product.quantity}</div><button onClick={()=>{this.availableMinus(i,product.quantity)}}>-</button>
                    </div>
                    <button onClick={()=>{this.order(product)}}>Buy Now</button><br/>
                    <button onClick={()=>{this.delete(product)}}>Delete</button>
                  </div>
                )})
        }
        </div>
        <div onClick={()=>{this.props.history.push('./orders')}}>Order</div>
      </div>
    );
  }
}

export default Cart;
