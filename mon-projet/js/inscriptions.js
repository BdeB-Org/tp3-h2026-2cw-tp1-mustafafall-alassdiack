// Format date
function formatDateToMMDDYYYY(dateStr) {
    if (!dateStr) return '';

    const datePart = dateStr.split('T')[0];
    const [year, month, day] = datePart.split('-');

    return `${month}/${day}/${year}`;
}

// Logique principale
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
                <td>${formatDateToMMDDYYYY(i.date_inscription)}</td>
                <td>${i.etat}</td>
                <td><button onclick="supprimerInscription(${i.id_inscription})">Supprimer</button></td>
            </tr>
        `;
    });

       // Soumission format
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {
        id_etudiant: parseInt(form.id_etudiant.value),
        id_cours: parseInt(form.id_cours.value),
        date_inscription: form.date_inscription.value + "T00:00:00Z",   // ← ISO with Z
        etat: form.etat.value.trim()
    };

    try {
        console.log("Sending data:", body);
        
        const result = await create("inscription", body);
        console.log("Create result:", result);

        alert("Inscription ajoutée avec succès !");
        
        // Rafraîchir table
        const table = document.querySelector("#table-inscriptions");
        table.innerHTML = "";
        
        const inscriptions = await getAll("inscription");
        inscriptions.forEach(i => {
            table.innerHTML += `
                <tr>
                    <td>${i.id_inscription}</td>
                    <td>${i.id_etudiant}</td>
                    <td>${i.id_cours}</td>
                    <td>${formatDateToMMDDYYYY(i.date_inscription)}</td>
                    <td>${i.etat}</td>
                    <td><button onclick="supprimerInscription(${i.id_inscription})">Supprimer</button></td>
                </tr>
            `;
        });

        form.reset();
        
    } catch (error) {
        console.error("Full error:", error);
        alert("Erreur: " + (error.message || JSON.stringify(error)));
    }
});
});

// Suppression de fonction
async function supprimerInscription(id) {
    if (confirm("Voulez-vous vraiment supprimer cette inscription ?")) {
        try {
            await remove("inscription", id);
            location.reload();
        } catch (error) {
            console.error("Error deleting inscription:", error);
            alert("Erreur lors de la suppression.");
        }
    }
}