import Button from "../../components/Button/Button";

export default function Home() {
  function df() {
    console.log("dfasdf");
  }

  return (
    <div>
      <Button text="get tickets" onClick={() => df()} />
    </div>
  );
}
