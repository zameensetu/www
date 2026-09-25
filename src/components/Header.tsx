import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onLocationClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onLocationClick,
  onNotificationClick,
  onProfileClick,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Gurugram, HR / NCR');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const getSubtitle = () => {
    switch (activeTab) {
      case 'explore':
        return 'Explore';
      case 'details':
        return 'Details';
      case 'list-land':
        return 'List Land';
      case 'my-land':
        return 'My Land';
      default:
        return 'Explore';
    }
  };

  const locations = [
    'Gurugram, HR / NCR',
    'Sohna Belt, HR',
    'IMT Manesar, HR',
    'Rewari Hub, HR',
    'Noida / Greater Noida, UP',
    'Faridabad, HR',
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between gap-1">
        {/* Logo and Location */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <img
            alt="ZameenSetu Brand Logo"
            className="h-8 w-auto object-contain shrink-0 cursor-pointer"
            src={BRAND_ASSETS.logo}
          />

          <div className="relative flex items-center gap-1 overflow-visible">
            <button
              className="flex items-center gap-1 px-1 py-1 rounded text-left group min-w-0 hover:bg-[#e7eeff]/60 transition-colors"
              type="button"
              onClick={() => {
                setShowLocationMenu(!showLocationMenu);
                if (onLocationClick) onLocationClick();
              }}
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 text-[#004532] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[15px]">near_me</span>
                  <span className="truncate text-xs font-semibold text-[#111c2d] max-w-[130px] sm:max-w-[170px]">
                    {selectedLocation}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#6f7973] transition-transform group-hover:translate-y-0.5">
                    expand_more
                  </span>
                </div>
                <span className="text-[11px] text-[#3f4944] truncate font-medium">
                  {getSubtitle()}
                </span>
              </div>
            </button>

            {/* Dropdown for location */}
            {showLocationMenu && (
              <div className="absolute top-12 left-0 w-56 bg-white rounded-xl shadow-xl border border-[#bec9c2]/40 py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#6f7973] uppercase tracking-wider">
                  Select Cadastral Zone
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#f0f3ff] transition-colors ${
                      selectedLocation === loc
                        ? 'text-[#004532] font-bold bg-[#e7eeff]/40'
                        : 'text-[#111c2d]'
                    }`}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationMenu(false);
                    }}
                  >
                    <span>{loc}</span>
                    {selectedLocation === loc && (
                      <span className="material-symbols-outlined text-[16px] text-[#004532]">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons: Notification & Profile */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Notifications"
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#3f4944] hover:text-[#004532] hover:bg-[#f0f3ff] transition-colors"
            type="button"
            onClick={onNotificationClick}
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#fd8a42]"></span>
          </button>

          <button
            aria-label="User Profile"
            className="w-11 h-11 flex items-center justify-center rounded-full active:scale-95 transition-transform"
            type="button"
            onClick={onProfileClick}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_3px_0_rgba(15,23,42,0.1)] ring-2 ring-[#004532]/20"
              src={BRAND_ASSETS.userProfile}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
