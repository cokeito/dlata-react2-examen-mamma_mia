import React, { useContext, useEffect, useState } from 'react'
import Context from "../Context";
import { useParams } from 'react-router-dom'
import IngredientsTable from '../components/IngredientsTable/IngredientsTable';

const Pizza = () => {

  const { id } = useParams()
  const { formatter, notify, cart, setCart } = useContext(Context)
  const url = '/pizzas.json';

  const [pizzas, setPizzas] = useState([])
  const [pizza, setPizza] = useState("")

  const getPizzas = async () => {
    const res = await fetch(url)
    const data = await res.json()
    setPizzas(data)
  }

  useEffect(() => {
    getPizzas();
  }, [])

  useEffect(() => {
    if (pizzas.length > 0) {
      lookupPizza(pizzas)
    }
  }, [pizzas])


  const lookupPizza = (pizzas) => {
    const search = pizzas.find(pizza => pizza.id === id)
    setPizza(search)
  }

  const handlerCart = (e) => {

    const pizzaId = e.target.getAttribute('data-pizza-id')
    const qty = parseInt(e.target.getAttribute('data-pizza-qty'))
    const pizza = pizzas.find(pizza => pizza.id === pizzaId)

    const item = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      total: pizza.price,
      img: pizza.img,
      amount: 1
    }

    const updateState = (item, qty) => {
      let newState = []

      const isItemPresent = cart.some((item) => item.id === pizzaId);

      if (isItemPresent) {
        newState = cart.map(obj => {

          if (obj.id === pizzaId) {
            const plus_item = {
              ...item,
              amount: (obj.amount + qty),
              total: (obj.price * (obj.amount + qty))
            }

            return plus_item;
          }
          else {
            return obj
          }
        });
      } else {

        newState = [...cart, item]
      }

      if (qty > 0) {
        notify('add', `Se ha agregado una pizza ${pizza.name} a tu carrito`);
      } else {
        notify('remove', `Se ha agregado una pizza ${pizza.name} a tu carrito`);
      }
      setCart(newState);
    }


    updateState(item, qty);
  }

  if (pizza) {

    return (

      <div className="col-12 mb-5">
        <div className="card shadow rounded">
          <div className="card-body">
            <div className="row g-0">
              <div className="col-md-5">
                <img src={pizza.img} className="mh-100 mw-100" alt={pizza.name} />
              </div>
              <div className="col-md-7">

                <h5 className="card-title pizza-title">{pizza.name} <span className="badge badge-pill badge-primary">{formatter.format(pizza.price)}</span> </h5>
                <p className="card-text text-justify"> {pizza.desc}</p>

                <IngredientsTable ingredients={pizza.ingredients} />
              </div>

            </div>
          </div>
          <div className="card-footer text-right">

            <button
              type="button"
              className="btn btn-sm btn-danger mr-3"
              data-pizza-id={pizza.id}
              data-pizza-qty={1}
              onClick={(e) => handlerCart(e)}
            >
              <i className="fa-solid fa-cart-plus"></i> Añadir al Carrito ({formatter.format(pizza.price)})
            </button>

          </div>
        </div>
      </div>
    )
  }
}
export default Pizza