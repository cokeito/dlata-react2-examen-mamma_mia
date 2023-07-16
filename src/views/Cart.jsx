import React, { useContext } from 'react'
import Context from "../Context";

const Cart = () => {
  const { formatter, cart, setCart, pizzas, notify, cartPrice, totalItems } = useContext(Context)

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

      let total_item = null
      let updatedCart = []

      if (isItemPresent) {

        newState = cart.map(obj => {

          if (obj.id === pizzaId) {
            total_item = (obj.price * (obj.amount + qty))

            if (total_item === 0) {
              updatedCart = cart.filter(pizza => pizza.id !== pizzaId)
              return
            }

            const plus_item = {
              ...item,
              amount: (obj.amount + qty),
              total: total_item
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
        notify('remove', `Se ha quitado una pizza ${pizza.name} a tu carrito`);
      }

      if (total_item === 0) {
        setCart(updatedCart)
      } else {

        setCart(newState);
      }

    }

    updateState(item, qty);
  }


  return (
    <div className="card p-5">
      <h5>Mi Carrito <small>({totalItems} items)</small></h5>
      <table className="table table-hover table-condesed table-striped table-condensed mt-3">
        <thead>
          <tr>
            <th> </th>
            <th>Nombre</th>
            <th className="text-center">Cantidad</th>
            <th className="text-right">Precio</th>
            <th className="text-right">Total Unitario</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {
            cart.length > 0
              ? cart.map((item, i) => (
                <tr key={i}>
                  <td className="text-center">
                    <img src={item.img} width={60} alt={item.name} />
                  </td>
                  <td className="text-uppercase">{item.name}</td>
                  <td className="text-center">{item.amount}</td>
                  <td className="text-right">{formatter.format(item.price)}</td>
                  <td className="text-right">{formatter.format(item.total)}</td>
                  <td className="text-right">
                    <button
                      className="btn btn-success btn-sm mr-2"
                      data-pizza-id={item.id}
                      data-pizza-qty={1}
                      onClick={(e) => handlerCart(e)}
                    >
                      <i className="fa fa-plus mr-2"> </i> Agregar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      data-pizza-id={item.id}
                      data-pizza-qty={-1}
                      onClick={(e) => handlerCart(e)}
                    >
                      <i className="fa fa-xmark mr-2"></i>Eliminar
                    </button>
                  </td>
                </tr>
              ))
              : <tr>
                <td colSpan={5} className="text-center">No hay items en el carrito</td>
              </tr>


          }
        </tbody>
        {
          cart.length > 0 &&
          <tfoot>
            <tr>
              <th className="text-right" colSpan={3}>Total Pedido</th>
              <th className="text-right"> {formatter.format(cartPrice)}</th>
            </tr>
          </tfoot>
        }


      </table>
    </div>
  )
}

export default Cart