console.log("Vehicles page loaded");

async function loadVehicles() {
  const container = document.getElementById("vehiclesList");

  try {
    container.innerHTML = "Loading...";

    const response = await fetch("https://swapi.dev/api/vehicles/");
    const data = await response.json();

    container.innerHTML = data.results.map(vehicle => {
      const id = vehicle.url.split("/").filter(Boolean).pop();

      return `
        <div class="card">
          <h3>${vehicle.name}</h3>
          <p><strong>Model:</strong> ${vehicle.model}</p>
          <p><strong>Manufacturer:</strong> ${vehicle.manufacturer}</p>

          <a href="./vehicle-details.html?id=${id}">
            View Details
          </a>
        </div>
      `;
    }).join("");

  } catch (error) {
    container.innerHTML = "Erro ao carregar veículos.";
    console.error(error);
  }
}

loadVehicles();