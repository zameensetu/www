import React, { useState } from 'react';

interface DroneInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const DroneInspectionModal: React.FC<DroneInspectionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedDroneType, setSelectedDroneType] = useState('dgps');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess('DGPS Drone & Revenue Patwari demarcation inspection booked for this Friday!');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[24px]">
              engineering
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d] leading-tight">
                Book Boundary Demarcation
              </h3>
              <p className="text-[11px] text-[#3f4944]">
                DGPS Drone & Revenue Patwari Joint Survey
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

        {/* Survey Type Options */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedDroneType('dgps')}
            className={`w-full p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
              selectedDroneType === 'dgps'
                ? 'border-[#065f46] bg-[#ecfdf5] shadow-xs'
                : 'border-[#bec9c2]/40 bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[#065f46] text-[22px] shrink-0 mt-0.5">
              flight
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-[#111c2d]">
                  High-Precision RTK-DGPS Drone Survey
                </span>
                <span className="font-bold text-xs text-[#065f46]">₹12,500</span>
              </div>
              <p className="text-[11px] text-[#3f4944] mt-0.5">
                Sub-centimeter contour orthomosaic map, boundary corner pillars geo-tagging, official CAD shapefiles.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedDroneType('patwari')}
            className={`w-full p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
              selectedDroneType === 'patwari'
                ? 'border-[#065f46] bg-[#ecfdf5] shadow-xs'
                : 'border-[#bec9c2]/40 bg-[#f0f3ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[#9b4500] text-[22px] shrink-0 mt-0.5">
              gavel
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-[#111c2d]">
                  Revenue Patwari Legal Nishandehi
                </span>
                <span className="font-bold text-xs text-[#9b4500]">₹18,000</span>
              </div>
              <p className="text-[11px] text-[#3f4944] mt-0.5">
                Official Revenue Department on-site presence, Aks-Shajra chain measurement, certified demarcation seal.
              </p>
            </div>
          </button>
        </div>

        <button
          className="w-full py-3 rounded-lg bg-[#9b4500] hover:bg-[#682c00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
          onClick={handleSubmit}
          disabled={isSubmitting}
          type="button"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span>Scheduling Field Team...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span>Confirm Demarcation Survey Slot</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
