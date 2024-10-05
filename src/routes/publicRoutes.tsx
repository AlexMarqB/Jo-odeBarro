import { Route, Routes } from "react-router-dom";
import LandingPage from "../Screens/LandingPage";
import { Main } from "../components/Main";
import { Contact } from "../Screens/Contact";
import { About } from "../Screens/About";
import { Voluntarios } from "../Screens/Voluntarios";
import Forms from "../Screens/Forms";
import { Login } from "../Screens/Login";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Main />} />
        <Route path="contatos" element={<Contact />} />
        <Route path="sobre" element={<About />} />
        <Route path="voluntarios" element={<Voluntarios />} />
        <Route path="beneficiarios" element={<Forms />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
