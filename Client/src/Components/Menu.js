import React,{Component} from 'react';

class Menu extends Component{



  render(){
    console.log(this.props.emailId)
    return (
      <div>
        {this.props.emailId === "Admin@gmail.com"
            ?<ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/adminproducts">Products</a></li>
              <li><a href="/checkorders">CheckOrders</a></li>
             </ul>
            :<ul>
              <li><a href="/signin">Signin</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/">Product</a></li>
              <li><a href="/addproducts">Add Product</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/orders">Orders</a></li>
             </ul>
           
      }
      </div>
    );
  }
}

export default Menu;
