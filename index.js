gsap.registerPlugin(ScrollTrigger, SplitType);

// ===============================================
// 1. RESPONSIVE CARD MOVEMENT (Using xPercent/yPercent for reliability)
// ===============================================

const cardTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
    }
});

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    // --- DESKTOP ANIMATION (Original logic, ensuring it works as intended) ---
    // The card is centered by CSS with left: 50% and transform: translateX(-50%).
    
    // State 1 -> State 2 (Hero 1 to Hero 2 transition)
    cardTimeline.to("#cardImg", { 
        rotation: 200, 
        x: 0, // Since it's centered, 0 here means no additional shift
        y: -100, 
        scale: 0.6,
        duration: 1, 
    }, 0) 

    // State 2 -> State 3 (Hero 2 to Hero 3 transition)
    .to("#cardImg", { 
        rotation: 170, 
        x: 700, // Large pixel shift for desktop
        y: 120, 
        scale: 0.55,
        duration: 1,
    }, 1) 

    // State 3 -> State 4 (Hero 3 to Hero 4 transition)
    .to("#cardImg", { 
        rotation: 0, 
        x: 500, 
        y: 120, 
        scale: 1,
        duration: 1,
    }, 2)

    // State 4 -> State 5 (Hero 4 to Hero 5 transition)
    .to("#cardImg", { 
        rotation: 0, 
        x: 500, 
        y: -200, 
        scale: 0,
        duration: 2,
    }, 3);
});

mm.add("(max-width: 768px)", () => {
    // --- MOBILE ANIMATION (Refined using xPercent/yPercent for centering) ---
    // Initial centering is handled by CSS (.card-wrapper/fixed positioning). 

    cardTimeline.to("#cardImg", {
        rotation: 180, 
        xPercent: 0, // Use xPercent for reliable mobile off-center movement
        y: '-10vh', 
        scale: 0.3,
        duration: 1,
    }, 0)
    .to("#cardImg", {
        rotation: 160, 
        xPercent: 10, 
        y: '-15vh', 
        scale: 0.4,
        duration: 1,
    }, 1)
    .to("#cardImg", {
        rotation: 0, 
        xPercent: 0, 
        y: '5vh', 
        scale: 0.8,
        duration: 1,
    }, 2)
    .to("#cardImg", {
        rotation: 0, 
        y: '-150vh', // Clean exit path
        scale: 0.01, 
        duration: 2,
    }, 3);
});


/* ------------------------
    2. Other animations
    ------------------------ */

// HERO2: heading opacity only (removed filter: blur for performance)
gsap.fromTo(".hero2-details h1",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
            trigger: "#two",
            start: "top 85%",
            end: "top 1%",
            scrub: true
        }
    }
);

// Floating words in hero2
gsap.fromTo(".fword",
    { opacity: 0, y: 40, rotation: -8 },
    {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.22,
        scrollTrigger: {
            trigger: "#two",
            start: "top 75%",
            end: "top 30%",
            scrub: true
        }
    }
);

/* ------------------------
    3. HERO3: SPIRAL CARD ANIMATION (3D values scaled down for mobile in matchMedia)
    ------------------------ */
const spiralCards = gsap.utils.toArray(".step-card");
const totalCards = spiralCards.length;

const spiralTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#three",
        start: "top top",
        end: "+=4000", 
        scrub: 1.5, 
        pin: true, 
        anticipatePin: 1
    }
});

mm.add("(min-width: 769px)", () => {
    spiralCards.forEach((card, i) => {
        const startTime = i * 15; // Start position for each card
        const holdDuration = 5;

        // 1. ENTER PHASE 
        spiralTl.fromTo(card, 
            {
                autoAlpha: 0, z: -1000, x: 400, y: 300, rotationY: 60, rotationZ: 10, scale: 0.5
            },
            {
                duration: 5, // Animation duration
                autoAlpha: 1, z: 0, x: 0, y: 0, rotationY: 0, rotationZ: 0, scale: 1,
                ease: "power2.out"
            },
            startTime // Start position
        )
        
        // 2. READ PHASE (Critically important static phase)
        .to(card, {
            duration: holdDuration, // Hold card still for reading
            boxShadow: "0 0 40px rgba(255, 255, 255, 0.4)",
            z: 1 
        }, startTime + 5) // Starts after 5s enter duration

        // 3. EXIT PHASE 
        if (i !== totalCards - 1) {
            spiralTl.to(card, {
                duration: 5,
                autoAlpha: 0, z: -800, x: -400, y: -300, rotationY: -60, scale: 0.5,
                ease: "power2.in"
            }, startTime + 5 + holdDuration); // Starts after hold duration
        }
    });
});

