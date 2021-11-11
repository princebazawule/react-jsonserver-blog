import { useState, useEffect } from "react"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fires on every render... be careful when using to update state
    // good for fetching data
    // or communicate with authentication service

    const abortCont = new AbortController()

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch data for that resource")
          }
          return res.json()
        })
        .then((data) => {
          setData(data)
          setIsPending(false)
          setError(null)
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted")
          } else {
            setIsPending(false)
            setError(err.message)
          }
        })
    }, 1000)

    return () => abortCont.abort()
  }, [url])

  return {
    data,
    isPending,
    error,
  }
}

export default useFetch
