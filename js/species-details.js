console.log("Species details page loaded");

function getSpeciesIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function getResourceId(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

async function fetchResources(urls) {
    const requests = urls.map((url) => fetch(url).then(res => res.json()));
    const results = await Promise.all(requests);

    return results.map(item => ({
        name: item.name || item.title,
        url: item.url
    }));
}

function createResourceList(items, type) {
    if (!items.length) return "<p>Not available</p>";

    return `
        <div class="resource-grid-list">
            ${items.map(item => {
                const id = getResourceId(item.url);

                if (type === "people") {
                    return `<a class="resource-tag" href="./details.html?id=${id}">${item.name}</a>`;
                }

                if (type === "films") {
                    return `<a class="resource-tag" href="./film-details.html?id=${id}">${item.name}</a>`;
                }

                return `<span class="resource-tag">${item.name}</span>`;
            }).join("")}
        </div>
    `;
}

async function loadSpeciesDetails() {
    const id = getSpeciesIdFromUrl();
    const container = document.getElementById("speciesDetails");

    try {
        const response = await fetch(`https://swapi.dev/api/species/${id}/`);
        const species = await response.json();

        const [people, films] = await Promise.all([
            fetchResources(species.people),
            fetchResources(species.films)
        ]);

        container.innerHTML = `
            <h3>${species.name}</h3>
            <p><strong>Classification:</strong> ${species.classification}</p>
            <p><strong>Designation:</strong> ${species.designation}</p>
            <p><strong>Average Height:</strong> ${species.average_height}</p>
            <p><strong>Skin Colors:</strong> ${species.skin_colors}</p>
            <p><strong>Hair Colors:</strong> ${species.hair_colors}</p>
            <p><strong>Eye Colors:</strong> ${species.eye_colors}</p>
            <p><strong>Language:</strong> ${species.language}</p>

            <div class="details-block">
                <h4>Characters</h4>
                ${createResourceList(people, "people")}
            </div>

            <div class="details-block">
                <h4>Films</h4>
                ${createResourceList(films, "films")}
            </div>
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Error loading species.</p>";
    }
}

loadSpeciesDetails();