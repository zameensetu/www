import React from 'react';

interface DeedVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleName?: string;
}

export const DeedVaultModal: React.FC<DeedVaultModalProps> = ({
  isOpen,
  onClose,
  titleName = 'jamabandi_sohna_oct2024.pdf',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004532] text-[24px]">
              folder_special
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d] leading-tight">
                Government Land Deed Vault
              </h3>
              <p className="text-[11px] text-[#3f4944]">{titleName}</p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#3f4944] hover:text-[#004532]"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Certificate preview */}
        <div className="border border-[#bec9c2] rounded-xl p-4 bg-[#fcfdfe] relative shadow-inner">
          <div className="flex items-center justify-between border-b border-[#e7eeff] pb-2 mb-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6f7973]">
                Government of Haryana • Revenue Dept
              </div>
              <div className="text-xs font-bold text-[#004532]">
                Record of Rights (Jamabandi / Nakal 2024)
              </div>
            </div>
            <span className="material-symbols-outlined text-[#004532] text-[28px]">
              verified
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-[#111c2d]">
            <div className="flex justify-between">
              <span className="text-[#3f4944]">District / Tehsil:</span>
              <span className="font-semibold">Gurugram / Sohna</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3f4944]">Village / Hadbast No:</span>
              <span className="font-semibold">Dhunela / #108</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3f4944]">Khewat / Khatauni:</span>
              <span className="font-semibold">82 / 114</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3f4944]">Khasra Parcel IDs:</span>
              <span className="font-semibold font-mono text-[#004532]">142//12, 142//13, 143//1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3f4944]">Total Registered Area:</span>
              <span className="font-semibold">36 Kanal 0 Marla (4.50 Acres)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3f4944]">Registered Owner:</span>
              <span className="font-bold">Rajeshwar Singh s/o Ramkishan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#3f4944]">Encumbrance Status:</span>
              <span className="font-bold text-[#065f46]">Nil (Unencumbered)</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#e7eeff] flex items-center justify-between text-[10px] text-[#6f7973]">
            <span>Digital Hash: SHA256: 7f8b9...c31d</span>
            <span className="font-bold text-[#004532]">Patwari Certified</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            className="py-2.5 px-3 rounded-lg bg-[#f0f3ff] text-[#004532] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#e7eeff]"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Deed</span>
          </button>
          <button
            className="py-2.5 px-3 rounded-lg bg-[#004532] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#065f46]"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download PDF (4.2 MB)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
