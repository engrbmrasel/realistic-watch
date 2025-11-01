function updateClock() {
  const now = new Date();

  // 12-hour format with AM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12

  const strHours = hours < 10 ? '0' + hours : hours;
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  const strSeconds = seconds < 10 ? '0' + seconds : seconds;

  document.getElementById('time').innerText = `${strHours}:${strMinutes}:${strSeconds} ${ampm}`;

  // Display date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').innerText = now.toLocaleDateString(undefined, options);
}

// Get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById('location').innerText = "Geolocation not supported.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      const city = data.address.city || data.address.town || data.address.village || '';
      const country = data.address.country || '';
      document.getElementById('location').innerText = `${city}, ${country}`;
    })
    .catch(() => {
      document.getElementById('location').innerText = "Location not found.";
    });
}

function showError() {
  document.getElementById('location').innerText = "Location access denied.";
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();
getLocation();
