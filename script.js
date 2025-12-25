// Password validation
const correctPassword = "Janella123mabait";

document.getElementById('submit-password').addEventListener('click', function() {
    const input = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');

    if (input === correctPassword) {
        document.getElementById('password-section').classList.remove('active');
        document.getElementById('welcome-section').classList.add('active');
        showWelcomeMessage();
    } else {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2000);
    }
});

// Enter key support for password submission
document.getElementById('password-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('submit-password').click();
    }
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function() {
    const input = document.getElementById('password-input');
    const icon = this;

    if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = '🙈'; // Closed eye when visible
    } else {
        input.type = 'password';
        icon.textContent = '👁️'; // Open eye when hidden
    }
});

// Welcome message animation
function showWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    const messages = [
        "Welcome Niya! 🎄",
        "This is my Christmas gift for you 💝",
        "I hope you like it! 😊"
    ];

    let index = 0;
    const interval = setInterval(() => {
        if (index < messages.length) {
            welcomeMessage.textContent = messages[index];
            welcomeMessage.classList.add('floating');
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('welcome-section').classList.remove('active');
                document.getElementById('main-section').classList.add('active');
                // Enable scrolling on mobile when main section is shown
                document.body.classList.add('scrollable');
                // Add floating animation to category buttons
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.add('floating');
                });
                // Add floating animation to the main title
                document.querySelector('h1').classList.add('floating');
                // Show music controls immediately
                document.getElementById('play-music').classList.remove('hidden');
                // Try to start background music when main section is shown
                // This should work on mobile since user has already interacted (entered password)
                const bgMusic = document.getElementById('background-music');
                bgMusic.play().then(() => {
                    // Hide play button and show pause button when music starts playing
                    document.getElementById('play-music').classList.add('hidden');
                    document.getElementById('pause-music').classList.remove('hidden');
                }).catch(e => {
                    console.log('Background music autoplay blocked:', e);
                    // Keep play button visible if autoplay fails
                });
            }, 1000); // Reduced from 2000ms to 1000ms
        }
    }, 1500); // Reduced from 2000ms to 1500ms
}

// Category click handlers
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const content = document.getElementById(category);

        // Hide all contents
        document.querySelectorAll('.content').forEach(c => c.classList.remove('show'));

        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));

        // Show selected content and activate button
        content.classList.add('show');
        this.classList.add('active');

        // Add event listeners to gallery images if gallery is opened
        if (category === 'gallery') {
            addGalleryEventListeners();
        }
    });
});

// Function to add event listeners to gallery images
function addGalleryEventListeners() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src);
        });
    });
}



// Function to create snowflakes
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const emojis = ['❄', '❤️', '🎄', '🎁'];

    // Create initial snowflakes with random delays to avoid line effect
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDelay = Math.random() * 10 + 's'; // Random delay for initial snowflakes
        snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'em';
        snowflakesContainer.appendChild(snowflake);

        // Remove snowflake after animation to prevent buildup
        setTimeout(() => {
            snowflake.remove();
        }, 10000 + Math.random() * 10000); // Randomize removal time
    }

    // Continuously add new snowflakes for continuous effect
    setInterval(addSnowflake, 300); // Add a new snowflake every 300ms

    function addSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDelay = '0s'; // No delay for immediate falling
        snowflake.style.fontSize = Math.random() * 1.5 + 0.5 + 'em';
        snowflakesContainer.appendChild(snowflake);

        // Remove snowflake after animation to prevent buildup
        setTimeout(() => {
            snowflake.remove();
        }, 10000); // Match animation duration
    }
}

// Modal functions for gallery
function openModal(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'block';
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('image-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Function to create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.fontSize = Math.random() * 1 + 1 + 'em';
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000); // Add a new heart every 2 seconds
}

// Music control event listeners
document.getElementById('play-music').addEventListener('click', function() {
    const bgMusic = document.getElementById('background-music');
    bgMusic.play().then(() => {
        this.classList.add('hidden');
        document.getElementById('pause-music').classList.remove('hidden');
    }).catch(e => {
        console.log('Failed to play music:', e);
    });
});

document.getElementById('pause-music').addEventListener('click', function() {
    const bgMusic = document.getElementById('background-music');
    bgMusic.pause();
    this.classList.add('hidden');
    document.getElementById('play-music').classList.remove('hidden');
});

// Initialize snowflakes and hearts on page load
window.addEventListener('load', () => {
    createSnowflakes();
    createHearts();
});
