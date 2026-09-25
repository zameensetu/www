import React from 'react';
import { BRAND_ASSETS } from '../../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <h3 className="text-base font-bold text-[#111c2d]">Verified Landowner Profile</h3>
          <button
            className="w-8 h-8 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#3f4944] hover:text-[#004532]"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f0f3ff]">
          <img
            src={BRAND_ASSETS.userProfile}
            alt="Profile Avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#065f46]"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-[#111c2d]">Amanbir Vashisth</span>
              <span
                className="material-symbols-outlined text-[#004532] text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="text-[11px] text-[#3f4944]">Institutional Land Investor • Gurugram</p>
            <span className="inline-block mt-1 text-[10px] bg-[#97f5cc] text-[#002115] font-bold px-2 py-0.5 rounded-full">
              DigiLocker KYC Verified
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-[#e7eeff]">
            <span className="text-xs font-bold text-[#004532] block">12.8 Ac</span>
            <span className="text-[10px] text-[#3f4944]">Holdings</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#e7eeff]">
            <span className="text-xs font-bold text-[#004532] block">₹14.80 Cr</span>
            <span className="text-[10px] text-[#3f4944]">Portfolio</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#e7eeff]">
            <span className="text-xs font-bold text-[#9b4500] block">3 Parcels</span>
            <span className="text-[10px] text-[#3f4944]">Active</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-1 text-xs">
          <button
            className="w-full text-left p-2.5 rounded-lg hover:bg-[#f0f3ff] flex items-center justify-between transition-colors"
            onClick={() => {
              showToast('Synced with Haryana Antyodaya & Jamabandi');
              onClose();
            }}
            type="button"
          >
            <div className="flex items-center gap-2 text-[#111c2d]">
              <span className="material-symbols-outlined text-[18px] text-[#004532]">sync</span>
              <span>Sync with Haryana Revenue Portal</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#6f7973]">
              chevron_right
            </span>
          </button>

          <button
            className="w-full text-left p-2.5 rounded-lg hover:bg-[#f0f3ff] flex items-center justify-between transition-colors"
            onClick={() => {
              showToast('Security & biometric PIN enabled');
              onClose();
            }}
            type="button"
          >
            <div className="flex items-center gap-2 text-[#111c2d]">
              <span className="material-symbols-outlined text-[18px] text-[#004532]">security</span>
              <span>Security & Escrow PIN</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#6f7973]">
              chevron_right
            </span>
          </button>
        </div>

        <button
          className="w-full py-2.5 rounded-lg bg-[#f0f3ff] text-[#ba1a1a] text-xs font-bold hover:bg-[#ffdad6] transition-colors"
          onClick={() => {
            showToast('Account switched to demo mode');
            onClose();
          }}
          type="button"
        >
          Switch Account / Log Out
        </button>
      </div>
    </div>
  );
};
