import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import ViewItem from "./pages/ViewItem";
import EditItem from "./pages/EditItem";

import './App.css'
function App() {

    return (    
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/AddItem" element={<CreateItem />} />
                    <Route path="/items/:itemId" element={<ViewItem />} />
                    <Route path="/items/:itemId/edit" element={<EditItem />} />
                </Route>

            </Routes>
        </Router>
    )

}

export default App;