import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Input
} from 'reactstrap';

class ProductView extends Component{
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
    else{
      e.quantity=1;
      this.setState({
        cart:[...this.state.cart,e]
      });
      this.props.getCart(e);
    }
  }

  render(){
    return (
      <div className="container" >
        <h3 className="mt-3" style={{color:"#0b498f"}}>Product View</h3>
        <div className="row">
        <Card className="col-4 m-2" >
        <CardImg top width="100%" src={`/${this.props.viewproduct.img}`} alt="product-img" />
        </Card>  
        <CardBody>
          <CardTitle tag="h5">{this.props.viewproduct.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.viewproduct.brand}</CardSubtitle>
          <CardText><div>{this.props.viewproduct.flavour}</div>
                    <div>{this.props.viewproduct.cost}</div></CardText>
          {
          this.ispresentincart(this.props.viewproduct._id) === true ?
          <div disabled="true" className="buton" >In Cart<img src='../cart.svg' alt="cart" className="pl-1" style={{width:"40px",height:"40px"}}></img></div> 
          : this.props.viewproduct.quantity !== 0 ?
           <div className="buton" onClick={()=>{this.AddCart(this.props.viewproduct)}}>Add to Cart<img src='../cart.svg' alt="cart" className="pl-1" style={{width:"40px",height:"40px"}}></img></div> :
           <div disabled="true" className="buton">Out of Stock</div> 
        }
        </CardBody>
        </div> 
        <p>Reviews</p>
        <Input type="string" style={{height:"7rem",width:"80%"}} />
      </div>
    );
  }
}

export default ProductView;
