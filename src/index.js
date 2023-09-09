import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addOffset, addTileLayer, getAddress, validatIp } from './helpers';
import icon from '../images/icon-location.svg'

// отримуємо те що ввели в поле для вводу та саму кнопку
const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

// отримуємо елементи в які будемо вімальовувати отримані данні від сервера
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handelKey);


const markerIcon = L.icon({
   iconUrl: icon,
   iconSize: [30, 40],
})

// Відображаємо мапу =>
// зберігаємо вибраний блок куди будемо відмальовувати майбутню мапу
const mapArea = document.querySelector('.map');
// відмальовуємо мапу з вказаною міткою за замовченням!!!
const map = L.map(mapArea).setView([51.505, -0.09], 13);
// визиваємо метод передаючи параметр map (весь функціонал в add-tile-layer.js)
addTileLayer(map);
// створюємо маркер/ іконку за замовченням!!!
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

// отримуємо дату з сервера по введеним данним в поле input
function getData() {
   // check data
   if (validatIp(ipInput.value)) {
      getAddress(ipInput.value)
         .then(setInfo)
   }

}

function handelKey(e) {
   if (e.key === 'Enter') {
      getData();
   }
}

function setInfo(mapData) {
   // робимо деструктуризацію та дістаємо широту та довжину із location
   const { lat, lng, country, region, timezone } = mapData.location;

   ipInfo.innerText = mapData.ip;
   locationInfo.innerText = country + ' ' + region;
   timezoneInfo.innerText = timezone;
   ispInfo.innerText = mapData.isp;

   map.setView([lat, lng]);
   L.marker([lat, lng], { icon: markerIcon }).addTo(map);

   //перевірка ширини екрана пристрою, та якщо це не десктоп то додати Offset
   if (matchMedia('(max-width: 1023.98px').matches) {
      addOffset(map);
   }

}

document.addEventListener('DOMContentLoaded', () => {
   getAddress('102.22.22.1').then(setInfo)
});