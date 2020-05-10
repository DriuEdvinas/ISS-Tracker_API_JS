// Making a map and tiles
const mymap = L.map("issMap").setView([0, 0], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
// Making a marker with a custom icon
var issIcon = L.icon({
  iconUrl: "./img/iss.png",
  iconSize: [70, 52],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude, velocity } = data;

  marker.setLatLng([latitude, longitude]);
  mymap.setView([latitude, longitude]);

  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("vel").textContent = velocity.toFixed(2);
}

setInterval(getISS, 1000);
//getISS();
