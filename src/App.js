//styling
import './App.css';

//pages
import Skema from './components/Skema';
import BusAfgang from './components/BusAfgang';
import Kantine from './components/Kantine';
import News from './components/News';

function App() {
  return (
    <div className="App">
        <Skema />
        <BusAfgang />
        <Kantine />
        <News />
    </div>
  );
}

export default App;
