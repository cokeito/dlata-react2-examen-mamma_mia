import React, { useContext, useEffect } from 'react'
import Context from "../Context";
import PizzaCard from '../components/PizzaCard/PizzaCard'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { pizzas, currentPizza, setCurrentPizza } = useContext(Context)
  const navigate = useNavigate()

  const goToPizza = async (e) => {
    if (currentPizza !== '') {
      navigate(`/pizzas/${currentPizza}`)
    }
  }

  useEffect(() => {
    goToPizza()
  }, [currentPizza])


  return (
    <div className="row">
      <div className="col-12">

        <div className="card p-4">
          <h5>Nuestras Especialidades </h5>
          <div className="row mt-3">

            {pizzas.map(pizza => (
              <PizzaCard key={pizza.id} pizza={pizza} mode='list' />
            ))}

          </div>
        </div>
      </div>
    </div>

  )
}

export default Home