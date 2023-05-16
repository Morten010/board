import useFetch from "../hooks/useFetch";

function BusAfgang() {
  //fetch bus times
  const { data, error} = useFetch("https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1")
  
  //format time of how long there is to the bus comes
  const formatTime = (trip) => {
    //time of bus
    let date = trip.date
    //if time of bus exist
    if(date) {
      // time is time of bus
      let time = trip.time
      //get year of today
      const year = new Date().getFullYear()
      //split date up in an array
      date = date.split(".")
      // put date in right order and put - between
      date = `${year}-${date[1]}-${date[0]}`
      //make it to a date
      date = new Date(date + "T" + time)
      //now date to compare time's
      let now = new Date()

      //get time stamp of now and when bus comes
      now = now.getTime()
      date = date.getTime()

      //find diffrence between timeStamps
      let diff = date - now;

      //make time stamp into usable hours and minuts to shows
      let hours = new Date(diff).getHours() - 1
      let min = new Date(diff).getMinutes() + 1

      //if there is no hours show this template if there is hours show anothers
      if(hours === 0){
        const time = `${min} Min`
        return time
      }else{
        const time = `${hours}T ${min}Min`
        return time
      }
    }
    
  }
  if(error){
    return (
      <section id="busAfgang">
        <div className="top">
        <h2>Busafgange</h2>
          <img src="/icons/bus.svg" alt="Bus icon"  className='icon'/>  
        </div>
        <div className="content">
          <img src="/icons/stop-sign.png" alt="stop sign" style={{
            
          }}/>
          <p style={{
            fontSize: "8rem",
            textAlign: "center",
            fontWeight: "500"

          }}>
            Kunne ikke få fat i busterminalen
          </p>
        </div>
      </section>
    )
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
                </div>
              </div>
            ))} 
        </div>
    </section>
  )
}

export default BusAfgang