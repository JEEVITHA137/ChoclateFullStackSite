import React,{Component} from 'react';

class AdminProducts extends Component{

  state = {
        products:[]
  };

  componentDidMount(){
    const headers = {
        method:'GET', 
        credentials: 'include'
    };
              
    fetch( `http://localhost:3000/products`, headers)
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          products:response,
          productsWithoutFilters:response
        })
      })
      .catch(err=>console.log(err))
  }

  render(){
    return (
      <div>
        <h1>Products</h1>
        <div className="d-flex">
        {
          this.state.products.length === 0  ? <div>No Products</div>
              :  this.state.products.map((product,i)=>{
                  return(
                    <div key={i}>
                    <img src={`/${product.img}`} style={{width:"180px",height:"180px"}} alt="product-img"></img>
                    <div>{product.name}</div>
                    <div>{product.brand}</div>
                    <div>{product.flavour}</div>
                    <div>{product.quantity}</div>
                    <div>{product.cost}</div>
                  </div>
                )})
        }
        </div>
      </div>
    );
  }
}

export default AdminProducts;
