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

  const sidebarWidth = 300;

  const layoutStyle = {
    marginLeft: collapsed ? `auto` : `22em`,
    width: collapsed ? `90%` : `78%`,
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

          <div className="content bg-red-300" style={layoutStyle}>
            <ScrollToTop />
            <main className="bg-blue-200">{children}</main>
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
