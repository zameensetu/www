import React, { useState } from 'react';
import { LandParcel } from '../../types';

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: LandParcel;
  onSuccess: (msg: string) => void;
}

export const BookVisitModal: React.FC<BookVisitModalProps> = ({
  isOpen,
  onClose,
  parcel,
  onSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:30 AM');
  const [needPickup, setNeedPickup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const dates = [
    'Today, 4:00 PM',
    'Tomorrow, 10:30 AM',
    'Tomorrow, 3:30 PM',
    'This Saturday, 11:00 AM',
    'This Sunday, 10:00 AM',
  ];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(`Site visit booked for ${selectedDate} with field officer Devender Sharma`);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004532] text-[24px]">
              calendar_month
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d] leading-tight">
                Schedule Field Site Visit
              </h3>
              <p className="text-[11px] text-[#3f4944] truncate max-w-[240px]">
                {parcel.title}
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

        {/* Parcel mini info */}
        <div className="p-2.5 rounded-xl bg-[#f0f3ff] flex items-center gap-2.5">
          <img
            src={parcel.imageUrl}
            alt={parcel.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#111c2d] truncate">{parcel.location}</div>
            <div className="text-[11px] text-[#004532] font-semibold">
              Khasra #{parcel.khasraNo} • {parcel.acres} Acres
            </div>
          </div>
        </div>

        {/* Select Date slot */}
        <div>
          <label className="text-xs font-semibold text-[#3f4944] block mb-1.5">
            Select Inspection Time Slot
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {dates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDate(d)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                  selectedDate === d
                    ? 'bg-[#065f46] text-white font-bold shadow-sm'
                    : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#e7eeff]'
                }`}
              >
                <span>{d}</span>
                {selectedDate === d && (
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Assigned Officer */}
        <div className="p-2.5 rounded-xl bg-[#e7eeff]/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004532] text-[20px]">
              badge
            </span>
            <div>
              <div className="text-xs font-bold text-[#111c2d]">Devender Sharma</div>
              <div className="text-[11px] text-[#3f4944]">Lead Land Valuer & Patwari Liaison</div>
            </div>
          </div>
          <span className="text-[10px] bg-[#a6f2d1] text-[#002116] px-2 py-0.5 rounded-full font-bold">
            Assigned
          </span>
        </div>

        {/* Pickup checkbox */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#3f4944]">
          <input
            type="checkbox"
            checked={needPickup}
            onChange={(e) => setNeedPickup(e.target.checked)}
            className="w-4 h-4 rounded text-[#004532] accent-[#004532]"
          />
          <span>Request field vehicle pickup from Kherki Daula / Sohna Toll</span>
        </label>

        {/* Submit button */}
        <button
          className="w-full py-3 rounded-lg bg-[#004532] hover:bg-[#065f46] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
          onClick={handleConfirm}
          disabled={isSubmitting}
          type="button"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
              <span>Confirming Site Slot...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Confirm Free Site Visit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
