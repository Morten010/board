
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

       fetchData()
    }, [url])

    return { loading, data, error}
}

export default useFetch
