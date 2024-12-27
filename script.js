document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() => {
            ripples.remove()
        }, 500);

        ripples.addEventListener('animationend', () => {
            ripples.remove();
        });
    });
});

document.querySelectorAll('.fidget-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class first
        this.classList.remove('active');
        
        // Force a reflow
        void this.offsetWidth;
        
        // Add active class
        this.classList.add('active');
        
        if (this.classList.contains('grow') || this.classList.contains('color-change')) {
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
        } else {
            this.addEventListener('animationend', () => {
                this.classList.remove('active');
            }, {once: true});
        }
    });
});

const spinButton = document.getElementById('spinButton');
let spinSpeed = 1;
let slowdownTimer;
let rotationDegrees = 0;
let isSpinning = false;
let animationFrameId;

spinButton.addEventListener('click', function() {
    clearTimeout(slowdownTimer);
    
    // If already spinning, increase speed
    if (isSpinning) {
        spinSpeed = Math.min(spinSpeed + 1, 4);
    } else {
        spinSpeed = 1;
        isSpinning = true;
        spin();
    }
    
    // Set timer for gradual slowdown
    slowdownTimer = setTimeout(() => {
        spinSpeed = 0.5; // Start slowing down
        // After a while, stop completely
        setTimeout(() => {
            isSpinning = false;
            spinSpeed = 1;
            cancelAnimationFrame(animationFrameId);
        }, 3000);
    }, 2000);
});

function spin() {
    rotationDegrees += spinSpeed * 5;
    spinButton.style.transform = `rotate(${rotationDegrees}deg)`;
    
    if (isSpinning) {
        animationFrameId = requestAnimationFrame(spin);
    }
}

const bounceButton = document.getElementById('bounceButton');
let bounceY = 0;
let bounceVelocity = -15;
let gravity = 0.8;
let isBouncing = false;
let bounceAnimationFrameId;

bounceButton.addEventListener('click', function() {
    if (!isBouncing) {
        isBouncing = true;
        bounceY = 0;
        bounceVelocity = -15;
        animate();
    }
});

function animate() {
    bounceVelocity += gravity;
    bounceY += bounceVelocity;
    
    // If hitting the ground
    if (bounceY > 0) {
        bounceY = 0;
        bounceVelocity = -bounceVelocity * 0.6; // Bounce back with 60% of velocity
        
        // Stop if bounce is very small
        if (Math.abs(bounceVelocity) < 2) {
            isBouncing = false;
            bounceButton.style.transform = `translateY(0px)`;
            return;
        }
    }
    
    bounceButton.style.transform = `translateY(${bounceY}px)`;
    
    if (isBouncing) {
        bounceAnimationFrameId = requestAnimationFrame(animate);
    }
}