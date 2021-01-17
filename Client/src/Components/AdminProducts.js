import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,ButtonGroup
} from 'reactstrap';

class AdminProducts extends Component{

  state = {
        products:[]
  };

  componentDidMount(){
    const headers = {
        method:'GET'
    };
              
    fetch( `https://choclatesite.herokuapp.com/products`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          products:response,
          productsWithoutFilters:response
        })
      })
      .catch(err=>console.log(err))
  }

  changeQuantity = (id,isplus) => {
    const quantityHeaders = {
      method:'GET', 
      credentials: 'include'
    };

    let quantityValues = {
      id:id,
      quantity:0
    }

    fetch( `https://choclatesite.herokuapp.com/products/${id}`, quantityHeaders)
    .then(response=>response.json())
    .then(response=>{
      if(isplus)
      {
        quantityValues.quantity = response[0].quantity+1
      }
      else
      {
        quantityValues.quantity = response[0].quantity-1
      }
        const quantityHeaders = {
          method:'PUT', 
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(quantityValues)
        };

        fetch( `https://choclatesite.herokuapp.com/products/`, quantityHeaders)
        .then(response=>response.json())
        .then(response=>response)
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }

  addProduct = (id,i) => {

    let {products} = this.state;

    products[i].quantity += 1;

    this.setState({
      products:products
    })

    this.changeQuantity(id,true);

  }

  reduceProduct = (id,i,quantity) => {
      let {products} = this.state;

      if(quantity-1 >= 0)
      {
        products[i].quantity -= 1;
      }

      this.setState({
        products:products
      })

      this.changeQuantity(id,false);
  }

  render(){
    return (
      <div className="container">
        <h1>Products</h1>
        <div className="row d-flex justify-content-center">
        {
          this.state.products.length === 0  ? <div>No Products</div>
              :  this.state.products.map((product,i)=>{
                  return(
                   <Card  key={i} className="col-md-3 m-3 card shadow bg-white text-center" >
                    <CardImg style={{height:"190px"}} className="p-3" src={`/${product.img}`} alt="product-img" />
                    <CardBody>
                      <CardTitle tag="h5" style={{color:"#0c73c2"}}>{product.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{product.brand}</CardSubtitle>
                      <ButtonGroup className="m-2">
                        <div className="buton1" onClick={()=>{this.reduceProduct(product._id,i,product.quantity)}}>-</div>
                        <div className="p-1" style={{color:"#0b498f"}}>{product.quantity}</div>
                        <div className="buton1" onClick={()=>{this.addProduct(product._id,i)}}>+</div>    
                      </ButtonGroup>
                      <CardText><div>{product.flavour}</div>
                                <h5 className="p-3" style={{color:"#068899"}}>₹ {product.cost}</h5>
                      </CardText>
                     
                    </CardBody>
                   </Card>      
                )})
        }
        </div>
      </div>
    );
  }
}

export default AdminProducts;
