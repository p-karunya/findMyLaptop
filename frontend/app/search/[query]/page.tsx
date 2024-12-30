import CardHolder from "@/components/cardHolder"
import OfferCard from "@/components/offerCard"
import React from "react"

const getSearchResults = async (query: string) => {
  const res = await fetch(`https://4az3n7mpz7.execute-api.us-east-1.amazonaws.com/dev/search?query=${query}`)
  const data = await res.json()
  return data
}

const SearchPage = async ({params}: { params: { query: string } }) => {
    const results = await getSearchResults(params.query)
    console.log(results)
    return (
        <CardHolder>
            {Object.values(results).map((values: any) => (
                values.map((offers: any) => (<OfferCard {...offers}/> ))
            ))}
        </CardHolder>
    )
  
}

export default SearchPage