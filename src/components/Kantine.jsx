import React from 'react'
import useFetch from '../hooks/useFetch'

function Kantine() {
  //fetch canteen data
  const {data, error} = useFetch("https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json", 1000 * 86400)
  
  
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
              {error && <p>Mystery meal</p>}
              {data && data.Days[new Date().getDay() - 1].Dish}
            </p>
          </div>
    </section>
  )
}

export default Kantine