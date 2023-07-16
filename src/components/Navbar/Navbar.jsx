import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Context from "../../Context";


const Navbar = () => {
  const { setCurrentPizza, cartPrice, formatter } = useContext(Context)



  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand"
          onClick={() => setCurrentPizza('')}
        >
          Mamma Mia
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2">

            <li className="nav-item active">
              <NavLink
                to="/"
                className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active current-link nav-link" : "nav-link"}
                onClick={() => setCurrentPizza('')}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active current-link nav-link" : "nav-link"}>
                Mi Carrito ({formatter.format(cartPrice)})
              </NavLink>


            </li>

          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Navbar