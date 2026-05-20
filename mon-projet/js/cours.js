document.addEventListener("DOMContentLoaded", async () => {

    const table = document.querySelector("#table-cours");
    const form = document.querySelector("#form-cours");

    const cours = await getAll("cours");

    cours.forEach(c => {
        table.innerHTML += `
            <tr>
                <td>${c.id_cours}</td>
                <td>${c.titre}</td>
                <td>${c.description}</td>
                <td>${c.duree_heures}</td>
                <td>${c.id_instructeur}</td>
                <td>${c.id_niveau}</td>
                <td><button onclick="supprimerCours(${c.id_cours})">Supprimer</button></td>
            </tr>
        `;
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const body = {
            id_cours: form.id.value,
            titre: form.titre.value,
            description: form.description.value,
            duree_heures: form.duree.value,
            id_instructeur: form.id_instructeur.value,
            id_niveau: form.id_niveau.value
        };

        await create("cours", body);
        location.reload();
    });
});

async function supprimerCours(id) {
    await remove("cours", id);
    location.reload();
}
