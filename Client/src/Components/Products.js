import React,{Component} from 'react';

class Products extends Component{

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
                    products:response
                })
            })
            .catch(err=>console.log(err))
        }

  render(){
    return (
      <div>
        <header>
          <h1>Products</h1>
        </header>
        {
            this.state.products.map((product,i)=>{
                return(
                    <div key={i}>
                        <div>{product.name}</div>
                        <div>{product.brand}</div>
                        <div>{product.materials}</div>
                        <div>{product.color}</div>
                        <div>{product.cost}</div>
                        <img src={`/${product.img}`} alt="product-image"></img>
                    </div>
                )
            })
        }
      </div>
    );
  }
}

export default Products;
