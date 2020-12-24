import React,{Component} from 'react';

class Menu extends Component{



  render(){
    return (
      <div>
        <ul>
          <li><a href="/signin">Signin</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/">Product</a></li>
          <li><a href="/addproducts">Add Product</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/orders">Orders</a></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
