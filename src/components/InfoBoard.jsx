
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'

export default function InfoBoard() {
    const [date, setDate] = useState(new Date())
    const { loading, data, error} = useFetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23")
    const { loading: LoadingWeather, data: dataWeather, error: weatherError} = useFetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m")

    useEffect(() => {
        setInterval(() => setDate(new Date()), 10000);
      }, []);
    
  return (
    <section id='infoBoard'>
        <div className="top">
            <h1><img src="/logo.svg" alt="TechCollege logo" /></h1>
            <div className="left">
                <div className="time">
                    {date.toLocaleString("da-DK", {
                         hour: 'numeric',
                         minute: 'numeric',
                         hour12: false,
                    })}
                </div> 
                <div className="weather">
                    {dataWeather && dataWeather.current_weather.temperature}&deg;
                </div>
            </div>
        </div>

        <div className="content">
            {data && data.items.slice(0, 2).map(article => (
                <article key={article.guid}>
                    <h3>{article.title}</h3>
                    <address>{article.author} - {article.pubDate}</address>
                    <p>
                        {article.length == 0 && article.desc}
                    </p>
                </article>
            ))}
        </div>

    </section>
  )
}
