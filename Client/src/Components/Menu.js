import {Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import  Signin from './Signin.js';
import Login from './Login.js';
import Products from './Products.js';
import AddProducts from './AddProduct.js';
import ProductView from './ProductView.js';
import Cart from './Cart.js';
import Profile from './Profile.js';
import Order from './Order.js';
import AdminProducts from './AdminProducts.js';
import CheckOrders from './CheckOrders.js';

class Menu extends Component{

  state={
    emailId:"",
    viewproduct:[]
  };

  getEmail = (e) => {
    this.setState({
      emailId:e
    })
  }

  getViewProduct = (e) => {
    this.setState({
      viewproduct:e
    })
  }


  render(){
    console.log(this.state.emailId)
    return (
      <div>
        <BrowserRouter>
        {this.state.emailId !==  ""?
          this.state.emailId === "Admin@gmail.com"
            ?<ul className="dropdown-menu">
              <li className="dropdown-item"><Link to="/login">Login</Link></li>
              <li className="dropdown-item"><Link to="/adminproducts">Products</Link></li>
              <li className="dropdown-item"><Link to="/checkorders">CheckOrders</Link></li>
              <li className="dropdown-item"><Link to="/addproducts">Add Product</Link></li>
             </ul>
            :<ul className="nav-link dropdown-toggle" data-toggle="dropdown">
              <li className="dropdown-item"><Link to="/signin">Signin</Link></li>
              <li className="dropdown-item"><Link to="/login">Login</Link></li>
              <li className="dropdown-item"><Link to="/">Product</Link></li>
              <li className="dropdown-item"><Link to="/cart">Cart</Link></li>
              <li className="dropdown-item"><Link to="/profile">Profile</Link></li>
              <li className="dropdown-item"><Link to="/orders">Orders</Link></li>
             </ul>
           :<div></div>
      }
            <Route exact path="/signin" render={(props) => <Signin {...props}  getEmail={this.getEmail} />}></Route>
            <Route exact path="/login" render={(props) => <Login {...props}  getEmail={this.getEmail} />}></Route>
            <Route exact path="/"  render={(props) => <Products {...props}  emailId={this.state.emailId} getViewProduct={this.getViewProduct}/>}></Route>
            <Route exact path="/addproducts" render={(props) => <AddProducts {...props}  emailId={this.state.emailId} />}></Route>
            <Route exact path="/view" render={(props) => <ProductView {...props}  emailId={this.state.emailId} viewproduct={this.state.viewproduct}/>}></Route>
            <Route exact path="/cart" render={(props) => <Cart {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/profile" render={(props) => <Profile {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/orders" render={(props) => <Order {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/adminproducts" render={(props) => <AdminProducts {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/checkorders" render={(props) => <CheckOrders {...props}  emailId={this.state.emailId}/>}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default Menu;
