"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
}

const SectionTitle = ({ title }: Props) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const recalc = () => {
    if (!titleRef.current) return;
    const el = titleRef.current;
    setState({
      width: el.offsetWidth,
      height: el.offsetHeight,
      left: el.offsetLeft,
    });
  };

  const [state, setState] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  useEffect(() => {
    recalc(); // محاسبه اولیه

    window.addEventListener("resize", recalc);

    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <div className="relative my-4">
      <div className="flex justify-center">
        <h3
          ref={titleRef}
          className="inline z-20 text-2xl text-center font-semibold"
        >
          {title}
        </h3>
      </div>

      <Image
        src="/svg/landing/line.svg"
        alt="line"
        width={state.width * 2}
        height={state.height * 2}
        className="absolute z-10 bottom-1"
        style={{ left: state.left - 10 }}
      />
    </div>
  );
};

export default SectionTitle;
