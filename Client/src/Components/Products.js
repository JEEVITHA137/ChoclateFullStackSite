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

  // filter() {
  //   console.log(this.state.iscostfilter)
  //   let {productsWithoutFilters} = this.state;

  //   if(this.state.iscostfilter)
  //   {
  //     let costproducts = [];
  //     let i = 0 ;
    
  //     for(let j=0;j<productsWithoutFilters.length;j++){
  //       if(productsWithoutFilters[j].cost >= this.state.min && productsWithoutFilters[j].cost <= this.state.max)
  //       {
  //           costproducts[i] = productsWithoutFilters[j];
  //           i = i+1;
  //       }   
  //     }

  //     this.setState({
  //       products:costproducts
  //     })
  //   }

  // }

  flavourFilter = (e) => {
    
    let {productsWithoutFilters,flavour,isflavourfilter} = this.state;

    if(this.state.iscostfilter || this.state.isbrandfilter)
    {
      productsWithoutFilters = this.state.products
    }
    isflavourfilter= false;

    flavour[e.target.value] = e.target.checked;

    let flavourproducts=[];
    let i = 0;

    Object.keys(flavour).map(function(key){
      if(flavour[key])
      {
        for(let j=0;j<productsWithoutFilters.length;j++)
        {
          if(productsWithoutFilters[j].flavour === key)
          {
            isflavourfilter=true; 
            flavourproducts[i] = productsWithoutFilters[j];
            i=i+1;
          }
        }
      }
      return null;
    })

    this.setState({
      flavour:flavour,
      isflavourfilter:isflavourfilter
    })

    console.log(productsWithoutFilters)
    if(isflavourfilter)
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

  costFilter = () => {
    this.setState({
      iscostfilter:true
    })
    // this.filter();

    const {productsWithoutFilters} = this.state;

    let costproducts=[];
    let i = 0 ;
    
    for(let j=0;j<productsWithoutFilters.length;j++){
        if(productsWithoutFilters[j].cost >= this.state.min && productsWithoutFilters[j].cost <= this.state.max)
        {
            costproducts[i] = productsWithoutFilters[j];
            i = i+1;
        }   
    }

    this.setState({
      products:costproducts
    })

  }

  brandFilter = (e) => {

    let {productsWithoutFilters,brand,isbrandfilter} = this.state;

    if(this.state.iscostfilter  || this.state.isflavourfilter)
    {
      productsWithoutFilters = this.state.products
    }
    isbrandfilter= false;

    brand[e.target.value] = e.target.checked;

    let brandproducts=[];
    let i = 0;

    Object.keys(brand).map(function(key){
      if(brand[key])
      {
        for(let j=0;j<productsWithoutFilters.length;j++)
        {
          if(productsWithoutFilters[j].brand === key)
          {
            isbrandfilter=true; 
            brandproducts[i] = productsWithoutFilters[j];
            i=i+1;
          }
        }
      }
      return null;
    })

    this.setState({
      brand:brand,
      isbrandfilter:isbrandfilter
    })

    if(isbrandfilter)
    {
      this.setState({
        products:brandproducts
      })
    }
    else{
      this.setState({
        products:productsWithoutFilters
      })
    }
    
  }

  render(){
    return (
      <div>
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
