import React,{Component} from 'react';
import { hostname } from './hostname';

class CheckOrders extends Component{

  state = {
    orders:[],
    Track:""
  };

  componentDidMount(){
    const headers = {
        method:'GET'
    };
              
    fetch( `${hostname}order/`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          orders:response
        })
      })
      .catch(err=>console.log(err))
  }

  trackingChange = (e,id,key) => {
    
    let {orders} = this.state;
    orders[key].Tracking = e;

    this.setState({
      orders:orders
    })

    const values = {
      id:id,
      Tracking:e
    }

    console.log(values)

    const headers = {
      method:'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };

    fetch( `${hostname}order`, headers)
    .then(response=>response.json())
    .then(response=>response)
    .catch(err=>console.log(err))
  }

  render(){
    return (
      <div className="container">
      <h4  className="mt-3" style={{color:"#0b498f"}}>CheckOrders</h4>
      <table class="table">
      <thead   style={{color:"#26d0ce"}}>
        <tr>
          <th scope="col">SI.No</th>
          <th scope="col">User-ID</th>
          <th scope="col">ProductId</th>
          <th scope="col">Quantity</th>
          <th scope="col">Status</th>
          <th scope="col">Address</th>
        </tr>
      </thead>
      <tbody style={{color:"#0b498f"}}>
        {this.state.orders.map((orders,key)=>{
          return(
            <tr key = {key}>
            <th scope="row">{key}</th>
            <td>{orders.UserId}</td>
            <td>{orders.ProductId}</td>
            <td>{orders.quantity}</td>
            {orders.Tracking === "delivered" ? <td>{orders.Tracking}</td> : <td><select style={{color:"#0b498f"}} value={orders.Tracking} onChange={(e)=>{this.trackingChange(e.target.value,orders._id,key)}}><option>packaged</option><option>ordered</option><option>delivered</option></select></td>}
            <td>{orders.Address.HouseNo} {orders.Address.Street},{orders.Address.LandMark},{orders.Address.Town},{orders.Address.District},{orders.Address.Pincode}</td>
            </tr>
          );
        })
      }
      </tbody>
      </table>
    </div>
    );
  }
}

export default CheckOrders;
