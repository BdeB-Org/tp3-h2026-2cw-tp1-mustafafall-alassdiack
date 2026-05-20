const API_BASE = "http://localhost:8080/ords/vbox_virtual_i/";

async function getAll(endpoint) {
    const response = await fetch(API_BASE + endpoint + "/");
    const data = await response.json();
    return data.items;
}

async function getById(endpoint, id) {
    const response = await fetch(API_BASE + endpoint + "/" + id);
    return await response.json();
}

async function create(endpoint, body) {
    const response = await fetch(API_BASE + endpoint + "/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function update(endpoint, id, body) {
    const response = await fetch(API_BASE + endpoint + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    return await response.json();
}

async function remove(endpoint, id) {
    await fetch(API_BASE + endpoint + "/" + id, {
        method: "DELETE"
    });
}
