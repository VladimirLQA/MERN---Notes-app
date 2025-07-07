import { useTheme } from "../contexts/ThemeContext";

const HomePage = () => {
    const { theme } = useTheme();
    
    return (
        <div 
            className='home-page' 
            id="home-page"
            style={{
                backgroundColor: theme.colors.background,
                minHeight: 'calc(100vh - 64px)',
                transition: 'all 0.3s ease'
            }}
        >
            <div 
                className="app-container"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '24px',
                    textAlign: 'center'
                }}
            >
                <h1 style={{ 
                    color: theme.colors.textPrimary,
                    fontSize: '48px',
                    marginBottom: '16px',
                    fontWeight: 'bold'
                }}>
                    Welcome to Notes App
                </h1>
                <p style={{
                    color: theme.colors.textSecondary,
                    fontSize: '18px',
                    maxWidth: '600px',
                    margin: '0 auto 32px auto',
                    lineHeight: '1.6'
                }}>
                    Organize your thoughts, ideas, and important information with our intuitive notes application. 
                    Create, edit, and manage your notes with ease.
                </p>
                <div style={{
                    backgroundColor: theme.colors.cardBackground,
                    borderRadius: '8px',
                    padding: '32px',
                    boxShadow: theme.colors.shadow,
                    border: `1px solid ${theme.colors.border}`,
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{ 
                        color: theme.colors.textPrimary,
                        marginBottom: '24px'
                    }}>
                        ✨ Features
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        textAlign: 'left'
                    }}>
                        <div>
                            <h3 style={{ color: theme.colors.buttonPrimary }}>📝 Rich Text Notes</h3>
                            <p style={{ color: theme.colors.textSecondary }}>
                                Create detailed notes with rich content and formatting.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ color: theme.colors.buttonPrimary }}>🏷️ Smart Labels</h3>
                            <p style={{ color: theme.colors.textSecondary }}>
                                Organize with predefined or custom labels for easy categorization.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ color: theme.colors.buttonPrimary }}>📌 Pin Important Notes</h3>
                            <p style={{ color: theme.colors.textSecondary }}>
                                Keep your most important notes at the top for quick access.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ color: theme.colors.buttonPrimary }}>🌓 Dark/Light Theme</h3>
                            <p style={{ color: theme.colors.textSecondary }}>
                                Switch between light and dark themes for comfortable viewing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;