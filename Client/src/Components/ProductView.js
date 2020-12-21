import React,{Component} from 'react';

class ProductView extends Component{
  state={
    cart:[]
  }

  AddCart = (e) => {
    this.setState({
      cart:e
    })
  }

  render(){
    console.log(this.state.cart)
    return (
      <div>
        <h1>Product View</h1>
        <img src={`/${this.props.viewproduct.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
        <div>{this.props.viewproduct.name}</div>
        <div>{this.props.viewproduct.brand}</div>
        <div>{this.props.viewproduct.flavour}</div>
        <div>{this.props.viewproduct.cost}</div>
        <button onClick={()=>{this.AddCart(this.props.viewproduct)}}>AddtoCart</button>
        
      </div>
    );
  }
}

export default ProductView;
