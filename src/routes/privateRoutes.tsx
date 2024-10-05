import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/loginContext";
import { Beneficiarios } from "../Screens/Beneficiarios";
import AtualizarInformacoes from "../Screens/AtualizarInformacoes";
import Registro from "../Screens/RegistroBeneficiario";
import AtualizarInformacoesVisitas from "../Screens/atualizarInformacoesVisitas";
import VisualizarInfo from "../Screens/VisualizarInfo";
import RegistroVisita from "../Screens/RegistroVisita";
import DashboardPage from "../Screens/Dashboard";
import { useEffect } from "react";

export function PrivateRoutes() {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        verifyLogin();
    }, [user, location.pathname]);

    const verifyLogin = async () => {

        if(user && user.role !== 'BENEFICIARIO') {
            navigate('/dashboard');
        }

        if(user && user.role === 'BENEFICIARIO') {
            navigate('/');
        }

        if(!user && location.pathname.includes("dashboard")) {
            navigate('/');
        }

    };

    return (
        <Routes>
            <Route path="/dashboard/beneficiarios" element={<Beneficiarios />} />
            <Route path="/dashboard/atualizar/:familiaId" element={<AtualizarInformacoes />} />
            <Route path="/dashboard/registro" element={<Registro />} />
            <Route path="/dashboard/visitas/:id" element={<AtualizarInformacoesVisitas />} />
            <Route path="/dashboard/visualizar" element={<VisualizarInfo />} />
            <Route path="/dashboard/registroVisita" element={<RegistroVisita />} />
            <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
    );
}
