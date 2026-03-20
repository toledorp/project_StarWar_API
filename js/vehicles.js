console.log("Vehicles page loaded");

function showLoadingVehicles() {
  document.getElementById("loadingVehicles").style.display = "block";
}

function hideLoadingVehicles() {
  document.getElementById("loadingVehicles").style.display = "none";
}

async function loadVehicles() {
  const container = document.getElementById("vehiclesList");

  showLoadingVehicles();

  try {
    const response = await fetch("https://swapi.dev/api/vehicles/");
    const data = await response.json();

    container.innerHTML = data.results.map(vehicle => {
      const id = vehicle.url.split("/").filter(Boolean).pop();

      return `
        <div class="content-card">
          <h3>${vehicle.name}</h3>
          <p><strong>Model:</strong> ${vehicle.model}</p>
          <p><strong>Manufacturer:</strong> ${vehicle.manufacturer}</p>

          <a class="btn-primary" href="./vehicle-details.html?id=${id}">
            View Details
          </a>
        </div>
      `;
    }).join("");

  } catch (error) {
    container.innerHTML = "<p>Error loading vehicles.</p>";
    console.error(error);
  } finally {
    hideLoadingVehicles();
  }
}

loadVehicles();