mm.add("(max-width: 768px)", () => {
    // Scaled-down, simplified 3D effect for mobile
    spiralCards.forEach((card, i) => {
        const startTime = i * 12; // Shorter duration on mobile
        const holdDuration = 4;

        // 1. ENTER PHASE 
        spiralTl.fromTo(card, 
            {
                autoAlpha: 0, z: -300, x: 100, y: 80, rotationY: 30, scale: 0.7
            },
            {
                duration: 4, 
                autoAlpha: 1, z: 0, x: 0, y: 0, rotationY: 0, scale: 1,
                ease: "power2.out"
            },
            startTime
        )
        
        // 2. READ PHASE (Hold card still)
        .to(card, {
            duration: holdDuration, 
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
        }, startTime + 4) 

        // 3. EXIT PHASE 
        if (i !== totalCards - 1) {
            spiralTl.to(card, {
                duration: 4,
                autoAlpha: 0, z: -300, x: -100, y: -80, rotationY: -30, scale: 0.7,
                ease: "power2.in"
            }, startTime + 4 + holdDuration);
        }
    });
});


/* ------------------------
    4. HERO 4 LIST (PINNING & SEQUENTIAL REVEAL)
    ------------------------ */
// HERO 4 SplitType (No change, it's already working well)
if (typeof SplitType !== "undefined") {
    const split = new SplitType(".hero4main", { types: "chars" });
    gsap.fromTo(split.chars,
        { y: i => (i % 2 === 0 ? 80 : -80), rotateX: i => (i % 2 === 0 ? 40 : -40) },
        {
            y: 0, rotateX: 0, ease: "power3.out", stagger: 0.03, duration: 3,
            scrollTrigger: {
                trigger: "#four", start: "top 70%", end: "top 30%", scrub: true
            }
        }
    );
}

// 1. Set the initial state (Subtle x movement for better UX)
gsap.set(".list li", { opacity: 0, x: -100 });

// 2. Create the ScrollTrigger Timeline for the entire Hero 4 section
const hero4ListTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#four",
        start: "top top", 
        end: "+=2000", 
        scrub: true,
        pin: true , 
    }
});

// 3. Sequentially reveal each list item using fractional positioning for reliability
// Use the '<' operator to position relative to the end of the previous animation for reliable staging.
hero4ListTl.to(".list li:nth-child(1)", { opacity: 1, x: 100, duration: 0.5, ease: "power3.out" }, 0.2) // Start slightly after pin
            .to(".list li:nth-child(2)", { opacity: 1, x: 100, duration: 0.5, ease: "power3.out" }, "<0.4") // 0.4s after item 1 starts
            .to(".list li:nth-child(3)", { opacity: 1, x: 100, duration: 0.5, ease: "power3.out" }, "<0.4")
            .to(".list li:nth-child(4)", { opacity: 1, x: 100, duration: 0.5, ease: "power3.out" }, "<0.4")
            .to(".list li:nth-child(5)", { opacity: 1, x: 100, duration: 0.5, ease: "power3.out" }, "<0.4");



