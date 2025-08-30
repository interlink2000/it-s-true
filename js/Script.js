document.addEventListener('DOMContentLoaded', function() {

    // 1. "Wooow" Feature: Typing Animation for the Hero Headline
    const options = {
        strings: ['prove your truth.', 'verify authenticity.', 'build real trust.'],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '_',
    };

    const typed = new Typed('#typed-text', options);


    // 2. Formspree Waitlist Form Submission
    const form = document.getElementById('waitlist-form');
    const status = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = "Thanks for joining! We'll be in touch.";
                status.style.color = 'var(--accent-color)';
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    status.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.textContent = "Oops! There was a problem submitting your form.";
                }
                status.style.color = 'red';
            }
        } catch (error) {
            status.textContent = "Oops! There was a problem submitting your form.";
            status.style.color = 'red';
        }
    }

    form.addEventListener("submit", handleSubmit);
});