import Page from './Pages/Page';
import Page1 from './Pages/Page1';
import ViewPage from './Pages/ViewPage';
import AddPage from './Pages/AddPage';
import DeletePage from './Pages/DeletePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivatePage from './Pages/ActivatePage';
import DeactivatePage from './Pages/DeactivatePage';


function App() {
  return (
    <div>
    <Router>
    <Routes>
      <Route path="/" element={<Page1 />}/>
      <Route path="Page" element={<Page />} />
      <Route path="Page1/:id" element={<Page1 />} />
      <Route path="ViewPage/:id" element={<ViewPage />} />
      <Route path="/AddPage/:id" element={<AddPage />} />
      <Route path="DeletePage/:id" element={<DeletePage />} />
      <Route path="ActivatePage" element={<ActivatePage/>} />
      <Route path="DeactivatePage/:id" element={<DeactivatePage/>} />

    </Routes>
  </Router>
  </div>
  );
}

export default App;
