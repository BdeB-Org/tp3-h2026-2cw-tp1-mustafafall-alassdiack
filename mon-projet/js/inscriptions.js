document.addEventListener("DOMContentLoaded", async () => {

    const table = document.querySelector("#table-inscriptions");
    const form = document.querySelector("#form-inscription");

    const inscriptions = await getAll("inscription");

    inscriptions.forEach(i => {
        table.innerHTML += `
            <tr>
                <td>${i.id_inscription}</td>
                <td>${i.id_etudiant}</td>
                <td>${i.id_cours}</td>
                <td>${i.date_inscription}</td>
                <td>${i.etat}</td>
                <td><button onclick="supprimerInscription(${i.id_inscription})">Supprimer</button></td>
            </tr>
        `;
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const body = {
            id_inscription: form.id.value,
            id_etudiant: form.id_etudiant.value,
            id_cours: form.id_cours.value,
            date_inscription: form.date_inscription.value,
            etat: form.etat.value
        };

        await create("inscription", body);
        location.reload();
    });
});

async function supprimerInscription(id) {
    await remove("inscription", id);
    location.reload();
}
