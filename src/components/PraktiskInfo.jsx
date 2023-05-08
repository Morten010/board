import React from 'react'

function PraktiskInfo() {
  return (
    <section id='praktiskInfo'>
      <div className="top">
          <h2>Praktisk info</h2>
          <img src="/icons/wifi-alt.svg" alt="Bus icon"  className='icon'/>
        </div>
        <div className="content">
          <article className="left">
            <h3>WIFI INFORMATION:</h3>
            <p>          
              Brugernavn: ITCN\wireless
              <br />
              Wifinavn: Undervisning
              <br />
              Password: billed24-maske
            </p>
          </article>
          <article className="right">
            <h3>COLOURBOX EDUCATIONAL KEY:</h3>
            <p>44689700803</p>
          </article>
        </div>
    </section>
  )
}

export default PraktiskInfo