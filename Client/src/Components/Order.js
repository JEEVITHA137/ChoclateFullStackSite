import React,{Component} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, ButtonGroup
} from 'reactstrap';

class Order extends Component{
  state={
    orders:[],
    products:[]
  }


  componentDidMount(){
    if(this.props.emailId !== "")
    {
      const headers = {
        method:'GET', 
        credentials: 'include'
      };

      fetch( `http://localhost:3000/order/${this.props.emailId}`, headers)
        .then(response=>response.json())
        .then(response=>{
          this.setState({
            orders:response
          })
        })
        .catch(err=>console.log(err))

      fetch( `http://localhost:3000/products`, headers)
        .then(response=>response.json())
        .then(response=>{
          this.setState({
            products:response
          })
        })
        .catch(err=>console.log(err))
    } 
  }

  cancel = (e,quantity) => {

    let product = this.state.orders.filter(p => p.ProductId !== e)

    this.setState({
      orders:product
    })

    const values = {
      mailId:this.props.emailId,
      ProductId:e
    }

    const headers = {
      method:'DELETE', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };

    fetch( `http://localhost:3000/order`, headers)
    .then(response=>response)
    .catch(err=>console.log(err))

    const quantityOfHeaders = {
      method:'GET', 
      credentials: 'include'
    };

    let quantityValues = {
      id: e,
      quantity:0
    }

    fetch( `http://localhost:3000/products/${e}`, quantityOfHeaders)
    .then(response=>response.json())
    .then(response=>{
        quantityValues.quantity = response[0].quantity+quantity

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

  render(){
    return (
      <div className="container">
        <h4 className="mt-3" style={{color:"#0b498f"}}>Your Orders</h4>
        <div className="row">
        {
          this.state.orders.length === 0  ? <div>Order is Empty</div>
              :  this.state.orders.map((order,i)=>{
                let product= this.state.products.filter(p => p._id === order.ProductId)
                  return(
                    product.length !== 0 ? 
                      <Card  key={i} className="col-md-3 m-4 card shadow bg-white text-center justify-content-center" >
                        <CardImg style={{height:"190px"}} className="p-3" src={`/${product[0].img}`} alt="product-img" />
                        <CardBody>
                          <CardTitle tag="h5" style={{color:"#0c73c2"}}>{product[0].name}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">{product[0].flavour}</CardSubtitle>
                          <CardText><div>Quantity : {order.quantity}</div>
                          {order.Tracking !== "delivered" ?<ButtonGroup><div style={{color:"#0b498f"}}>{order.Tracking}<br/> <div className="buton" onClick={()=>{this.cancel(order.ProductId,order.quantity)}}>Cancel</div></div></ButtonGroup>:<div style={{color:"#0b498f"}}>{order.Tracking}</div>}
                                <h5 className="p-3" style={{color:"#068899"}}>₹ {product[0].cost}</h5></CardText>
                        </CardBody>
                      </Card>
                      :<div  key={i}></div>
                )
             })
        }
        </div>
      </div>
    );
  }
}

export default Order;
