import Theme from "./theme";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <p className="text-xl font-bold">strou</p>
      <Theme />
    </header>
  );
}
