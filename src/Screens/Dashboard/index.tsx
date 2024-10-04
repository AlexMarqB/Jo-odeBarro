import { BiArrowBack } from 'react-icons/bi';
import { GiThreeFriends } from 'react-icons/gi';
import { FaUsers, FaBox, FaMoneyBill, FaCalendarAlt, FaBuilding, FaNewspaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center my-5" style={{ padding: "200px" }}>
      <div className="row justify-content-center">
        <div className="d-flex justify-content-start mb-3 m-3">
          <BiArrowBack
            onClick={() => navigate("/")}
            size={32}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
        <div className="col-12 d-flex justify-content-center">
          <div className="row w-100">
            <DashboardIcon icon={<GiThreeFriends />} label="Voluntários" onClick={() => navigate("/dashboard/voluntarios")} />
            <DashboardIcon icon={<FaUsers />} label="Beneficiários" onClick={() => navigate("/dashboard/beneficiarios")} />
            <DashboardIcon icon={<FaBox />} label="Estoque" onClick={() => navigate("/dashboard/estoque")} />
            <DashboardIcon icon={<FaMoneyBill />} label="Financeiro" onClick={() => navigate("/dashboard/financeiro")} />
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center">
          <div className="row justify-content-center w-100">
            <DashboardIcon icon={<FaCalendarAlt />} label="Eventos" onClick={() => navigate("/dashboard/eventos")} />
            <DashboardIcon icon={<FaBuilding />} label="Obras" onClick={() => navigate("/dashboard/obras")} />
            <DashboardIcon icon={<FaNewspaper />} label="Notícias" onClick={() => navigate("/dashboard/noticias")} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardIcon = ({ icon, label, onClick }: DashboardIconProps) => {
  return (
    <div className="col-12 col-sm-6 col-md-3 mb-3 cursor-pointer">
      <div className="card dashboard-icon p-4 d-flex align-items-center justify-content-center" onClick={onClick}>
        <div className="icon mb-2" style={{ fontSize: "30px" }}>
          {icon}
        </div>
        <span className="font-weight-bold">{label}</span>
      </div>
    </div>
  );
};

interface DashboardIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default DashboardPage;
