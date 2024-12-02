
    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggle menu visibility
        });
    });


    document.getElementById("consultation-form").addEventListener("submit", async function(event){
        event.preventDefault()

        const formData = FormData(event.target) // form data from form
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch("/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application.json",
                },
                body: JSON.stringify(data),
            });

            if(response.ok){
                //update page with thank you message
                document.querySelector(".form-section").innerHTML = `
                <h2> Thank you for reaching out!</h2> 
                <p> We will contact you shortly.</p>
                `
            } else {
                throw new Error("Failed to submit form");
            } 
        }  catch (error) {
            console.error("Error submitting the form", error);
            alert("Something went wrong. Please try again later.")
        }
    })
        
