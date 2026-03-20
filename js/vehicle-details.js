console.log("Vehicle details loaded");

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadVehicleDetails() {
  const id = getIdFromUrl();
  const container = document.getElementById("vehicleDetails");

  try {
    const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
    const vehicle = await response.json();

    container.innerHTML = `
      <div class="card">
        <h3>${vehicle.name}</h3>

        <p><strong>Model:</strong> ${vehicle.model}</p>
        <p><strong>Manufacturer:</strong> ${vehicle.manufacturer}</p>
        <p><strong>Cost:</strong> ${vehicle.cost_in_credits}</p>
        <p><strong>Length:</strong> ${vehicle.length}</p>
        <p><strong>Crew:</strong> ${vehicle.crew}</p>
        <p><strong>Passengers:</strong> ${vehicle.passengers}</p>
        <p><strong>Max Speed:</strong> ${vehicle.max_atmosphering_speed}</p>

      </div>
    `;

  } catch (error) {
    container.innerHTML = "Erro ao carregar detalhes.";
    console.error(error);
  }
}

loadVehicleDetails();