import { Route, Routes } from "react-router";
import HomePage from "./pages/Notes/homePage";
import CreatePage from "./pages/Notes/createPage";
import DetailsPage from "./pages/Notes/detailsPage";

const App = () => {
    return (
        <div data-theme="light">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<HomePage />} />
                <Route path="/notes/create" element={<CreatePage />} />
                <Route path="/notes/details/:id" element={<DetailsPage />} />
            </Routes>
        </div>
    );
};

export default App;