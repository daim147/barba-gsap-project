/* eslint-disable object-property-newline */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable key-spacing */
/* eslint-disable spaced-comment */
/* eslint-disable lines-around-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable space-before-blocks */
/* eslint-disable quotes */
import barba from "@barba/core";
import gsap from "gsap";

// ! Animaton ON Entering Any Container

const animationEnter = (container) => {
  const activeLink = container.querySelector("a.is-active span");
  const projects = container.querySelectorAll(".project");
  const images = container.querySelectorAll(".image");
  const img = container.querySelectorAll("img");

  const timeLine = gsap.timeline({
    defaults: {
      duration: 0.9,
      ease: "power4.out",
    },
  });

  timeLine
    .set(projects, { autoAlpha: 1 })
    .fromTo(
      activeLink,
      {
        xPercent: -101,
      },
      {
        xPercent: 0,
      },
      0
    )
    .from(
      images,
      {
        xPercent: -101,
        stagger: 0.05,
      },
      0
    )
    .from(
      img,
      {
        xPercent: 101,
        stagger: 0.05,
      },
      0
    );
  // ! putting zero so that it can run on same time
  timeLine.timeScale(0.4); //! For slowing animation

  return timeLine;
};

// ! Animaton ON Leaving Any Container

const animationLeave = (container) => {
  const activeLink = container.querySelector("a.is-active span");
  const images = container.querySelectorAll(".image");
  const img = container.querySelectorAll("img");
  console.log("LEAVE LEAVEE");
  const timeLine = gsap.timeline({
    defaults: {
      duration: 0.4,
      ease: "power4.out",
    },
  });

  timeLine
    .to(
      activeLink,
      {
        xPercent: 101,
      },
      0
    )
    .to(
      images,
      {
        xPercent: 101,
        stagger: 0.01,
      },
      0
    )
    .to(
      img,
      {
        xPercent: -101,
        stagger: 0.01,
      },
      0
    );
  timeLine.timeScale(0.4);

  return timeLine;
};

const revealProject = (container) => {
  const headerLink = container.querySelector("header a");
  const images = container.querySelectorAll(".image");
  const content = container.querySelectorAll(".content");
  const h1 = container.querySelectorAll("h1");
  const img = container.querySelectorAll("img");
  const hero = container.querySelector(".hero");
  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "power4.out",
    },
  });
  tl.set(hero, { autoAlpha: 1 })
    .from(images, { xPercent: -101, stagger: 0.1 }, 0)
    .from(img, { xPercent: 101, stagger: 0.1 }, 0)
    .from(h1, { xPercent: 70, autoAlpha: 0 }, 0)
    .from(headerLink, { yPercent: 100 }, 0)
    .from(content, { autoAlpha: 0, y: 20 }, 0.2);
  return tl;
};

const leaveFromProject = (container) => {
  const headerLink = container.querySelector("header a");
  const projects = container.querySelectorAll(".image");
  const images = container.querySelectorAll("img");
  const content = container.querySelector(".content");
  const tl = gsap.timeline({
    defaults: {
      duration: 0.4,
      ease: "power1.in",
    },
  });
  tl.to(headerLink, { yPercent: 101 }, 0)
    .to(projects, { xPercent: 100, stagger: 0.05 }, 0)
    .to(content, { autoAlpha: 0, ease: "none" }, 0)
    .to(images, { xPercent: -100, stagger: 0.05 }, 0);
  return tl;
};

const leaveToProject = (container) => {
  const navLinks = container.querySelectorAll("header a");
  const projects = container.querySelectorAll(".image");
  const images = container.querySelectorAll("img");
  const tl = gsap.timeline({
    defaults: {
      duration: 0.4,
      ease: "power1.in",
    },
  });
  tl.to(navLinks, { yPercent: 100, stagger: 0.05 }, 0)
    .to(projects, { xPercent: 101, stagger: 0.05 }, 0)
    .to(images, { xPercent: -101, stagger: 0.05 }, 0);
  return tl;
};

//
const resetActiveLink = () => {
  return gsap.set("a.is-active span", {
    xPercent: -101,
    transformOrigin: "left",
  });
};

// ! BARBA SETUP

barba.init({
  transitions: [
    {
      once(data) {
        resetActiveLink();
        console.log(data, "I AM ONCE");
        gsap.from("header a", {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.3,
          ease: "power1.out",
          onComplete: () => {
            console.log("COMPLETED");
            animationEnter(data.next.container);
          },
        });
      },
      leave: (data) => animationLeave(data.current.container), //! convert into arrow function to wait for leave animation to finish an than play enter animation
      enter(data) {
        animationEnter(data.next.container);
      },
    },
    {
      to: {
        namespace: ["detail-page"],
      },
      once(data) {
        revealProject(data.next.container);
      },
      leave: (data) => leaveToProject(data.current.container),
      enter(data) {
        revealProject(data.next.container);
      },
    },
    {
      from: {
        namespace: ["detail-page"],
      },

      leave: (data) => leaveFromProject(data.current.container),
      enter(data) {
        resetActiveLink();

        gsap.from("header a", {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.3,
          ease: "power1.out",
        });
        animationEnter(data.next.container);
      },
    },
  ],
});
