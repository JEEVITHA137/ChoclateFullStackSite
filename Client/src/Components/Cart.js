import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, ButtonGroup,Modal
} from 'reactstrap';
import { hostname } from './hostname';

class Cart extends Component{
  state={
    products:[],
    cartproduct:[],
    cart:[],
    orders:[],
    HouseNo:"",
    Street:"",
    LandMark:"",
    Town:"",
    District:"",
    Pincode:"",
    phoneNo:"",
    modal:false,
    profilemodal:false,
    isAvaliableStock : []
  }


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
          cart:response[0].myCart
        })
      })
      .catch(err=>console.log(err))

      fetch( `${hostname}products`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          products:response
        })
      })
      .catch(err=>console.log(err))

      fetch( `${hostname}users/${this.props.emailId}`, headers)
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

      
    } 
    else{
      this.setState({
        cart:this.props.cart
      })
    }
  }

  toggle = () =>{
    this.setState({
      modal:!this.state.modal
    })
  }

  toggleprofile = () =>{
    this.setState({
      profilemodal:!this.state.profilemodal
    })
  }

  availablePlus = (id,i,quantity) => {
    if(this.props.emailId !== "")
    {
      let {cart} = this.state;

      const headers = {
        method:'GET'
      };

      fetch( `${hostname}products/${id}`, headers)
      .then(response=>response.json())
      .then(response=>{
        if(quantity+1 <= response[0].quantity)
        {
          cart[i].quantity = cart[i].quantity + 1;
        }
      })
      .catch(err=>console.log(err))

      this.setState({
        cart:cart
      })
    }
    else
    {
      this.toggle();
    }
  }

  isAvaliable = (key) => {

    let cartproduct = [];
    this.state.cart.map((cart,i) =>{
      this.state.products.map((product)=>{
        if(cart._id === product._id)
        {
          cartproduct[i] = product.quantity
        }
        return null;
      })
      return null;
    })

    return cartproduct[key];
  }


  availableMinus = (i,quantity) => {
    if(this.props.emailId !== "")
    {
      let {cart} = this.state;

      if(quantity-1 > 0)
      {
        cart[i].quantity -= 1;
      }

      this.setState({
        cart:cart
      })
    }
    else
    {
      this.toggle();
    }
  }

  order = (e,key) => {
    if(this.props.emailId !== "")
    {
      if(this.state.Street !== null && this.state.Street !== "")
      {

        let cartproduct = [];
        let j=0;
        this.state.cart.map((product,i)=>{
          if(key !== i)
          {
            cartproduct[j] = product;
            j++;
          }
          return null;
        })

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
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(values)
        };

        fetch( `${hostname}order/`, headers)
        .then(response=>response.json())
        .then(response=>response)
        .catch(err=>console.log(err))

        const cartValues = {
          mailId:this.props.emailId,
          cart:cartproduct
        }

        const cartHeaders = {
          method:'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartValues)
        };

        fetch( `${hostname}users/addtocart`, cartHeaders)
        .then(response=>response.json())
        .then(response=>response)
        .catch(err=>console.log(err))

        const quantityHeaders = {
          method:'GET', 
        };

        let quantityValues = {
          id:e._id,
          quantity:0
        }

        fetch( `${hostname}products/${e._id}`, quantityHeaders)
        .then(response=>response.json())
        .then(response=>{
            quantityValues.quantity = response[0].quantity-e.quantity

            const quantityHeaders = {
              method:'PUT', 
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify(quantityValues)
            };

            fetch( `${hostname}products/`, quantityHeaders)
            .then(response=>response.json())
            .then(response=>response)
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
      }
      else
      {
        this.toggleprofile();
      }
    }
    else
    {
      this.toggle();
    }
  }


  delete = (e,key) => {
    if(this.props.emailId !== "")
    {
      let cartproduct = [];
      let j=0;
      this.state.cart.map((product,i)=>{
          if(key !== i)
          {
            cartproduct[j] = product;
            j++;
          }
          return null;
      })
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartValues)
      };

      fetch( `${hostname}users/addtocart`, cartHeaders)
      .then(response=>response.json())
      .then(response=>response)
      .catch(err=>console.log(err))
    }
    else
    {
      this.toggle();
    }
  }

  render(){
    return (
      <div className="container" style={{minHeight:'78vh'}}>
        <h4 className="mt-3" style={{color:"#0b498f"}}>Cart</h4>

        <Modal className="m-2" isOpen={this.state.modal} toggle={this.toggle}>
        <div className="info" style={{fontSize:"20px"}} toggle={this.toggle}>You need to login to buy product</div>
          <div className="buton mb-2" style={{transform:"translateX(170%)"}} onClick={()=>{this.props.history.push('./login')}}>Login</div>{' '}
        </Modal>

        <Modal className="m-2" isOpen={this.state.profilemodal} toggleprofile={this.toggleprofile} onClick={this.toggleprofile}>
        <div className="info" style={{fontSize:"20px"}}  toggleprofile={this.toggleprofile}>Add the address in profile</div>
          <div className="buton mb-2" style={{transform:"translateX(170%)"}} onClick={()=>{this.props.history.push('./profile')}}>Go to Profile</div>{' '}
        </Modal>

        <div className="row p-2">
        {
          this.state.cart.length === 0  ? <h4>Cart is Empty</h4>
              :  this.state.cart.map((product,i)=>{
                  return(
                    <Card  key={i} className="col-md-3 m-4 card shadow bg-white text-center" >
                    <CardImg style={{height:"190px"}} className="p-3" src={`${hostname}${product.img}`} alt="product-img" />
                    <CardBody>
                      <CardTitle tag="h5" style={{color:"#0c73c2"}}>{product.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{product.brand}</CardSubtitle>
                      <CardText><div>{product.flavour}</div>
                                <h5 className="p-3" style={{color:"#068899"}}>₹ {product.cost}</h5></CardText>
                        <ButtonGroup className="m-2">
                        <div className="buton1" onClick={()=>{this.availableMinus(i,product.quantity)}}>-</div>
                        <div className="p-1" style={{color:"#0b498f"}}>{product.quantity}</div>
                        <div className="buton1" onClick={()=>{this.availablePlus(product._id,i,product.quantity)}}>+</div>    
                        </ButtonGroup>
                        
                        <ButtonGroup>
                       
                        {this.isAvaliable(i) !== 0 ? <div  className="buton m-1 p-2" onClick={()=>{this.order(product,i)}}>Buy Now</div> : <div  className="buton m-1 p-2">Out Of Stock</div>}
                        <div  className="buton m-1 p-2" onClick={()=>{this.delete(product,i)}}>Delete</div>
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
