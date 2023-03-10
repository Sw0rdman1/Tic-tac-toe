import "./App.css";
import MainScreen from "./components/MainScreen";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <MainScreen />
    </AppProvider>
  );
}

export default App;
