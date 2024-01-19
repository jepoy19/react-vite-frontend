import CreateItem from "../pages/CreateItem";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/login/Register";
import Login from "../pages/login/Login";
import PrivateRoutes from "../components/PrivateRoutes";
import RegisterTest from "../pages/RegisterTest";
 
const RoutesConfig = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />}/>
      <Route path="/create" element={<CreateItem />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />}/>
      </Route>
      <Route path="/test" element={<RegisterTest />} />

    </Routes>
  );
};

export default RoutesConfig;
