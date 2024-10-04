import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import { Login } from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import { Contact } from "./Screens/Contact";
import { About } from "./Screens/About";
import { Voluntarios } from "./Screens/Voluntarios";
import { Beneficiarios } from "./Screens/Beneficiarios";
import { Main } from "./components/Main";
import AtualizarInformacoes from "./Screens/AtualizarInformacoes";
import Registro from "./Screens/RegistroBeneficiario";
import AtualizarInformacoesVisitas from "./Screens/atualizarInformacoesVisitas";
import VisualizarInfo from "./Screens/VisualizarInfo";
import RegistroVisita from "./Screens/RegistroVisita";
import { useState } from "react";
import  Forms  from "./Screens/Forms"

function App() {
   const [user, setUser] = useState<string | null>(null); // Estado para armazenar o usuário logado

  // Função de logout
  const handleLogout = () => {
    setUser(null); // Limpa o estado do usuário
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Main />} />
          <Route path="contatos" element={<Contact />} />
          <Route path="sobre" element={<About />} />
          <Route path="voluntarios" element={<Voluntarios />} />
          <Route path="beneficiarios"  element={<Forms />} />
          <Route path="/dashboard/beneficiarios" element={user ? <Beneficiarios /> : <Navigate to="/login" />}  />
          <Route path="/dashboard/atualizar/:familiaId" element={user ? <AtualizarInformacoes/> : <Navigate to="/login" />} />
          <Route path="/dashboard/registro" element={user ? <Registro /> : <Navigate to="/login" />} />
          <Route path="/dashboard/visitas/:id" element={user ? <AtualizarInformacoesVisitas /> : <Navigate to="/login" />} />
          <Route path="/dashboard/visualizar" element={user ? <VisualizarInfo /> : <Navigate to="/login" />} />
          <Route path="/dashboard/registroVisita" element={user ? <RegistroVisita /> : <Navigate to="/login" />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" /> } />
      </Routes>
    </Router>
  );
}

export default App;
