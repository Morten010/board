import Marquee from 'react-fast-marquee'
import useFetch from '../hooks/useFetch'

export default function News() {
  const {data, error} = useFetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23", 1000 * 3600)

  if(error){
    return (
    <div className="error">
      Something went wrong :(
    </div>
    )
  }
  
  return (
    <Marquee className='news' speed={100}>
      {data && data.items.map(item => (
        <div className="news-item" key={item.title}>
          {item.title}
        </div>
      ))}
    </Marquee>
  )
}
