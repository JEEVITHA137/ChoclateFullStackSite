import React,{Component} from 'react';

class Order extends Component{
  state={
    orders:[]
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
            orders:response[0].myorders
          })
        })
        .catch(err=>console.log(err))
    } 
  }

  cancel = (e) => {
    let orderproduct = [];
    orderproduct = this.state.orders.filter(p => p._id !== e._id)

    this.setState({
      orders:orderproduct
    })

    const values = {
      mailId:this.props.emailId,
      order:orderproduct
    }

    const headers = {
      method:'PUT', 
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };

    fetch( `http://localhost:3000/users/order`, headers)
    .then(response=>response.json())
    .then(response=>response)
    .catch(err=>console.log(err))
  }

  render(){
    return (
      <div>
        <h1>Your Orders</h1>
        <div className="d-flex">
        {
          this.state.orders.length === 0  ? <div>Order is Empty</div>
              :  this.state.orders.map((product,i)=>{
                  return(
                    <div key={i}>
                    <img src={`/${product.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
                    <div>{product.name}</div>
                    <div>{product.brand}</div>
                    <div>{product.flavour}</div>
                    <div>{product.cost}</div>
                    <div>{product.quantity}</div>
                    <button onClick={()=>{this.cancel(product)}}>Cancel</button>
                  </div>
                )})
        }
        </div>
      </div>
    );
  }
}

export default Order;
