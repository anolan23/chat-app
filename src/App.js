import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Home from './pages/index';
import Login from './pages/login';
import User from './pages/users';
import EditProfile from './pages/users/edit';
import Navbar from './components/Navbar';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PageLayout />}>
          <Route path="/users/:id" element={<User />}>
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
