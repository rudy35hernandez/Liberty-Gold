
    document.addEventListener('DOMContentLoaded', () => {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navMenu = document.getElementById('nav-menu');

        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggle menu visibility
        });
    });


    document.addEventListener("DOMContentLoaded", function(){
        const form = document.getElementById("consultation-form")
        const thankYouMessage = document.getElementById("thank-you-message")

        form.addEventListener("submit", function(event) {
            event.preventDefault()

            form.style.display = "none"
            thankYouMessage.style.display = "block"
        })
    })