import Image from "next/image";
import { json } from "stream/consumers";
import OfferCard from "../components/offerCard";
import CardHolder from "../components/cardHolder";
import { Input } from "@/components/input"
import { Icon } from "lucide-react";


export default function Home() {
  const test = {"name": "Boba Drops","description": "Give your club an unfair advantage with free boba","url": "https://hack.club/boba","forUseBy": "hackclubbers","category": "perks"};
 
  return (
    <>
    <div className="flex justify-center h-64 items-center overflow-hidden scroll-m-0"> 
      <Input className="-translate-y-24" type="text" placeholder="Search for offers"/>  
    </div>
    </>
  );
}
