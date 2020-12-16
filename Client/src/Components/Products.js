import React,{Component} from 'react';

class Products extends Component{

  state = {
        products:[],
        brand:[],
        flavour:[],
        max:"",
        min:"",
        productsWithoutFilters:[]
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

    fetch( `http://localhost:3000/products/brands`, headers)
    .then(response=>response.json())  
    .then(response=>{
        this.setState({
          brand:response
        })
      })
    .catch(err=>console.log(err))

    fetch( `http://localhost:3000/products/flavour`, headers)
    .then(response=>response.json())  
    .then(response=>{
        this.setState({
          flavour:response
        })
      })
    .catch(err=>console.log(err))
    
  }

  costFilter = () => {

    const {productsWithoutFilters} = this.state;
    this.setState({
      products: productsWithoutFilters
    })

    console.log(productsWithoutFilters,this.state.products)
    console.log(this.state.min,this.state.max)

    let costproducts=[];
    let i = 0 ;
    this.state.products.map((products)=>{
        if(products.cost >= this.state.min && products.cost <= this.state.max)
        {
            costproducts[i] = products;
            i = i+1;
        }
    })

    this.setState({
      products:costproducts
    })

  }

  render(){
    return (
      <div>
        <h2>Filters</h2>
        <div>
        <h3>Brand</h3>
        {
          this.state.brand.map((brands,i)=>{
            return(
              <div key={i}>
              <input key={i} type="checkbox"/><label>{brands}</label>
              </div>
            )
          })
        }
        </div>
        <div>
        <h3>Flavour</h3>
        {
          this.state.flavour.map((flavour,i)=>{
            return(
              <div key={i}>
              <input key={i} type="checkbox"/><label>{flavour}</label>
              </div>
            )
          })
        }
        </div>
        <div>
        <h3>Cost</h3>
        <label>Max</label><input type="number" value={this.state.max} onChange={(e)=>{this.setState({max:e.target.value})}}/>
        <label>Min</label><input type="number" value={this.state.min} onChange={(e)=>{this.setState({min:e.target.value})}}/>
        <button onClick={this.costFilter}>Go</button>
        </div>
        <h1>Products</h1>
        {
          this.state.products.map((product,i)=>{
          return(
            <div key={i}>
              <div>{product.name}</div>
                <div>{product.brand}</div>
                <div>{product.flavour}</div>
                <div>{product.cost}</div>
                <img src={`/${product.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
              </div>
          )})
        }
      </div>
    );
  }
}

export default Products;
