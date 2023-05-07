
import React, { useEffect, useState } from 'react'

export default function InfoBoard() {
    const [data, setData] = useState(null)
    const [weather, setWeather ] = useState(null)




console.log("hey");    

    

  return (
    <section id='infoBoard'>
        <div className="top">
            <h1><img src="/logo.svg" alt="TechCollege logo" /></h1>
            <div className="left">
                <div className="time">
                    22:07
                </div> 
                <div className="weather">
                    7&deg;
                </div>
            </div>
        </div>

        <div className="content">
            {data && data.map(article => (
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
