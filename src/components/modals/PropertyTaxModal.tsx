import React, { useState } from 'react';

interface PropertyTaxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const PropertyTaxModal: React.FC<PropertyTaxModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isPaying, setIsPaying] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      onSuccess('Property Tax ₹4,250 paid successfully! Receipt #HR-TAX-9821 generated.');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[24px]">
              account_balance
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d] leading-tight">
                Government Property Tax Due
              </h3>
              <p className="text-[11px] text-[#3f4944]">
                Department of Town & Country Planning, Haryana
              </p>
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

        {/* Challan Card */}
        <div className="p-3 rounded-xl bg-[#f0f3ff] border border-[#bec9c2]/30 flex flex-col gap-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#bec9c2]/30">
            <span className="text-[#3f4944]">Challan ID:</span>
            <span className="font-mono font-bold text-[#111c2d]">HR-SO-2024-8841</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#3f4944]">Parcel:</span>
            <span className="font-semibold text-[#111c2d]">Sohna Valley Farmland (Khasra 142/12)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#3f4944]">Assessed Acreage:</span>
            <span className="font-semibold text-[#111c2d]">4.5 Acres (Alluvial Agri)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#3f4944]">Assessment Year:</span>
            <span className="font-semibold text-[#111c2d]">FY 2024-2025</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-[#bec9c2]/30 text-sm">
            <span className="font-bold text-[#111c2d]">Total Payable:</span>
            <span className="font-extrabold text-[#9b4500]">₹ 4,250</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-[#ffdbca]/40 text-[#763300] rounded-lg text-[11px]">
          <span className="material-symbols-outlined text-[16px]">alarm</span>
          <span>Due in 24 days. No late interest penalty applied.</span>
        </div>

        <button
          className="w-full py-3 rounded-lg bg-[#9b4500] hover:bg-[#682c00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          onClick={handlePay}
          disabled={isPaying}
          type="button"
        >
          {isPaying ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span>Processing Treasury Gateway...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Pay ₹4,250 via Haryana e-GRAS Gateway</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
