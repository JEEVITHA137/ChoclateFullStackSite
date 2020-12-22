import React,{Component} from 'react';

class Products extends Component{

  state = {
        products:[],
        brand:{},
        flavour:{},
        max:"",
        min:"",
        productsWithoutFilters:[],
        isbrandfilter:false,
        iscostfilter:false,
        isflavourfilter:false,
        isnoresults:false
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
        let brand={};
          response.map((res)=>{
            brand[res] = false;
            return null;
          })

          this.setState({
            brand:brand
          })
      })
    .catch(err=>console.log(err))

    fetch( `http://localhost:3000/products/flavour`, headers)
    .then(response=>response.json())  
    .then(response=>{
      let flavour={};
      response.map((res)=>{
        flavour[res] = false;
        return null;
      })

      this.setState({
        flavour:flavour
      })
  })
    .catch(err=>console.log(err))
  }

  filter = () => {
    let {productsWithoutFilters,flavour,isflavourfilter,brand,isbrandfilter,iscostfilter} = this.state;

    let flavourproducts = [];

    let i = 0;

    isflavourfilter=false;
    isbrandfilter = false;
    iscostfilter = false;

    Object.keys(flavour).map(function(key){
      if(flavour[key])
      {
        isflavourfilter = true;
        for(let j=0;j<productsWithoutFilters.length;j++)
        {
          if(productsWithoutFilters[j].flavour === key)
          {
            flavourproducts[i] = productsWithoutFilters[j];
            i=i+1;
          }
        }
      }
      return null;
    })

    if(isflavourfilter)
    {
      productsWithoutFilters = flavourproducts
    }

    let brandproducts = [];
    i=0;
    Object.keys(brand).map(function(key){
      if(brand[key])
      {
        isbrandfilter=true; 
        for(let j=0;j<productsWithoutFilters.length;j++)
        {
          if(productsWithoutFilters[j].brand === key)
          {
            brandproducts[i] = productsWithoutFilters[j];
            i=i+1;
          }
        }
      }
      return null;
    })

    let costproducts = [];
    if(this.state.min !== "" && this.state.max !== "")
    {
      if((isflavourfilter && isbrandfilter) || isbrandfilter)
      {
        productsWithoutFilters = brandproducts;
      }
      else if(isflavourfilter)
      {
        productsWithoutFilters = flavourproducts
      }
  

      i = 0 ;
      iscostfilter = true;
      for(let j=0;j<productsWithoutFilters.length;j++){
          if(productsWithoutFilters[j].cost >= this.state.min && productsWithoutFilters[j].cost <= this.state.max)
          {
              costproducts[i] = productsWithoutFilters[j];
              i = i+1;
          }   
      }
    }
  
    this.setState({
      isbrandfilter:isbrandfilter,
      iscostfilter:iscostfilter,
      isflavourfilter:isflavourfilter
    })

    if((isflavourfilter && isbrandfilter && iscostfilter) || (isbrandfilter && iscostfilter) || (isflavourfilter && iscostfilter) || iscostfilter)
    {
      this.setState({
        products:costproducts
      })
    }
    else if((isbrandfilter && isflavourfilter) || isbrandfilter)
    {
      this.setState({
        products:brandproducts
      })
    }
    else if(isflavourfilter)
    {
      this.setState({
        products:flavourproducts
      })
    }
    else{
      this.setState({
        products:productsWithoutFilters
      })
    }
    
  }

  flavourFilter = (e) => {
    let {flavour} = this.state
    flavour[e.target.value] = e.target.checked;

    this.setState({
      flavour:flavour
    })

    this.filter();
  }

  brandFilter = (e) => {
    let {brand} = this.state;
    brand[e.target.value] = e.target.checked;

    this.setState({
      brand:brand
    })

    this.filter();
  }

  viewProduct = (product) => {
    this.props.getViewProduct(product);
    this.props.history.push("/view")
  }

  render(){
    return (
      <div>
        <div onClick={()=>{this.props.history.push('./cart')}}>Cart</div>
        <h2>Filters</h2>
        <div>
        <h3>Brand</h3>
        {
            Object.keys(this.state.brand).map((brands,i)=>{
            return(
              <div key={i}>
              <input type="checkbox" onChange={this.brandFilter} value={brands}/><label>{brands}</label>
              </div>
            )
          })
        }
        </div>
        <div>
        <h3>Flavour</h3>
        {
          Object.keys(this.state.flavour).map((flavour,i)=>{
            return(
              <div key={i}>
              <input type="checkbox" onChange={this.flavourFilter} value={flavour}/><label>{flavour}</label>
              </div>
            )     
          })
        }
        </div>
        <div>
        <h3>Cost</h3>
        <label>Min</label><input type="number" value={this.state.min} onChange={(e)=>{this.setState({min:e.target.value,iscostfilter:false})}}/>
        <label>Max</label><input type="number" value={this.state.max} onChange={(e)=>{this.setState({max:e.target.value,iscostfilter:false})}}/>
        <button onClick={this.filter}>Go</button>
        </div>
        <h1>Products</h1>
        <div className="d-flex">
        {
          this.state.products.length === 0  ? <div>No results found</div>
              :  this.state.products.map((product,i)=>{
                  return(
                    <div key={i} onClick={()=>{this.viewProduct(product)}}>
                    <img src={`/${product.img}`} style={{width:"180px",height:"180px"}} alt="product-image"></img>
                    <div>{product.name}</div>
                    <div>{product.brand}</div>
                    <div>{product.flavour}</div>
                    <div>{product.cost}</div>
                  </div>
                )})
        }
        </div>
      </div>
    );
  }
}

export default Products;
