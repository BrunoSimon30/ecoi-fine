import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  const logoWrapRef = useRef(null);
  const logoInnerRef = useRef(null);
  const logoLineRef = useRef(null);
  const signInRef = useRef(null); // 🔸 New ref for Sign In

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      logoWrapRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        logoInnerRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "+=0.2"
      )
      .fromTo(
        logoLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "+=0.2"
      )
      .fromTo(
        signInRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "+=0.3"
      );
  }, []);

  return (
    <section className="main-bg">
      <div className="h-screen flex items-center justify-center">
        <div className="space-y-24">
          <div
            ref={logoWrapRef}
            className="sloo-wrp w-[340px] h-[340px] bg-[#DDEDE4] p-5 rounded-full relative mb-40"
          >
            <img
              ref={logoLineRef}
              src="/img/loadi.png"
              alt="Logo"
              className="logo-line absolute -top-25 z-10 left-0 right-0 m-auto"
            />
            <div
              ref={logoInnerRef}
              className="s-logo bg-white w-[300px] h-[300px] flex items-center justify-center rounded-full relative"
            >
              <Image
                src="/img/s-logo.svg"
                alt="Logo"
                width={222}
                height={84}
                className="logo"
              />
            </div>
          </div>
          <div ref={signInRef}>
            <Link className="btn-a" href={"/sign-in"}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
