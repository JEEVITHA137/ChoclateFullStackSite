import {Component} from 'react';
import {Route,withRouter ,Link} from 'react-router-dom';
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
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,} from 'reactstrap';
import { hostname } from './hostname';

class Menu extends Component{

  state={
    emailId:"",
    user:"",
    viewproduct:[],
    isNavOpen: false,
    cart:[]
  };

  getEmail = (email,name) => {
    this.setState({
      emailId:email,
      user:name
    })
  }

  getViewProduct = (e) => {
    this.setState({
      viewproduct:e
    })
  }

  getCart = (e) => {
    this.setState({
      cart:[...this.state.cart,e]
    })
  }

  addToCart = (e) => {
    if(this.state.cart.length !== 0)
    {
      if(e === true)
      {
        const headers = {
          method:'GET'
        };
                    
        fetch( `${hostname}users/${this.state.emailId}`, headers)
        .then(response=>response.json())
        .then(response=>{
          const values = {
            mailId:this.state.emailId,
            cart:response[0].myCart.concat(this.state.cart)
          }
  
          const headersPut = {
            method:'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          };
  
          fetch( `${hostname}users/addtocart`, headersPut)
          .then(response=>response.json())
          .then(response=>response)
          .catch(err=>console.log(err))
  
          console.log(values)
        })
        .catch(err=>console.log(err))
      }
      else
      {
        console.log(this.state.cart)
        const values = {
          mailId:this.state.emailId,
          cart:this.state.cart
        }

        const headersPut = {
          method:'PUT', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        };

        fetch( `${hostname}users/addtocart`, headersPut)
        .then(response=>response.json())
        .then(response=>response)
        .catch(err=>console.log(err))
      }
      
    }
    
  }

  toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

  render(){
    console.log(this.state.emailId)
    return (
      <div>   
        <Navbar dark expand="md">
            <div className="container">
            <NavbarBrand className="mr-auto" onClick={() =>  this.props.history.push("/")} ><img src="./logo.png" className="logo" alt="Logo"></img></NavbarBrand>
            <NavbarToggler onClick={() => this.toggleNav()} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
            
        {this.state.emailId !==  "" ?
          this.state.emailId === "Admin@gmail.com"
            ?<Nav navbar className="ml-auto">
              <NavItem className="m-1"> < Link className="nav-link" to="/adminproducts"> <span className={`fa fa-login fa-md`}></span>  Products</ Link></NavItem>
              <NavItem className="m-1"> < Link className="nav-link" to="/checkorders"> <span className={`fa fa-login fa-md`}></span>  Check Orders</ Link></NavItem>
              <NavItem className="m-1"> < Link className="nav-link" to="/addproducts"> <span className={`fa fa-login fa-md`}></span> Add Product</ Link></NavItem>
              <NavItem className="m-1"> <a className="nav-link" href="./"> <span className={`fa fa-login fa-md`}></span>  Logout</ a></NavItem>
             </Nav>
            :<Nav navbar className="ml-auto">
              <NavItem className="m-1"> <Link className="nav-link" to="/"> <span className={`fa fa-login fa-md`}></span> Products</ Link></NavItem>
              <NavItem className="m-1"> <Link className="nav-link" to="/cart"> <span className={`fa fa-login fa-md`}></span>  Cart</ Link></NavItem>
              <NavItem className="m-1"> <Link className="nav-link" to="/profile"> <span className={`fa fa-login fa-md`}></span>  Profile</ Link></NavItem>
              <NavItem className="m-1"> <Link className="nav-link" to="/orders"> <span className={`fa fa-login fa-md`}></span>  Orders</ Link></NavItem>
              <NavItem className="m-1"> <a className="nav-link" href="./"> <span className={`fa fa-login fa-md`}></span>  Logout</ a></NavItem>
              </Nav>
           :
           <Nav navbar className="ml-auto">
            <NavItem className="m-1"> <Link className="nav-link" to="/cart"> <span className={`fa fa-login fa-md`}></span>  Cart</ Link></NavItem>
            <NavItem className="m-1"> < Link className="nav-link" to="/login"> <span className={`fa fa-login fa-md`}></span>  Login</ Link></NavItem>
            <NavItem className="m-1"> < Link className="nav-link" to="/signin"> <span className={`fa fa-login fa-md`}></span>  Signin</ Link></NavItem>
           </Nav>
      } 
      </Collapse>
      </div>
      </Navbar>
      
            <Route exact path="/signin" render={(props) => <Signin {...props}  getEmail={this.getEmail} addToCart={this.addToCart}/>}></Route>
            <Route exact path="/login" render={(props) => <Login {...props}  getEmail={this.getEmail} addToCart={this.addToCart} />}></Route>
  
            <Route exact path="/"  render={(props) => <Products {...props}  emailId={this.state.emailId} getViewProduct={this.getViewProduct}/>}></Route>
            <Route exact path="/addproducts" render={(props) => <AddProducts {...props}  emailId={this.state.emailId} />}></Route>
            <Route exact path="/view" render={(props) => <ProductView {...props}  emailId={this.state.emailId} cart={this.state.cart} user={this.state.user} getCart={this.getCart} viewproduct={this.state.viewproduct}/>}></Route>
            <Route exact path="/cart" render={(props) => <Cart {...props}  emailId={this.state.emailId} cart={this.state.cart}/>}></Route>
            <Route exact path="/profile" render={(props) => <Profile {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/orders" render={(props) => <Order {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/adminproducts" render={(props) => <AdminProducts {...props}  emailId={this.state.emailId}/>}></Route>
            <Route exact path="/checkorders" render={(props) => <CheckOrders {...props}  emailId={this.state.emailId}/>}></Route>
      
            <div className="footer mt-auto">
            <div className="container">       
              
                <div className="row justify-content-center">             
                    <div className="col-auto m-0 mt-2">
                        <p>Designed by <a  target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jeevithavenkatesan137"  style={{color:"#0b498f"}}>Jeevitha Venkatesan</a></p>
                    </div>
                </div>
            </div>
        </div>     
      </div>

    );
  }
}

export default  withRouter(Menu);
