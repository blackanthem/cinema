import "./ScrollRow.scss";
import MovieCard from "../MovieCard/MovieCard";
import ScrollButton from "./ScrollButton";
import { createRef } from "react";
// import scrollReachEnds from "../../utils/scrollReachEnds";

export default function ScrollRow(props) {
  const { children, height, width } = props;

  const ref = createRef();

  async function handleClick(direction) {
    const scrollRow = ref.current;
    const left = direction === "left" ? -700 : 700;

    scrollRow.scrollBy({ left });
  }

  const styles = { gridTemplateRows: height, gridAutoColumns: width };

  return (
    <div className="scroll-row ">
      <ScrollButton direction="left" onClick={() => handleClick("left")} />
      <div className="scroll-row__wrapper" style={{}} ref={ref}>
        {children}
      </div>
      <ScrollButton direction="right" onClick={() => handleClick("right")} />
    </div>
  );
}
