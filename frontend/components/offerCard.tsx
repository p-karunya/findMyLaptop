import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link';

  
interface offer {
    name: string;
    description: string;
    url: string;
    forUseBy: string;
}


const OfferCard = (props: offer) => {
  console.log(props);
  let Source: string = "Unknown Source";
  if (props.url.startsWith("https://h")) {
      Source = "Hack Club Tool Box";
  }
  else if (props.forUseBy.startsWith("GH")) {
      Source = "GitHub";
  }

    return (
        <Card className="inline-block m-1 border-2"> 
            <CardHeader>
                <CardTitle className='text-xl text-pretty'>{props.name}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
        <CardFooter className='flex justify-between'>
            <p className='text-xs'> Source: {Source}</p>
            <Link href={props.url} passHref>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                Claim
              </button>
            </Link>
        </CardFooter>
      </Card>   
    );
};

export default OfferCard;

