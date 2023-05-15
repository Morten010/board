import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function BusAfgang() {
  //fetch bus times
  const { loading, data, error} = useFetch("https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1")
  
  //format time of how long there is to the bus comes
  const formatTime = (trip) => {

    let date = trip.date
    if(date) {
      let time = trip.time
      const year = new Date().getFullYear()
      time += ":00"
      date = date.split(".")
      date = `${year}-${date[1]}-${date[0]}`
      date = new Date(date + "T" + time)

      let now = new Date()

      now = now.getTime()
      date = date.getTime()

      console.log(date , now);
      console.log(trip);
      let diff = date - now;


      let hours = new Date(diff).getHours() - 1
      let min = new Date(diff).getMinutes() + 1
      console.log(hours, min);
      if(!hours == 0){
        const time = `${hours}T ${min}Min`
        return time
      }else{
        const time = `${min} Min`
        return time
      }
    }
    
  }

  return (
    <section id='busAfgang'>
        <div className="top">
          <h2>Busafgange</h2>
          <img src="/icons/bus.svg" alt="Bus icon"  className='icon'/>
        </div>
        <div className="content">
          
          {error && <span className="error">Kunne ik få fat i bustiderne</span>}
            {data && data.MultiDepartureBoard.Departure.slice(0, 6).map(trip => (
              <div className="trip" key={Math.random() * 1000}>
                <div className="left">
                  <strong>{trip.line}</strong> {trip.direction}
                </div>
                <div className="right">
                  {formatTime(trip)}
                  {console.log(formatTime(trip.time), trip.time)}
                </div>
              </div>
            ))} 
        </div>
    </section>
  )
}

export default BusAfgang