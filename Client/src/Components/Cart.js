import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup
} from 'reactstrap';

class Cart extends Component{
  state={
    cart:[],
    orders:[],
    HouseNo:"",
    Street:"",
    LandMark:"",
    Town:"",
    District:"",
    Pincode:"",
    phoneNo:"",
    error:""
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
        cart[i].quantity = cart[i].quantity + 1;
      }
    })
    .catch(err=>console.log(err))

    fetch( `http://localhost:3000/users/${this.props.emailId}`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
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
    if(this.state.Street !== null)
    {
      this.setState({
        error:" "
      })
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
          HouseNo:this.state.HouseNo,
          Street:this.state.Street,
          LandMark: this.state.LandMark,
          Town:this.state.Town,
          District:this.state.District,
          Pincode:this.state.Pincode
        },
        phoneNo:this.state.phoneNo
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

      const quantityHeaders = {
        method:'GET', 
        credentials: 'include'
      };

      let quantityValues = {
        id:e._id,
        quantity:0
      }

      fetch( `http://localhost:3000/products/${e._id}`, quantityHeaders)
      .then(response=>response.json())
      .then(response=>{
          quantityValues.quantity = response[0].quantity-e.quantity

          const quantityHeaders = {
            method:'PUT', 
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(quantityValues)
          };

          fetch( `http://localhost:3000/products/`, quantityHeaders)
          .then(response=>response.json())
          .then(response=>response)
          .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
    }
    else
    {
      this.setState({
        error:"Add the Address in Profile"
      })
    }
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
      <div className="container ">
        <h1>Cart</h1>
        <div>{this.state.error}</div>
        <div className="row p-2">
        {
          this.state.cart.length === 0  ? <h4>Cart is Empty</h4>
              :  this.state.cart.map((product,i)=>{
                  return(

                    <Card  key={i} className="col-5 col-md-2 m-1" >
                    <CardImg top width="100%" height="35%" className="p-3" src={`/${product.img}`} alt="product-img" />
                    <CardBody>
                      <CardTitle tag="h5">{product.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{product.brand}</CardSubtitle>
                      <CardText><div>{product.flavour}</div>
                                <h5 className="p-3">₹ {product.cost}</h5></CardText>
                        <ButtonGroup className="m-2">
                        <Button onClick={()=>{this.availableMinus(i,product.quantity)}}>-</Button>
                        <Button disabled="true">{product.quantity}</Button>
                        <Button onClick={()=>{this.availablePlus(product._id,i,product.quantity)}}>+</Button>    
                        </ButtonGroup>
                        
                        <ButtonGroup>
                       
                        <Button  className="m-1 p-2" onClick={()=>{this.order(product)}}>Buy Now</Button>
                        <Button  className="m-1 p-2" onClick={()=>{this.delete(product)}}>Delete</Button>
                        
                        </ButtonGroup>
                    </CardBody>
                  </Card>      
                  
                )})
        }
        </div>
      </div>
    );
  }
}

export default Cart;
