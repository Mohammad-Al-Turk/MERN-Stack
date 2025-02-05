import { Route, Routes } from 'react-router-dom';
import CreatesSpeedy from './components/CreatesSpeedy';
import Speedys from './components/Speedys';
import Details from './components/Details';
import Edit from './components/Edit';

function App() {
  return (
      <Routes>
        <Route path="/create" element={<CreatesSpeedy />} />
        <Route path="/allspeedys" element={<Speedys />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} /> 
      </Routes>
  );
}

export default App;
