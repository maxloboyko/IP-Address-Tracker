import L from 'leaflet';

export function addTileLayer(map) {
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: `<div class="attribution">Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.Coded by <a href="https://www.linkedin.com/in/maksym-loboiko-b73a64230/" target="_blank">Maksym Loboiko</a>.</div>`,
      zooControl: false
   }).addTo(map);
}