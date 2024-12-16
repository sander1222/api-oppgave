const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
   
    const captchaResponse = grecaptcha.getResponse();

    // Sjekk om CAPTCHA er fullført
    if (!(captchaResponse.length > 0)) {
        throw new Error("Captcha not completed");
    }

    const fd = new FormData(e.target);
    const params = new URLSearchParams(fd);

    // Send forespørselen
    fetch('http://httpbin.org/post', {
        method: 'POST', // Husk å angi HTTP-metoden
        body: params
    })
    .then(response => response.json()) // Håndter JSON-respons
    .then(data => {
        console.log("Success:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
