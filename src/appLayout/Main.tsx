import React, { useState, createContext, useContext, useEffect } from 'react';
import ScrollToTop from './ScrollRestore';
import NavBarProfile from './NavBarProfile';
import SideBar from './Sidebar';
import { Layout } from 'antd';
import '@/styles/globals.css';
import MobileSideBar from './MobileSidebar';
import MobileNavBarProfile from './MobileNavBar';

interface MainLayoutType {
  setShowNav: (value: boolean) => void;
}

const MainLayoutContext = createContext<MainLayoutType | null>(null);

function Main({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedMobile, setCollapsedMobile] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const sidebarWidth = 250;

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const layoutStyle = {
    marginLeft: collapsed ? `auto` : `${sidebarWidth}px`,
    transition: 'margin-left 0.3s',
    backgroundColor: '',
  };

  return (
    <MainLayoutContext.Provider value={null}>
      <Layout className="layout">
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <MobileSideBar
          collapsed={collapsedMobile}
          setCollapsed={setCollapsedMobile}
        />
        <Layout
          className={`main-layout ${isSmallScreen ? 'small-screen' : ''}`}
        >
          <NavBarProfile setCollapsed={setCollapsed} collapsed={collapsed} />
          <MobileNavBarProfile
            setCollapsed={setCollapsedMobile}
            collapsed={collapsedMobile}
          />
          <div className="content" style={layoutStyle}>
            <ScrollToTop />
            <main>{children}</main>
          </div>
        </Layout>
      </Layout>
    </MainLayoutContext.Provider>
  );
}

export const useMainLayout = () => {
  const context = useContext<MainLayoutType | null>(MainLayoutContext);

  if (!context) {
    throw new Error('useMainLayout must be used within a MainLayoutProvider');
  }

  return context;
};

export default Main;
