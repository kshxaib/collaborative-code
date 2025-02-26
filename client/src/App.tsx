import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GitHubCorner from "./components/GitHubCorner";
import Toast from "./components/toast/Toast";
import EditorPage from "./pages/EditorPage";
import HomePage from "./pages/HomePage";
import TeamInfo from "./pages/TeamInfo";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="/team-info" element={<TeamInfo/>} />
                </Routes>
            </Router>
            <Toast />
            <GitHubCorner />
        </>
    );
};

export default App;
