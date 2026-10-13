const contactForm = document.getElementById("contactForm");

const responseMessage =
    document.getElementById("responseMessage");


contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const message =
        document.getElementById("message").value;


    try {

        const response = await fetch(
            "http://localhost:5000/api/contacts",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            responseMessage.textContent =
                data.message;

            contactForm.reset();

        } else {

            responseMessage.textContent =
                data.message;

        }

    } catch (error) {

        console.log(error);

        responseMessage.textContent =
            "Something went wrong. Please try again.";

    }

});

