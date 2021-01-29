import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, ButtonGroup,
  Modal,ModalHeader,ModalFooter
} from 'reactstrap';
import { hostname } from './hostname';

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
    modal:false,
    profilemodal:false
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
        console.log(response[0])
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

  order = (e) => {
    if(this.props.emailId !== "")
    {
      console.log(this.state.Street)
      if(this.state.Street !== null && this.state.Street !== "")
      {

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


  delete = (e) => {
    if(this.props.emailId !== "")
    {
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
      <div className="container background" style={{minHeight:'78vh'}}>
        <h4 className="mt-3" style={{color:"#0b498f"}}>Cart</h4>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>You need to login to buy product</ModalHeader>
        <ModalFooter>
          <div className="buton"  onClick={()=>{this.props.history.push('./login')}}>Login</div>{' '}
        </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.profilemodal} toggleprofile={this.toggleprofile}>
        <ModalHeader toggleprofile={this.toggleprofile}>Add the address in profile</ModalHeader>
        <ModalFooter>
          <div className="buton"  onClick={()=>{this.props.history.push('./profile')}}>Go to Profile</div>{' '}
        </ModalFooter>
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
                        <div  className="buton m-1 p-2" onClick={()=>{this.order(product)}}>Buy Now</div>
                        <div  className="buton m-1 p-2" onClick={()=>{this.delete(product)}}>Delete</div>
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
