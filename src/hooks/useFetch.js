
import React, { useEffect, useState } from 'react'


const  useFetch = (url) => {
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

       const fetchData = async () => {
        setLoading(true)

        try{
            const res =  await fetch(url)
            if(!res.ok){
                throw new Error(res.statusText)
            }
            const json = await res.json()
    
            setLoading(false)
            setData(json)
            setError(null)
        } catch(err) {
            setLoading(false)
            setError("Could not fetch the data")
            console.log(err.message);
        }
       }

    let timer;

    // Interval is set to every sec
    timer = setInterval(() => {
        
        //reseting/setting time to track seconds
        const sec = new Date().getSeconds();

        //if sec dosen't equal 0 return it
        if(sec) {
            return
        }

        //when sec is 0 fetch
        fetchData()

        return () => clearInterval(timer)
    }, 1000);

        //fetch data for first time
       fetchData()
    }, [url])

    return { loading, data, error}
}

export default useFetch
