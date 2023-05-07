
//styling
import './App.css';


//pages
import PraktiskInfo from './components/PraktiskInfo';
import Skema from './components/Skema';
import BusAfgang from './components/BusAfgang';
import InfoBoard from './components/InfoBoard';
import Kantine from './components/Kantine';

function App() {
  return (
    <div className="App">
        <InfoBoard />
        <Skema />
        <BusAfgang />
        <Kantine />
        <PraktiskInfo />
    </div>
  );
}

export default App;
