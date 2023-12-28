// Variables
// - Save coords to a variable.
var shopCoords = [51.22734472541559, 4.41034727321111];
// - Save the map to a variable.
var AlpinePulseMap = L.map("AlpinePulseMap").setView(shopCoords, 15);

// - Add Image layer to map.
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(AlpinePulseMap);

// - Make the custom Icon
var shopIcon = L.icon({
  iconUrl: "assets/icons/shopPin.png",
  shadowUrl: "assets/icons/shopPinShadow.png",

  iconSize: [25, 50],
  shadowSize: [50, 30],
  iconAnchor: [12.5, 50],
  shadowAnchor: [0, 30],
});
// - Add marker to map with custom icon.
L.marker(shopCoords, { icon: shopIcon }).addTo(AlpinePulseMap);
