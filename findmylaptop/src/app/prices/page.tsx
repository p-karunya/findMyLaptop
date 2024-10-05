async function getPrices() { 
    const response = await fetch('https://api.example.com/prices');
    return await response.json();
}




export default async function Prices() {
  return (
    <div>
      <h1>HELLO</h1>
    </div>
  );
}