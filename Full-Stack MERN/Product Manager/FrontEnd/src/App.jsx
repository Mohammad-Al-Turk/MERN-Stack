import './App.css'
import Product from './components/product'
import ById from './components/ById'
import { Route,Routes } from 'react-router-dom'
import Products from './components/Products'
import ProductUpdate from './components/ProductUpdate'

function App() {



  return (
    <>


    
    <Routes>
    <Route path="/" element={
            <div>
                <Product/>
                <Products/>
            </div>
        } />
    <Route  path="/product/:id" element={<ById/>}/>
    <Route path ="/products/:id" element={<ProductUpdate />}/>
    </Routes>
    </>
  )
}

export default App;
