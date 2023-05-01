import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/index";
import LoginPage from "./pages/Login/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes path='/'>
        <Route index element={<HomePage />}/>
        <Route path='login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
