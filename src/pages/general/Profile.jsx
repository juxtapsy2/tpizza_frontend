import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import { TabProfile } from "../../components/ProfileComponents/TabProfile.jsx";
import { TabTransaction } from "../../components/ProfileComponents/TabTransaction.jsx";
import { TabNotification } from "../../components/ProfileComponents/TabNotification.jsx";
import { TabPolicy } from "../../components/ProfileComponents/TabPolicy.jsx";
import { AccountHeader } from "../../components/ProfileComponents/AccountHeader.jsx";
import { ProfileNavContainer } from "../../components/ProfileComponents/ProfileNavContainer.jsx";
import { useLocation } from "react-router-dom";

const Account = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("#profile");

  // Update active tab based on URL hash changes
  useEffect(() => {
    setActiveTab(location.hash || "#profile");
  }, [location.hash]);

  const isActive = (path) => activeTab === path;

  const renderTabContent = () => {
    const tabs = {
      "#profile": <TabProfile user={user} />, 
      "#transaction": <TabTransaction user={user} />,
      "#notification": <TabNotification />,
      "#policy": <TabPolicy />, // Policy Tab Content
    };
    return tabs[activeTab] || tabs["#profile"]; 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <AccountHeader user={user} />
          <ProfileNavContainer isActive={isActive} /> {/* Navigation for tabs */}
          <div className="bg-white rounded-lg shadow p-8">
            {renderTabContent()} {/* Render the corresponding tab content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
