import { Route, Routes } from "react-router-dom";
import NoteList from "./pages/Notes/noteList";
import CreatePage from "./pages/Notes/createPage";
import NoteDetails from "./pages/Notes/noteDetailsPage";
import HomePage from "./pages/homePage";
import Header from "./components/header/header";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";

const AppContent = () => {
    const { theme } = useTheme();
    
    useEffect(() => {
        document.body.style.backgroundColor = theme.colors.background;
        document.body.style.color = theme.colors.textPrimary;
        document.body.style.transition = 'all 0.3s ease';
        
        document.documentElement.style.backgroundColor = theme.colors.background;
    }, [theme]);
    
    return (
        <div 
            className="app" 
            style={{ 
                backgroundColor: theme.colors.background, 
                minHeight: '100vh',
                color: theme.colors.textPrimary,
                transition: 'all 0.3s ease'
            }}
        > 
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes" element={<NoteList />} />
                <Route path="/notes/create" element={<CreatePage />} />
                <Route path="/notes/details/:id" element={<NoteDetails />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;