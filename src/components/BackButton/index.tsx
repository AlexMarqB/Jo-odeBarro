import { BiArrowBack } from "react-icons/bi";
import { useAuth } from "../../contexts/loginContext";


export const BackButton = (route: string) => {
  const {navigate} = useAuth();

  return (
    <div className="d-flex justify-content-start mb-3 m-3 back-button">
      <BiArrowBack onClick={() => navigate(route)} size={32} />
    </div>
  );
};
