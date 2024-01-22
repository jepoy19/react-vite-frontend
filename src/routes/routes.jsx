import CreateItem from "../pages/CreateItem";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import PrivateRoutes from "../components/PrivateRoutes";
import Register from "../pages/login/Register";
import { PageNotFound } from "../pages/PageNotFound";

 
const RoutesConfig = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/create" element={<CreateItem />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />}/>
      </Route>
      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  );
};
export default RoutesConfig;
