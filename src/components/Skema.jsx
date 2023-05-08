import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'

function Skema() {
  const [date, setDate] = useState(new Date())
  const url = "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed"
  const {loading, data, error} = useFetch(url)

  let sorted = null
  if(data){
    sorted = data.value.sort(( a, b ) => {
      if(a.StartDate < b.StartDate){
        return -1;
      } else if(a.StartDate > b.StartDate){
        return 1
      } else{
        return 0
      }
    })
  }
  console.log(sorted);

  const formatTime = (time) => {
    let now = new Date(time).toLocaleString("da-DK", {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    now = now.replaceAll(".", ":")

      return now
  }

  useEffect(() => {
    let timer;

    timer = setInterval(() => {
        
        const sec = new Date().getSeconds()

        if(sec) return;

        setDate(new Date())

    }, 1000);

    return clearInterval(timer)
  }, []);

  const colorPicker = (color) => {
    switch(color){
      case "ggr010123":
        return "#3D96CE"
      case "h3gr040123":
        return "#CE433D"
      case "gmg010123":
        return "#2F812B"
      case "h3mg040123":
        return "#CE8B3D"
      case "gwe010123":
        return "#3D96CE"
      case "h1we080122":
        return "#CE433D"
      case "h0mg010123f":
        return "#2F812B"
      case "htxb21":
        return "#CE8B3D"
      default:
        return "#46CE3D"
    }
  }
  
  return (
    <section id='skema'>
      <div className="top">
        <h2>Skema</h2>
        <div>
          {date.getUTCDate()}. {new Date().toLocaleDateString('da-dk', {
            month: "long"
          })} {new Date().getUTCFullYear()}
        </div>
      </div>
      
      <div className="content">
        {sorted && sorted.slice(0,8).map(item => (
          <div className='class' key={Math.random() * 3000}>
            <div className="buttons">
              <span className='classroom'>
                {item.Room && item.Room}
                {!item.Room && "..."}
              </span>
              <span className='team' style={{
                backgroundColor: colorPicker(item.Team)
              }}>
                {item.Team.slice(0, 3)}
              </span>
            </div>
            <h3>
              {item.Subject}
            </h3>
            <div className="tid">
              <p>{formatTime(item.StartDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skema