import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './pages/signup';
import Home from './pages/index';
import Login from './pages/login';
import User from './pages/users';
import EditUser from './pages/users/edit';
import PageLayout from './components/PageLayout';
import useStore from './context';

function App() {
  const { user } = useStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PageLayout user={user} />}>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/:id/edit" element={<EditUser user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
