import React,{Component} from 'react';

class Order extends Component{
  state={
    orders:[],
    products:[]
  }


  componentDidMount(){
    if(this.props.emailId !== "")
    {
      const values = {
        mailId:this.props.emailId
      } 

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

  cancel = (e) => {

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
    .then(response=>response.json())
    .then(response=>response)
    .catch(err=>console.log(err))

  }

  render(){
    return (
      <div>
        <div onClick={()=>{this.props.history.push('./cart')}}>Cart</div>
        <h1>Your Orders</h1>
        <div className="d-flex">
        {
          this.state.orders.length === 0  ? <div>Order is Empty</div>
              :  this.state.orders.map((order,i)=>{
                let product= this.state.products.filter(p => p._id === order.ProductId)
                  return(
                    product.length !== 0 ? 
                      <div key={i}>
                        <img src={`/${product[0].img}`} alt="product-image" style={{width:"180px",height:"180px"}} ></img>
                        <div>{product[0].name}</div>
                        <div>{product[0].flavour}</div>
                        <div>Quantity : {order.quantity}</div>
                        {order.Tracking !== "delivered" ? <button onClick={()=>{this.cancel(order.ProductId)}}>Cancel</button>:<div></div>}
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