mm.add('max-width:768px',() => {
    hero4ListTl.to(".list li:nth-child(1)", { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 0.2) // Start slightly after pin
            .to(".list li:nth-child(2)", { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "<0.4") // 0.4s after item 1 starts
            .to(".list li:nth-child(3)", { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "<0.4")
            .to(".list li:nth-child(4)", { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "<0.4")
            .to(".list li:nth-child(5)", { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, "<0.4");
})
/* ------------------------
    5. HERO 1 Motion
    ------------------------ */
gsap.fromTo("#centerhead", { y: 70, scale: 1.15 }, {
    y: 0, scale: 1, ease: "power3.out",
    scrollTrigger: { trigger: ".hero1", start: "top top", end: "top -25%", scrub: true }
});
gsap.fromTo("#lefthead", { y: 0 }, { y: -10, ease: "power3.out", scrollTrigger: { trigger: ".hero1", start: "top top", end: "top -25%", scrub: true } });
gsap.fromTo("#righthead", { y: 0 }, { y: -10, ease: "power3.out", scrollTrigger: { trigger: ".hero1", start: "top top", end: "top -25%", scrub: true } });


/* ------------------------
    6. GTA Video + Overlay (Using Opacity Overlay, not filter: brightness)
    ------------------------ */
const video = document.getElementById("gtaVideo");
const videoOverlay = document.getElementById("gtaVideoOverlay"); // NEW ELEMENT

function initVideoScroll() {
    const duration = video.duration;

    gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
            trigger: "#gtaSection",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: "#gtaVideo",
        }
    });

    // Use overlay opacity to darken video for text reveal (Performance fix)
    const storySlides = gsap.utils.toArray(".story-slide");
    storySlides.forEach((slide) => {
        // Darken overlay when text is centered (Overlay opacity to 0.5)
        gsap.to(videoOverlay, 
            {
                opacity: 0.5, // Darken effect
                ease: "none",
                scrollTrigger: {
                    trigger: slide,
                    start: "top center",
                    end: "center center",
                    scrub: true,
                },
            }
        );

        // Brighten overlay when text leaves (Overlay opacity to 0)
        gsap.to(videoOverlay, {
            opacity: 0, // Brighten effect
            ease: "none",
            scrollTrigger: {
                trigger: slide,
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    gsap.registerPlugin(ScrollTrigger);

gsap.fromTo("#gtaVideo",
    { filter: "brightness(1)" },
    {
        filter: "brightness(0.1)",  // how dark you want it
        ease: "none",
        scrollTrigger: {
            trigger: "#gtaSection",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    }
);


    // Slide text reveal timeline (fixed from previous code)
    gsap.set(storySlides, { zIndex: (i, target, targets) => targets.length - i, opacity: 0, scale: 0.9 });

    const slideRevealTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#gtaSection",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    });

    storySlides.forEach((slide, i) => {
        const startPos = i * 3.5; // Shortened time for better flow

        // Fade in
        slideRevealTimeline.to(slide,
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
            startPos
        );

        // Hold
        slideRevealTimeline.to(slide, { duration: 1.0 }, startPos + 1.5);

        // Fade out (except last)
        if (i < storySlides.length - 1) {
            slideRevealTimeline.to(slide,
                { opacity: 0, scale: 0.8, duration: 1, ease: "power2.in" },
                startPos + 2.5
            );
        } else {
            // Keep last slide visible until the end of the section
            slideRevealTimeline.to(slide, { duration: 5 }, startPos + 2.5);
        }
    });

}

// Initialize video scroll logic
if (video) { // Check if video element exists before adding listener
    if (video.readyState >= 1) {  
        initVideoScroll();
    } else {
        video.addEventListener("loadedmetadata", initVideoScroll);
    }
}


/* ------------------------
    7. HERO 5 (Background Zoom)
    ------------------------ */
gsap.fromTo("#five", 
    { backgroundSize: "100%" }, 
    { 
        backgroundSize: "150%", // Zoom reduced for better performance and effect
        ease: "none",
        scrollTrigger: {
            trigger: "#five",
            start: "top bottom",
            end: "bottom top",
            scrub: true 
        }
    }
);


/* ------------------------
    8. General Reveal/Parallax 
    ------------------------ */

// 1. SCROLL REVEAL (Unchanged, assuming necessary CSS exists)
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => scrollObserver.observe(el));


// 2. MOUSE PARALLAX EFFECT (No change)
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        
        const xMove = (x * speed) / 2; 
        const yMove = (y * speed) / 2;

        layer.style.transform = `translateX(${xMove}px) translateY(${yMove}px)`;
    });
});


// Final ScrollTrigger refresh
setTimeout(() => ScrollTrigger.refresh(), 500);


// Add this to your existing GSAP script (inside DOMContentLoaded)


// holo-final.js — PERFECT CENTERED + NO ROTATION
// holo-final.js — PERFECT CENTERED + NO ROTATION
document.addEventListener("DOMContentLoaded", () => {
  const ribbons = document.querySelectorAll(".holo-ribbon");
  const radius = 380;

  ribbons.forEach((r, i) => {
    const angle = i * 60;
    const rad = angle * Math.PI / 180;

    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius * 0.45;
    const z = Math.sin(rad) * 160;

    gsap.to(r, {
      x,
      y,
      z,
      opacity: 1,
      scale: 1,
      duration: 1.6,
      delay: 0.4 + i * 0.1,
      ease: "elastic.out(1.4, 0.6)"
    });
  });

  // Only subtle floating — absolutely no rotation
  gsap.to(".holo-card", {
    y: -18,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".holo-sphere", {
    y: -12,
    duration: 9,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});


//membership cards


// Main timeline for the whole section
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#membershipCards",
    start: "top 80%",
    end: "bottom 40%",
    scrub: false,
    once: true
  }
});

// Background fade + slight zoom
tl.from("#membershipCards", {
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  ease: "power2.out"
});

// Title + subtitle
tl.from(".mc-title, .mc-sub", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: "power3.out"
}, "-=0.4");

// Actions stagger
tl.from(".mc-action", {
  x: -50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.12,
  ease: "back.out(1.7)"
}, "-=0.3");

// Icon pop animation (micro interaction)
gsap.from(".mc-icon", {
  scale: 0,
  opacity: 0,
  duration: 0.4,
  stagger: 0.1,
  ease: "back.out(2)",
  scrollTrigger: {
    trigger: "#membershipCards",
    start: "top 75%",
    once: true
  }
});

// Right card entrance
tl.from(".mc-big-card", {
  x: 120,
  rotate: 12,
  opacity: 0,
  duration: 1,
  ease: "expo.out"
}, "-=0.5");

// Card glow pulse
gsap.to(".mc-card-glow", {
  scale: 1.2,
  opacity: 1,
  repeat: -1,
  yoyo: true,
  duration: 2.2,
  ease: "sine.inOut",
  scrollTrigger: {
    trigger: "#membershipCards",
    start: "top 80%"
  }
});

// Subtle floating animation (after entering)
gsap.to(".mc-card-float", {
  y: -12,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});



//whatsapp
document.getElementById("whatsapp").addEventListener("click", function () {
    window.open("https://wa.me/918310312791", "_blank");
});

document.getElementById("whatsappBtn").addEventListener("click", function () {
    window.open("https://wa.me/918310312791", "_blank");
});

document.getElementById("whatsappBtn2").addEventListener("click", function () {
    window.open("https://wa.me/918310312791", "_blank");
});

//Home
document.getElementById('logo').addEventListener('click' , () => {
    window.location.href = 'index.html'
})


