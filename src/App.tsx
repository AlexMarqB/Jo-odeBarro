import {
	BrowserRouter as Router,
} from "react-router-dom";
import { PrivateRoutes } from "./routes/privateRoutes";
import { PublicRoutes } from "./routes/publicRoutes";

function App() {

	return (
			<Router>
				<PrivateRoutes />
        <PublicRoutes />
			</Router>
	);
}

export default App;
