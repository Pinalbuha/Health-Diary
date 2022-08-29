import Header from "./components/Header";
import GlobalStyles from './components/GlobalStyles';
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <GlobalStyles />
        <Header />
        <Home />
    </div>
  );
}

export default App;
