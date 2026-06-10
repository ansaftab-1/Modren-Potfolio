import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 right-0 z-50 flex flex-col justify-between w-full h-screen px-8 sm:px-12 md:px-16 uppercase bg-black text-white/80 pt-20 pb-12 md:pt-24 md:pb-16 gap-y-10 md:w-1/2 md:left-1/2 overflow-y-auto no-scrollbar"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="cursor-pointer shine-hover shine-bg-hover inline-block px-6 py-1 sm:px-8 sm:py-2 md:px-10 md:py-3 -ml-6 sm:-ml-8 md:-ml-10 my-1 transition-all duration-300"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row mt-auto pt-6 border-t border-white/10"
        >
          <div className="font-light">
            <p className="text-xs tracking-widest text-white/40 uppercase mb-2 font-semibold">
              E-mail
            </p>
            <a
              href="mailto:asim@gmail.com"
              className="inline-block text-lg md:text-xl tracking-wider lowercase text-white hover:text-gold transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              asim@gmail.com
            </a>
          </div>
          <div className="font-light">
            <p className="text-xs tracking-widest text-white/40 uppercase mb-2 font-semibold">
              Social Media
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-sm tracking-widest uppercase text-white hover:text-gold transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
