import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
      <div className="container" >
        <h3>Product View</h3>
    <div className="row p-2">
        <Card className="col-6 col-offset-1 m-1">
        <CardImg top width="100%" className="p-3" src={`/${this.props.viewproduct.img}`} alt="product-img" />
        <CardBody>
          <CardTitle tag="h5">{this.props.viewproduct.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.viewproduct.brand}</CardSubtitle>
          <CardText><div>{this.props.viewproduct.flavour}</div>
                    <div>{this.props.viewproduct.cost}</div></CardText>
          {
          this.ispresentincart(this.props.viewproduct._id) === true ?
          <Button disabled="true" >In Cart</Button> 
          : this.props.viewproduct.quantity !== 0 ?
           <Button onClick={()=>{this.AddCart(this.props.viewproduct)}}>Add to Cart</Button> :
           <Button disabled="true" >Out of Stock</Button> 
        }
        </CardBody>
      </Card>  
      </div> 
      </div>
    );
  }
}

export default ProductView;
