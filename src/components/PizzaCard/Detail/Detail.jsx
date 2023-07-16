import React from 'react'
import IngredientsTable from '../../IngredientsTable/IngredientsTable'

const Detail = ({ pizza }) => {
  return (
    <div className="col-12 mb-5">
      <div className="card shadow rounded">
        <div className="card-body">
          <div className="row g-0">
            <div className="col-md-5">
              <img src={pizza.img} className="mh-100 mw-100" alt={pizza.name} />
            </div>
            <div className="col-md-7">

              <h5 className="card-title pizza-title">{pizza.name}</h5>
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
          >
            Añadir al Carrito
          </button>

        </div>
      </div>
    </div>
  )
}

export default Detail