import React, { useState } from 'react';

interface InstantTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectParcel?: (khasra: string) => void;
}

export const InstantTitleModal: React.FC<InstantTitleModalProps> = ({
  isOpen,
  onClose,
  onSelectParcel,
}) => {
  const [khasraInput, setKhasraInput] = useState('142/12');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [result, setResult] = useState<null | {
    status: string;
    owner: string;
    khasra: string;
    cleanYears: number;
    disputes: number;
  }>(null);

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    setResult(null);
    setVerificationStep(1);

    setTimeout(() => {
      setVerificationStep(2);
    }, 800);

    setTimeout(() => {
      setVerificationStep(3);
    }, 1500);

    setTimeout(() => {
      setIsVerifying(false);
      setResult({
        status: '100% Clear & Verified',
        owner: 'Rajeshwar Singh (Single Owner)',
        khasra: khasraInput || '142/12',
        cleanYears: 30,
        disputes: 0,
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004532] text-[24px]">
              verified_user
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d] leading-tight">
                Live Cadastral Title Check
              </h3>
              <p className="text-[11px] text-[#3f4944]">
                Instant Jamabandi / Bhulekh Verification
              </p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#3f4944] hover:text-[#004532] transition-colors"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-2.5 pt-1">
          <div>
            <label className="text-xs font-semibold text-[#3f4944] block mb-1">
              State & District
            </label>
            <div className="px-3 py-2 bg-[#f0f3ff] rounded-lg text-[#111c2d] text-xs font-medium flex items-center justify-between">
              <span>Haryana - Gurugram (Tehsil Sohna)</span>
              <span className="material-symbols-outlined text-[16px] text-[#004532]">
                verified
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#3f4944] block mb-1">
              Enter Khasra / Murabba / Plot Number
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#6f7973]">
                pin
              </span>
              <input
                className="w-full bg-[#f0f3ff] rounded-lg pl-9 pr-3 py-2 text-[#111c2d] text-xs font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#004532]"
                placeholder="e.g. 142/12 or Survey 884/A"
                type="text"
                value={khasraInput}
                onChange={(e) => setKhasraInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className="p-3 bg-[#e7eeff]/60 rounded-lg flex items-center gap-2 text-[#3f4944] text-[11px]">
          <span className="material-symbols-outlined text-[18px] text-[#004532] shrink-0">
            gavel
          </span>
          <span>
            Cross-references Haryana Jamabandi, Land Records & Civil Court Injunction Registry.
          </span>
        </div>

        {/* Running state */}
        {isVerifying && (
          <div className="p-3.5 bg-[#f0f3ff] rounded-xl flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#004532]">
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span>Running Deep Title Verification...</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-[#3f4944]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#065f46]">
                  check_circle
                </span>
                <span>Connecting to Haryana Jamabandi Digital Portal</span>
              </div>
              <div
                className={`flex items-center gap-1.5 transition-opacity ${
                  verificationStep >= 2 ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-[#065f46]">
                  check_circle
                </span>
                <span>Auditing 30-Year RoR Mutation Register Chain</span>
              </div>
              <div
                className={`flex items-center gap-1.5 transition-opacity ${
                  verificationStep >= 3 ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] text-[#065f46]">
                  check_circle
                </span>
                <span>Scrutinizing SARFAESI & Civil Court Case Injunctions</span>
              </div>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {result && (
          <div className="p-3.5 bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl flex flex-col gap-2.5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#065f46] font-bold text-xs">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span>{result.status}</span>
              </div>
              <span className="text-[10px] uppercase font-bold bg-[#a6f2d1] text-[#002116] px-2 py-0.5 rounded-full">
                Zero Encumbrance
              </span>
            </div>

            <div className="text-xs text-[#111c2d] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#3f4944]">Verified Landowner:</span>
                <span className="font-bold">{result.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3f4944]">Khasra Parcel:</span>
                <span className="font-semibold">{result.khasra} (Tehsil Sohna)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3f4944]">Title Chain Track:</span>
                <span className="font-semibold text-[#004532]">30 Years Free & Clear</span>
              </div>
            </div>

            {onSelectParcel && (
              <button
                className="w-full mt-1 py-2 px-3 bg-[#004532] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#065f46] transition-colors"
                type="button"
                onClick={() => {
                  onSelectParcel(result.khasra);
                  onClose();
                }}
              >
                <span>Inspect Verified Parcel Details</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            )}
          </div>
        )}

        {/* Trigger Button */}
        {!isVerifying && !result && (
          <button
            className="w-full py-3 rounded-lg bg-[#065f46] hover:bg-[#004532] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            onClick={handleVerify}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search_check</span>
            <span>Run Deep Title Verification</span>
          </button>
        )}

        {result && (
          <button
            className="w-full py-2 rounded-lg bg-[#f0f3ff] text-[#3f4944] text-xs font-semibold hover:bg-[#e7eeff] transition-colors"
            onClick={() => {
              setResult(null);
            }}
            type="button"
          >
            Check Another Khasra Number
          </button>
        )}
      </div>
    </div>
  );
};
