// 手機漢堡選單
const toggleBtn = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

toggleBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

menu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
});

// Slider
const track = document.querySelector(".slider__track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider__btn.prev");
const nextBtn = document.querySelector(".slider__btn.next");
const dots = document.querySelectorAll(".dot");

let index = 0;
let timer = null;
const intervalMs = 3500;

function goTo(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
}

function next(){ goTo(index + 1); }
function prev(){ goTo(index - 1); }

nextBtn.addEventListener("click", () => { next(); restart(); });
prevBtn.addEventListener("click", () => { prev(); restart(); });

dots.forEach((d, di) => {
  d.addEventListener("click", () => { goTo(di); restart(); });
});

function start(){ timer = setInterval(next, intervalMs); }
function stop(){ if (timer) clearInterval(timer); }
function restart(){ stop(); start(); }

const slider = document.querySelector(".slider");
slider.addEventListener("mouseenter", stop);
slider.addEventListener("mouseleave", start);

goTo(0);
start();
