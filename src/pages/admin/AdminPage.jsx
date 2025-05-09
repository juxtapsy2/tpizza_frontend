import React from 'react';
import { useLocation } from 'react-router-dom';
import TabDashboard from "../../components/AdminTabs/TabDashboard";
import TabManageUser from "../../components/AdminTabs/TabManageUser";
import TabManageOrder from "../../components/AdminTabs/TabManageOrder";
import TabManageMenu from "../../components/AdminTabs/TabManageMenu";

const AdminPage = () => {
  const { hash } = useLocation();
  const activeTab = hash ? hash.slice(1) : 'dashboard';

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TabDashboard />;
      case 'manage-user':
        return <TabManageUser />;
      case 'manage-order':
        return <TabManageOrder />;
      case 'manage-menu':
        return <TabManageMenu />;
      default:
        return <TabDashboard />;
    }
  };

  return renderTab();
};

export default AdminPage;
