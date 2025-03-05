
// const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/events";
// let parties = [];
   

 document.addEventListener("DOMContentLoaded", () => {
      fetchParties();
      document.getElementById("addParty").addEventListener("submit", addParty);
      document.getElementById("deleteParty").addEventListener("submit", deleteParty);
    });
 
// use Fetch to GET party data from the API

    async function fetchParties() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            parties = data;
            renderParties();
        } catch (error) {
            console.error("Error fetching parties:", error);
        }
    }
   
// use Fetch to POST a new party to the API

    async function addParty(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newParty = {
            name: formData.get("eventName"),
            description: formData.get("eventDescription"),
            date: formData.get("date"),
            time: formData.get("time"),
            location: formData.get("eventLocation")
        };
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newParty)
            });
            if (response.ok) {
                fetchParties();
                event.target.reset();
            }
        } catch (error) {
            console.error("Error adding party:", error);
        }
    }
   
// use Fetch to DELETE a party from the API.

    async function deleteParty(event) {
     event.preventDefault();
     const formData = new FormData(event.target);
     const deleteParty = {
         name: formData.get("eventName"),
         description: formData.get("eventDescription"),
         date: formData.get("date"),
         time: formData.get("time"),
         location: formData.get("eventLocation")
     };
     try {
         const response = await fetch(API_URL, {
             method: "DELETE",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(deleteParty)
         });
         if (response.ok) {
             fetchParties();
             event.target.reset();
         }
     } catch (error) {
         console.error("Error deleting party:", error);
     }
 }
 
//    render data and update state

    function renderParties() {
        const partiesList = document.getElementById("parties");
        partiesList.innerHTML = "";
        parties.forEach(party => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${party.name}</strong> - ${party.description}<br>
                            <em>${party.date} at ${party.time}</em><br>
                            Location: ${party.location}
                            <button onclick="removeParty('${party.id}')">Delete</button>`;
            partiesList.appendChild(li);
        });
    }
   
 




 







