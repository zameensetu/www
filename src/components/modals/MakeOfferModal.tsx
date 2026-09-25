import React, { useState } from 'react';
import { LandParcel } from '../../types';

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: LandParcel;
  onSuccess: (msg: string) => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  isOpen,
  onClose,
  parcel,
  onSuccess,
}) => {
  const [offerPerAcre, setOfferPerAcre] = useState('14000000'); // 1.40 Cr
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const numOffer = parseFloat(offerPerAcre) || 0;
  const totalOfferVal = (numOffer * parcel.acres) / 10000000;
  const tokenAmount = (numOffer * parcel.acres * 0.01) / 100000; // 1% in Lakhs

  const handleDeposit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(`Offer of ₹${totalOfferVal.toFixed(2)} Cr submitted with ₹${tokenAmount.toFixed(1)}L token hold into Escrow.`);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#065f46] text-[24px]">
              lock
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d] leading-tight">
                Secure Escrow Token Offer
              </h3>
              <p className="text-[11px] text-[#3f4944]">
                100% Legal Protection by ZameenSetu Escrow
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

        {/* Parcel summary */}
        <div className="p-2.5 rounded-lg bg-[#f0f3ff] flex justify-between items-center text-xs">
          <div>
            <span className="text-[#3f4944] block">Asking Price:</span>
            <span className="font-bold text-[#111c2d]">{parcel.pricePerUnit} {parcel.unit}</span>
          </div>
          <div className="text-right">
            <span className="text-[#3f4944] block">Acreage:</span>
            <span className="font-bold text-[#004532]">{parcel.acres} Acres</span>
          </div>
        </div>

        {/* Offer Input */}
        <div>
          <label className="text-xs font-semibold text-[#3f4944] block mb-1">
            Your Proposed Offer Price per Acre
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-bold text-[#004532]">₹</span>
            <input
              type="number"
              className="w-full bg-[#f0f3ff] text-base font-bold text-[#111c2d] rounded-lg pl-8 pr-16 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#004532]"
              value={offerPerAcre}
              onChange={(e) => setOfferPerAcre(e.target.value)}
            />
            <span className="absolute right-3 text-xs font-medium text-[#3f4944]">/ Acre</span>
          </div>
        </div>

        {/* Calculation Strip */}
        <div className="p-3 rounded-xl bg-[#065f46] text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] opacity-80 block">Calculated Total Deal Offer</span>
            <span className="text-lg font-bold text-[#97f5cc]">
              ₹ {totalOfferVal.toFixed(2)} Crore
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] opacity-80 block">1% Escrow Token Hold</span>
            <span className="text-sm font-bold text-[#ffdbca]">
              ₹ {tokenAmount.toFixed(2)} Lakh
            </span>
          </div>
        </div>

        {/* Guarantee badge */}
        <div className="p-2.5 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] flex items-start gap-2 text-[11px] text-[#002116]">
          <span className="material-symbols-outlined text-[16px] text-[#065f46] shrink-0 mt-0.5">
            security
          </span>
          <span>
            <strong>Bank-Grade Escrow:</strong> Your token deposit is held securely in an RBI-compliant escrow account and is 100% refundable if title checks or demarcation fail.
          </span>
        </div>

        <button
          className="w-full py-3 rounded-lg bg-[#004532] hover:bg-[#065f46] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
          onClick={handleDeposit}
          disabled={isSubmitting}
          type="button"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span>Submitting to Seller Escrow...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">lock_clock</span>
              <span>Deposit Escrow Token & Submit Offer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
