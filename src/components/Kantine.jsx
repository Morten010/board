import React from 'react'
import useFetch from '../hooks/useFetch'

function Kantine() {
  const {loading, data, error} = useFetch("https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json")
  
  return (
    <section id='kantine'>
        <div className="top">
          <h2>Kantinen</h2>
          <img src="/icons/food.svg" alt="food icon"  className='icon'/>
        </div>
        <div className="content">
            <h3>
              Dagens Ret
            </h3>
            
            <p>
              {data && data.Days[0].Dish}
            </p>
          </div>
    </section>
  )
}

export default Kantine