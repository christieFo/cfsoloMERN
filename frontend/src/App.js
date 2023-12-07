// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import TextPage from './pages/TextPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingPage';

function App() 
{
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/text" index element={<TextPage />} />
      <Route path="/" index element={<LoginPage />} />
      <Route path="/signUp" index element={<SignUpPage />} />
      <Route path="/viewWorks" index element={<SettingsPage />} />
    </Routes>
  </BrowserRouter>

    // <LoginPage />
    // <CardPage />
  );
}

export default App;

//old default code
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
