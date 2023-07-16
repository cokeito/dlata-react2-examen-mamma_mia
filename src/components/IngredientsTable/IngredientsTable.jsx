import React from 'react'
import './IngredientsTable.css'

const IngredientsTable = (ingredients) => {
  return (
    <>
      <p> Ingredientes: </p>
      <ul className="ingredient-list">
        {ingredients.ingredients.map((ingredient, i) => (
          <li key={i} className='ingredients-title'>
            <i className="fa-solid fa-pizza-slice"></i> {ingredient}
          </li>
        ))}
      </ul>
    </>
  )
}

export default IngredientsTable