import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(15,23,42,0.06)] border-t border-[#bec9c2]/20">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {/* Explore */}
        <button
          onClick={() => onChangeTab('explore')}
          className={`group flex flex-col items-center justify-center min-w-[64px] h-full transition-colors ${
            activeTab === 'explore'
              ? 'text-[#004532] font-semibold'
              : 'text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[24px] mb-0.5 group-hover:scale-105 transition-transform ${
              activeTab === 'explore' ? 'font-bold' : ''
            }`}
            style={{ fontVariationSettings: activeTab === 'explore' ? "'FILL' 1" : "'FILL' 0" }}
          >
            travel_explore
          </span>
          <span className="text-[11px] font-medium leading-none">Explore</span>
        </button>

        {/* Details */}
        <button
          onClick={() => onChangeTab('details')}
          className={`group flex flex-col items-center justify-center min-w-[64px] h-full transition-colors ${
            activeTab === 'details'
              ? 'text-[#004532] font-semibold'
              : 'text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[24px] mb-0.5 group-hover:scale-105 transition-transform`}
            style={{ fontVariationSettings: activeTab === 'details' ? "'FILL' 1" : "'FILL' 0" }}
          >
            verified_user
          </span>
          <span className="text-[11px] font-medium leading-none">Details</span>
        </button>

        {/* List Land (with NEW badge) */}
        <button
          onClick={() => onChangeTab('list-land')}
          className={`group relative flex flex-col items-center justify-center min-w-[68px] h-full transition-colors ${
            activeTab === 'list-land'
              ? 'text-[#004532] font-semibold'
              : 'text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-0.5 transition-all shadow-[0_2px_6px_rgba(6,95,70,0.25)] ${
                activeTab === 'list-land'
                  ? 'bg-[#004532] text-white scale-105'
                  : 'bg-[#065f46] text-white group-hover:bg-[#004532]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
            </div>
            <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#fd8a42] text-white rounded-full text-[9px] uppercase tracking-wider font-extrabold shadow-xs">
              New
            </span>
          </div>
          <span className="text-[11px] font-semibold leading-none">List Land</span>
        </button>

        {/* My Land */}
        <button
          onClick={() => onChangeTab('my-land')}
          className={`group flex flex-col items-center justify-center min-w-[64px] h-full transition-colors ${
            activeTab === 'my-land'
              ? 'text-[#004532] font-semibold'
              : 'text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[24px] mb-0.5 group-hover:scale-105 transition-transform"
            style={{ fontVariationSettings: activeTab === 'my-land' ? "'FILL' 1" : "'FILL' 0" }}
          >
            account_balance
          </span>
          <span className="text-[11px] font-medium leading-none">My Land</span>
        </button>
      </div>
    </nav>
  );
};
