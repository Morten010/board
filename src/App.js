
//styling
import './App.css';


//pages
import Skema from './components/Skema';
import BusAfgang from './components/BusAfgang';
import Kantine from './components/Kantine';

function App() {
  return (
    <div className="App">
        <Skema />
        <BusAfgang />
        <Kantine />
    </div>
  );
}

export default App;
