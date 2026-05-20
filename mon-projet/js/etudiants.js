document.addEventListener("DOMContentLoaded", async () => {

    const table = document.querySelector("#table-etudiants");
    const form = document.querySelector("#form-etudiant");

    // Affichage des étudiants
    const etudiants = await getAll("etudiant");

    etudiants.forEach(e => {
        table.innerHTML += `
            <tr>
                <td>${e.id_etudiant}</td>
                <td>${e.nom}</td>
                <td>${e.courriel}</td>
                <td>${e.telephone ?? ""}</td>
                <td><button onclick="supprimerEtudiant(${e.id_etudiant})">Supprimer</button></td>
            </tr>
        `;
    });

    // Ajout d'un étudiant
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const body = {
            id_etudiant: form.id.value,
            nom: form.nom.value,
            courriel: form.courriel.value,
            telephone: form.telephone.value
        };

        await create("etudiant", body);
        location.reload();
    });
});

async function supprimerEtudiant(id) {
    await remove("etudiant", id);
    location.reload();
}
