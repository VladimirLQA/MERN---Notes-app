import { useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Space, Typography } from 'antd';
import { HomeOutlined, FileTextOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const navItems = [
    { name: 'Home', path: '/', icon: <HomeOutlined /> },
    { name: 'Notes', path: '/notes', icon: <FileTextOutlined /> },
];

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme, isDark } = useTheme();

    const renderNavButtons = () =>
        navItems.map(({ name, path, icon }) => {
            const isActive = location.pathname === path;
            return (
                <Button
                    key={path}
                    type={isActive ? "primary" : "text"}
                    size="middle"
                    icon={icon}
                    onClick={() => navigate(path)}
                    style={{
                        borderColor: isActive ? theme.colors.buttonPrimary : theme.colors.border,
                        color: isActive ? '#fff' : theme.colors.textPrimary,
                    }}
                >
                    {name}
                </Button>
            );
        });

    return (
        <AntHeader 
            style={{ 
                backgroundColor: theme.colors.headerBackground, 
                borderBottom: `1px solid ${theme.colors.border}`,
                boxShadow: theme.colors.shadow,
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                padding: '0 24px',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                display: 'flex', 
                alignItems: 'center', 
                height: '100%'
            }}>
                <Title 
                    level={3} 
                    style={{ 
                        margin: '0 10px 0 0', 
                        color: '#1890ff',
                        fontWeight: 'bold'
                    }}
                >
                    📝 Test App Collection
                </Title>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Space size="middle">
                        {renderNavButtons()}
                    </Space>
                    
                    <Button
                        type="text"
                        size="large"
                        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                        onClick={toggleTheme}
                        style={{
                            color: theme.colors.textPrimary,
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '6px',
                            transition: 'all 0.3s ease'
                        }}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    />
                </div>
            </div>
        </AntHeader>
    );
};

export default Header;