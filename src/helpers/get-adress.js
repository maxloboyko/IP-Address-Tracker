export async function getAddress(ip = '8.8.8.8') {
   const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_bEADCCibQhk1IglWy8ktjCzpyRHEt&ipAddress=${ip}
      `);
   // .then(response => response.json());
   return await response.json();
}