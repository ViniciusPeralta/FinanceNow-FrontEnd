import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Extract from './pages/extract/Extract';
import Transactions from './pages/transactions/Transactions';
import CompanyList from './pages/companies/list/CompanyList.js';

import userStore from './store/UserStore.ts';

function App() {

  const { name } = userStore();
  
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/'
          element={name === '' ? <Login /> : <Navigate to={`/home/${name}`}/>} />
          <Route path='/register' 
          element={name === '' ? <Register /> : <Navigate to={`/home/${name}`}/>} />
          <Route path='/home/:name' 
          element={name !== '' ? <Home /> : <Navigate to='/'/>} />
          <Route path='/extract/:name' 
          element={name !== '' ? <Extract /> : <Navigate to='/'/>} />
          <Route path='/transactions/:name' 
          element={name !== '' ? <Transactions /> : <Navigate to='/'/>} />
          <Route path='/companies/:name' 
          element={name !== '' ? <CompanyList /> : <Navigate to='/'/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;