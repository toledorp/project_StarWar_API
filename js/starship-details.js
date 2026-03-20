console.log("Starship details page loaded");

function getStarshipIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function getResourceId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function fetchResources(urls) {
    const requests = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(requests);

    return results.map(item => ({
        name: item.name || item.title,
        url: item.url
    }));
}

function createResourceList(items) {
    if (!items.length) return "<p>Not available</p>";

    return `
        <div class="resource-grid-list">
            ${items.map(item => {
                const id = getResourceId(item.url);
                return `<a class="resource-tag" href="./details.html?id=${id}">${item.name}</a>`;
            }).join("")}
        </div>
    `;
}

async function loadStarshipDetails() {
    const id = getStarshipIdFromUrl();
    const container = document.getElementById("starshipDetails");

    try {
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
        const ship = await response.json();

        const pilots = await fetchResources(ship.pilots);

        container.innerHTML = `
            <h3>${ship.name}</h3>
            <p><strong>Model:</strong> ${ship.model}</p>
            <p><strong>Manufacturer:</strong> ${ship.manufacturer}</p>
            <p><strong>Cost:</strong> ${ship.cost_in_credits}</p>
            <p><strong>Crew:</strong> ${ship.crew}</p>
            <p><strong>Passengers:</strong> ${ship.passengers}</p>

            <div class="details-block">
                <h4>Pilots</h4>
                ${createResourceList(pilots)}
            </div>
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Error loading starship.</p>";
    }
}

loadStarshipDetails();