import "./ScrollRow.scss";
import ScrollButton from "./ScrollButton";
import { createRef, useEffect, useState } from "react";
import { end, start } from "../../utils/scrollReachEnds";

export default function ScrollRow(props) {
  const { children } = props;

  const ref = createRef();
  const [hideButtons, setHideButtons] = useState({ left: false, right: false });

  const handleClick = (direction) => {
    const scrollRow = ref.current;
    const left = direction === "left" ? -700 : 700;

    scrollRow.scrollBy({ left });
  };

  const showScrollButtons = ({ target }) => {
    setHideButtons({ left: start(target), right: end(target) });
  };

  useEffect(() => {
    const scrollRow = ref.current;

    showScrollButtons({ target: scrollRow });

    scrollRow.addEventListener("scroll", showScrollButtons);

    return () => scrollRow.removeEventListener("scroll", showScrollButtons);
  });

  return (
    <div className="scroll-row ">
      <ScrollButton
        direction="left"
        onClick={() => handleClick("left")}
        hide={hideButtons.left}
      />
      <div className="scroll-row__wrapper" ref={ref}>
        {children}
      </div>
      <ScrollButton
        direction="right"
        onClick={() => handleClick("right")}
        hide={hideButtons.right}
      />
    </div>
  );
}
