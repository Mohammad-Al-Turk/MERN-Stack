
import PersonCard from "./PersonCard";

function App() {
  return (
    <div className="app">
      <h1>Person Cards</h1>
      <PersonCard firstName="John" lastName="Doe" age={28} hairColor="Black" />
      <PersonCard firstName="Jane" lastName="Smith" age={34} hairColor="Blonde" />
      <PersonCard firstName="Bob" lastName="Johnson" age={45} hairColor="Brown" />
      <PersonCard firstName="Alice" lastName="Williams" age={29} hairColor="Red" />
    </div>
  );
}
export default App;
