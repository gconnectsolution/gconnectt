gsap.registerPlugin(ScrollTrigger);

// Page load intro
gsap.fromTo("#cardImg",
  { opacity: 0, scale: 0 },
  { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
);

// MASTER TIMELINE
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// SECTION 1 → 2: ROTATE
tl.to("#cardImg", {
  rotation: 200,
  y:-110,
  ease: "none"
});

// SECTION 3: MOVE + SHRINK
tl.to("#cardImg", {
  rotation:178,
  scale: 0.3,
  x: 450,
  y: 125,
  ease: "none"
});

// SECTION 4: RESET POSITION + SCALE + OPTIONAL OPACITY
tl.to("#cardImg", {
  rotation:0,
  scale: 1.2,
  x: -200,
  y:  0,
  opacity: 1,     // OR 0 if you want it to fade out
  ease: "none"
});

//hero5 section
tl.to('#cardImg' ,{
  rotation:0,
  scale:0.4,
  delsy:1,
  x:-500,
  y:-200,
  ease:'none'
});



// Animate hero2 details: Center → left/right split on scroll
gsap.to(".hero2-details > div:nth-child(1)", {  // First div
  x: 0,               // Slide left
  opacity: 0.8,          // Optional fade
  ease: "power2.out",
  duration: 1,
  scrollTrigger: {
    trigger: "#two",
    start: "top bottom",
    end: "bottom top",
    scrub: true           // Ties to scroll progress (smooth)
  }
});

gsap.to(".hero2-details > div:nth-child(2)", {  // Second div
  x: 250,                // Slide right
  opacity: 0.8,
  ease: "power2.out",
  duration: 1,
  scrollTrigger: {
    trigger: "#two",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});



// Smooth section snapping: One scroll = one full section (100vh)
// Snaps to 0%, 33.3%, 66.6%, 100% progress (for 4 equal-height sections)
/*ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",  // Full page scroll distance
  snap: {
    snapTo: [0, 0.24, 0.48, 0.76,1],  // Progress points for 4 sections (#one at 0, #two at 1/3, etc.)
    duration: { min: 0, max: 1 },  // Quick on small scrolls, up to 1s on big jumps
    delay: 0,  // Brief pause before snap
    ease: "power3.inOut"  // Smooth acceleration/deceleration
  },
  onUpdate: (self) => {
    // Optional: Update active section (e.g., for styling)
    const sections = gsap.utils.toArray("section");
    const activeIndex = Math.round(self.progress * 3);  // 0-3 for 4 sections
    sections.forEach((sec, i) => {
      sec.classList.toggle("active", i === activeIndex);
    });
  }
});*/

// Optional: Add CSS for active section (e.g., in index.css for visual feedback)
// section.active { filter: brightness(1.2); } /* or any highlight */

const hero3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#three",
    start: "top center",
    end: "bottom center",
    scrub: true
  }
});

hero3.fromTo("#hero3cards", {
  scale:0,
  x: -100,
  opacity: 0,
  ease: "none",
  stagger: 1,
},{
  scale:2,
  x: 0,
  opacity: 2,
  ease: "none",
  stagger: 1,
});


//gsap.fromTo(".hero1",
//  { backgroundSize: "100%" },
//  { 
//    backgroundSize: "50%",
//    ease: "none",
//    scrollTrigger: {
//      trigger: ".hero1",
//      start: "top top",
//      end: "bottom top",
//      scrub: true
//    }
//  }
//);
