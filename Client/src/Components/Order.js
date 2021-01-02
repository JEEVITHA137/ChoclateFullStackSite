import React,{Component} from 'react';

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

    console.log(product)
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
      <div>
        <h1>Your Orders</h1>
        <div className="d-flex">
        {
          this.state.orders.length === 0  ? <div>Order is Empty</div>
              :  this.state.orders.map((order,i)=>{
                let product= this.state.products.filter(p => p._id === order.ProductId)
                  return(
                    product.length !== 0 ? 
                      <div key={i}>
                        <img src={`/${product[0].img}`} alt="product-img" style={{width:"180px",height:"180px"}} ></img>
                        <div>{product[0].name}</div>
                        <div>{product[0].flavour}</div>
                        <div>Quantity : {order.quantity}</div>
                        {order.Tracking !== "delivered" ?<div>{order.Tracking} <button onClick={()=>{this.cancel(order.ProductId,order.quantity)}}>Cancel</button></div>:<div>{order.Tracking}</div>}
                      </div>
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
