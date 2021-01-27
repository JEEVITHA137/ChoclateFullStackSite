import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Input , Modal,ModalHeader,ModalFooter
} from 'reactstrap';
import { hostname } from './hostname';

class ProductView extends Component{
  state={
    cart:[],
    review:"",
    reviewArray:[]
  }

  componentDidMount(){
    const values = {
      id:this.props.viewproduct._id
    }

    const headers = {
      method:'GET'
    };

    fetch(`${hostname}products/${this.props.viewproduct._id}`, headers)
    .then(response=>response.json())
    .then(response=>{
      this.setState({
        reviewArray:response[0].reviews
      })
    })

    .catch(err=>console.log(err))
    if(this.props.emailId !== "")
    {
      const headers = {
        method:'GET'
      };

      fetch(`${hostname}users/${this.props.emailId}`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          cart:response[0].myCart,
          islogin:true
        })
      })
      .catch(err=>console.log(err))
    }
    else
    {
      this.setState({
        cart:this.props.cart
      })
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

  toggle = () =>{
    this.setState({
      modal:!this.state.modal
    })
  }

  reviewChange = (e) => {
    if(this.props.emailId === "")
    {
      this.toggle();
    }
    else
    {
      this.setState({
        review:e.target.value
      })
    }
  }

  reviewSubmit = (id) => {
    if(this.props.emailId === "")
    {
      this.toggle();
    }
    else
    {
      const reviewProduct = {
        user:this.props.user,
        reviews:this.state.review
      }

      this.setState({
        reviewArray:[...this.state.reviewArray,reviewProduct]
      });

      const values = {
        id:id,
        reviews:this.state.reviewArray.concat(reviewProduct)
      }

      console.log(values)

      const headers = {
        method:'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
  
      fetch( `${hostname}products/reviews`, headers)
      .then(response=>response.json())
      .then(response=>response)
      .catch(err=>console.log(err))
    }
  }
  
  AddCart=(e)=>{
    if(this.props.emailId !== "")
    {
      const cartproduct = {
        _id:e._id,
        name:e.name,
        flavour:e.flavour,
        cost:e.cost,
        quantity:1,
        brand:e.brand,
        img:e.img
      }

      this.setState({
        cart:[...this.state.cart,cartproduct]
      });

      const values = {
        mailId:this.props.emailId,
        cart:this.state.cart.concat(cartproduct)
      }

      const headers = {
        method:'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
  
      fetch( `${hostname}users/addtocart`, headers)
      .then(response=>response.json())
      .then(response=>response)
      .catch(err=>console.log(err))
    }
    else{
      e.quantity=1;
      this.setState({
        cart:[...this.state.cart,e]
      });
      this.props.getCart(e);
    }
  }

  render(){
    console.log(this.props.user)
    return (
      <div className="container" style={{minHeight:'77vh'}} >
        <h3 className="mt-3" style={{color:"#0c73c2"}}>Product View</h3>
        <div className="row ml-3">
        <Card className="col-5 p-3 shadow bg-white " >
        <CardImg  width="100%" style={{height:"350px"}} src={`/${this.props.viewproduct.img}`} alt="product-img" />
        </Card>  
        <CardBody>
          <CardTitle tag="h5" style={{color:"#068899"}}>{this.props.viewproduct.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.viewproduct.brand}</CardSubtitle>
          <CardText><div>{this.props.viewproduct.flavour}</div>
                    <div style={{color:"#0c73c2"}}>₹ {this.props.viewproduct.cost}</div></CardText>
          {
          this.ispresentincart(this.props.viewproduct._id) === true ?
          <div disabled="true" className="cartbuton" >In Cart<img src='../cart.svg' alt="cart"  style={{width:"40px",height:"40px"}}></img></div> 
          : this.props.viewproduct.quantity !== 0 ?
           <div className="cartbuton" onClick={()=>{this.AddCart(this.props.viewproduct)}}>Add to Cart<img src='../cart.svg' alt="cart" style={{width:"40px",height:"40px"}}></img></div> :
           <div disabled="true" className="buton">Out of Stock</div> 
        }
        </CardBody>
        </div> 
        <p>Reviews</p>
        <Input type="string" style={{height:"7rem",width:"80%"}} placeholder="Write Your Reviews"  value={this.state.review} onChange={this.reviewChange}/>
        <div className="buton mt-1" onClick={()=>{this.reviewSubmit(this.props.viewproduct._id)}}>Submit</div>
        <div>{this.state.reviews}</div>

        {this.state.reviewArray.length !== 0 
                ? this.state.reviewArray.map((review,i)=>{
                  return(
                      <div key={i} className="m-2 pb-2">
                        <div className="d-flex">
                          <img src="./user.png" style={{width:"35px",height:"35px"}}></img>
                          <h6 className="p-2" style={{color:"#068899"}}>{review.user}</h6>
                        </div>
                        <h6 className="pl-4" style={{color:"grey"}}>{review.reviews}</h6>
                      </div>
                  )
                  })
                :<div></div>}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>You need to login to write a review</ModalHeader>
        <ModalFooter>
          <div className="buton"  onClick={()=>{this.props.history.push('./login')}}>Login</div>{' '}
        </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProductView;
