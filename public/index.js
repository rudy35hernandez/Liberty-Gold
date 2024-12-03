
    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggle menu visibility
        });
    });


    document.getElementById("consultation-form").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission behavior
        console.log("Form submission intercepted!"); // Debugging log
    
        // Gather form data
        const formData = new FormData(event.target); // Collect form data
        const data = Object.fromEntries(formData.entries()); // Convert to a plain object
        console.log("Collected data:", data); // Debugging log
    
        try {
            // Send data to the server via fetch
            const response = await fetch("/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log("Response received:", response); // Debugging log

    
            if (response.ok) {
                const result = await response.json(); // Parse JSON response
                console.log("Parsed response:", result); // Debugging log
                
                if (result.success) {
                    // Update only the form section
                    document.querySelector(".form-section").innerHTML = `
                        <div id="thank-you-message">
                            <h3>Thank you!</h3>
                            <p>We will reach out to you as soon as possible.</p>
                        </div>
                    `;
                } else {
                    throw new Error(result.error || "Something went wrong.");
                }
            } else {
                throw new Error("Failed to submit the form.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("Something went wrong. Please try again later.");
        }
    });
        
