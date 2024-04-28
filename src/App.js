
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import Home from './components/Home/Home'
import About from './components/About/About'
import StateWiseData from './components/StateWiseData/StateWiseData'
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/state/:stateCode' element={<StateWiseData/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App