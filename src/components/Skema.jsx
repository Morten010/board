import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import formatColor from '../utils/formatColor'
function Skema() {
  const [date, setDate] = useState(new Date())
  const url = "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed"
  const {data} = useFetch(url)
  const { data: dataWeather} = useFetch("https://api.open-meteo.com/v1/forecast?latitude=57.04&longitude=9.92&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m", 1000 * 3600)

  //initiate sorted
  let sorted = null

  //if data exist sort it by if class already have happend
  if(data){
    sorted = data.value.filter(item => {
      const time = new Date()
      const compare = new Date(item.StartDate)
      
      if(time <= compare){
        return item
      } 
    })

    
    //add new date for showing new day is coming
    let newDay = new Date()
    newDay.setDate(date.getDate() + 1)
    newDay.setHours(0, 0, 0)
    sorted.push({StartDate: newDay, dayShift: true})

    sorted = sorted.sort(( a, b ) => {
      if(new Date(a.StartDate) < new Date(b.StartDate)){
        return -1;
      } else if(a.StartDate > b.StartDate){
        return 1
      } else{
        return 0
      }
    })
    const array_valid_educations = [
      "AMU indmeld",
      "Brobyg teknisk",
      "Data/komm.udd.",
      "Grafisk Tekniker",
      "Grafisk teknik.",
      "Mediegrafiker",
      "Webudvikler"    
    ]
    sorted = sorted.filter(item => {
      if(array_valid_educations.includes(item.Education)){
        return item
      } else if(item.dayShift){
        return item
      }
    })
    if(sorted === 1) {
      sorted = []
    }
  }


  //format time
  const formatTime = (time) => {
    let now = new Date(time).toLocaleString("da-DK", {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
    now = now.replaceAll(".", ":")

      return now
  }

  //timer for time of day
  useEffect(() => {
    let timer;
    timer = setInterval(() => {
        const sec = new Date().getSeconds()
        if(sec) return;

        setDate(new Date())
    }, 1000);
    return () => clearInterval(timer)
  }, []);

  return (
    <section id='skema'>
      <div className="top">
        <h2>Skema</h2>
        <div>
        <div className="time">
          {date.toLocaleString("da-DK", {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
          }).replaceAll(".", ":")}
        </div> 

          {date.getUTCDate()}. {new Date().toLocaleDateString('da-dk', {
            month: "long"
          })} {new Date().getUTCFullYear()}

          <div className="weather">
            {dataWeather && dataWeather.current_weather.temperature}&deg;
          </div>

        </div>
      </div>
      
      
      <div className="content">
        <div className="header">
          <span>klasse | udannelse</span>
          <p>time</p>
          <p>Starter</p>
        </div>
        {sorted && sorted.slice(0,9).map(item => item.dayShift ? <div className="class" key="imorgen"><h3>Imorgen</h3></div> : (
          <div className='class' key={Math.random() * 3000}>
            <div className="buttons">
              <span className='classroom'>
                {item.Room && item.Room}
                {!item.Room && "..."}
              </span>
              <span className='team' style={{
                backgroundColor: formatColor(item.Team)
              }}>
                {item.Education}
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
        {sorted && !sorted.length && (
          <div className="class">
            <h3>Ik flere timer for nu :)</h3>
          </div>
        )}
      </div>
    </section>
  )
}

export default Skema