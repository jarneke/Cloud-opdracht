var shopCoords = [51.22734472541559, 4.41034727321111];

var AlpinePulseMap = L.map("AlpinePulseMap").setView(shopCoords, 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(AlpinePulseMap);

var shopIcon = L.icon({
  iconUrl: "assets/icons/shopPin.png",
  shadowUrl: "assets/icons/shopPinShadow.png",

  iconSize: [25, 50],
  shadowSize: [50, 30],
  iconAnchor: [12.5, 50],
  shadowAnchor: [0, 30],
});

L.marker(shopCoords, { icon: shopIcon }).addTo(AlpinePulseMap);
