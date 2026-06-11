import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
  const aboutText = `Hello, I'm Asim!

I'm a self-taught Full stack developer and a Computer Science student based in Lahore, Pakistan.

I specialize in building responsive, user-friendly websites from scratch, transforming ideas into seamless digital experiences. My approach combines technical precision with a strong eye for modern design aesthetics.`;

  const tags = ["Computer Science Student", "Problem Solver", "Design Enthusiast"];
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src="images/Screenshot 2026-06-11 032517.png"
          alt="Anas"
          className="w-md rounded-3xl"
        />
        <div className="flex flex-col gap-8 w-full">
          <AnimatedTextLines text={aboutText} className={"w-full"} />
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="golden-tag"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
