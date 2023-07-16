import React, { useContext } from 'react'
import './PizzaCard.css'
import IngredientsTable from '../IngredientsTable/IngredientsTable'
import Context from "../../Context";

const PizzaCard = ({ pizza }) => {

  const { setCurrentPizza, pizzas, formatter, notify, setCart, cart } = useContext(Context)

  const handlerShowPizza = (e) => {

    setCurrentPizza(e.target.getAttribute('data-pizza-id'))
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

  return (
    <div className="col-4 mb-5">
      <div className="card card-fx shadow rounded">
        <img src={pizza.img} className="card-img-top img-fluid" alt="..." />
        <div className="card-body">
          <h5 className="card-title pizza-title">{pizza.name} <span className="badge badge-pill badge-info">{formatter.format(pizza.price)}</span> </h5>
          <div>
            <IngredientsTable ingredients={pizza.ingredients} />
          </div>

        </div>
        <div className="card-footer text-center">
          <button
            type="button"
            className="btn btn-sm btn-success mr-3"
            data-pizza-id={pizza.id}
            onClick={(e) => handlerShowPizza(e)}
          >
            <i className="fa-solid fa-eye"></i> Ver Detalle
          </button>

          <button
            type="button"
            className="btn btn-sm btn-danger mr-3"
            data-pizza-id={pizza.id}
            data-pizza-qty={1}
            onClick={(e) => handlerCart(e)}
          >
            <i className="fa-solid fa-cart-plus"></i> Añadir al Carrito
          </button>

        </div>
      </div>
    </div>
  )
}

export default PizzaCard