import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Slider from './components/Slider/Slider'

import Cart from './views/Cart'
import Pizza from './views/Pizza'
import Home from './views/Home'

import Context from "./Context";
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


function App() {

  const url = '/pizzas.json';
  const [pizzas, setPizzas] = useState([])
  const [currentPizza, setCurrentPizza] = useState('')
  const [totalItems, setTotalItems] = useState(0)


  const [cart, setCart] = useState([])

  const [cartPrice, setCartPrice] = useState(0)

  const getPizzas = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setPizzas(data)
  }

  const sumCartTotal = () => {
    let total = 0
    cart.forEach(item => {
      total += item.total
    })
    setCartPrice(total)
  }

  const sumTotalItems = () => {
    let total = 0
    cart.forEach(item => {
      total += item.amount
    })
    setTotalItems(total)
  }

  useEffect(() => {
    getPizzas();
  }, [])

  useEffect(() => {
    sumCartTotal();
    sumTotalItems();
  }, [cart])

  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',

  });

  const notify = (type, msg) => {
    const options = {
      duration: 4000,
      position: 'top-center',

      // Styling
      style: { minWidth: '600px' },

    }

    switch (type) {
      case 'add':
        toast.success(msg, options);
        break;
      case 'remove':
        toast.error(msg, options);
        break;
      default:
        break;
    }

  }

  return (
    <>
      <Context.Provider value={{ pizzas, currentPizza, setCurrentPizza, cartPrice, formatter, notify, cart, setCart, totalItems }}>
        <BrowserRouter >
          <Navbar></Navbar>
          <Slider></Slider>
          <div className="container py-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/pizzas/:id" element={<Pizza />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter >
      </Context.Provider>
    </>

  )
}

export default App
