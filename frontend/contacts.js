const contactsList = document.getElementById("contactsList");


async function getContacts() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/contacts"
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        const contacts = result.data;

        contactsList.innerHTML = "";

        if (contacts.length === 0) {

            contactsList.innerHTML =
                "<p>No contacts found.</p>";

            return;
        }

        contacts.forEach((contact) => {

            const card = document.createElement("div");

            card.classList.add("contact-item");

            const date = new Date(contact.submissionDate)
                .toLocaleString();

            card.innerHTML = `
                <h3>👤 ${contact.name}</h3>

                <p>
                    <strong>Email:</strong>
                    ${contact.email}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${contact.message}
                </p>

                <p>
                    <strong>Submitted:</strong>
                    ${date}
                </p>

                <button
                    class="edit-btn"
                    onclick="editContact('${contact._id}')">
                    ✏️
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteContact('${contact._id}')">
                    ❌
                </button>
            `;

            contactsList.appendChild(card);
        });

    } catch (error) {

        console.log(error);

        contactsList.innerHTML =
            "<p>Unable to load contacts.</p>";
    }
}


// EDIT CONTACT

function editContact(id) {

    console.log("Edit ID:", id);

    localStorage.setItem("editContactId", id);

    window.location.href = "index.html";
}


// DELETE CONTACT

async function deleteContact(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/contacts/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert(data.message);

        // Refresh the contact list
        getContacts();

    } catch (error) {

        console.log(error);

        alert("Error deleting contact");
    }
}


getContacts();