import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function BusAfgang() {
  const { loading, data, error} = useFetch("https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1")
  
  const formatTime = (time) => {
    let newTime = time
    let now = new Date().toLocaleString("da-DK", {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    now = now.replaceAll(".", "")
    newTime = newTime.replaceAll(":", "")

    now = Number(now.slice(0, 2)) * 60 + Number(now.slice(2, 4))

    newTime = Number(newTime.slice(0, 2)) * 60 + Number(newTime.slice(2, 4))

    const minDiff = newTime - now
    
    let hours = minDiff / 60
    hours = hours.toFixed(0)
    let min = minDiff % 60
    if(!hours == 0 && !hours === -0){
      const time = `${hours}t ${min}m`
      return time
    }else{
      const time = `${min}min`
      return time
    }
    
  }

  return (
    <section id='busAfgang'>
        <div className="top">
          <h2>Busafgange</h2>
          <img src="/icons/bus.svg" alt="Bus icon"  className='icon'/>
        </div>
        <div className="content">
          {data && data.MultiDepartureBoard.Departure.slice(0, 3).map(trip => (
            <div className="trip" key={Math.random() * 1000}>
              <div className="left">
                <strong>{trip.line}</strong> {trip.direction}
              </div>
              <div className="right">
                {formatTime(trip.time)}
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default BusAfgang