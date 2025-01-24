import CardHolder from "@/components/cardHolder";
import OfferCard from "@/components/offerCard";
import React from "react";

interface Offer {
  name: string;        // Name of the offer
  description: string; // Description of the offer
  url: string;         // URL for the offer
  forUseBy: string;    // Intended audience (e.g., "GHstudents")
}

interface Response {
  [category: string]: Offer[]; // A dynamic object where each key is a category, and the value is an array of offers
}

const getSearchResults = async (query: string): Promise<Response> => {
  const res = await fetch(`https://4az3n7mpz7.execute-api.us-east-1.amazonaws.com/dev/search?query=${query}`);
  const data: Response = await res.json();
  console.log(res);
  return data;
};


const SearchPage = async ({ params }: any) => {

    const results: Response = await getSearchResults(params.query); // Fetch search results
    console.log(results);

    return (
        <CardHolder>
        {Object.keys(results).map((category) => (
            results[category].map((offer: Offer) => (
            <OfferCard key={offer.name} {...offer} />
            ))
        ))}   
        </CardHolder>
    );
};

export default SearchPage;