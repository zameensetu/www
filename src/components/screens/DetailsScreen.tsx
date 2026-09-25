import React, { useState } from 'react';
import { BRAND_ASSETS, EXPLORE_PARCELS } from '../../data/mockData';
import { LandParcel } from '../../types';

interface DetailsScreenProps {
  parcel?: LandParcel;
  onBookVisit: (parcel: LandParcel) => void;
  onMakeOffer: (parcel: LandParcel) => void;
  onOpenDeedVault: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  parcel = EXPLORE_PARCELS[0],
  onBookVisit,
  onMakeOffer,
  onOpenDeedVault,
  showToast,
}) => {
  const [mapMode, setMapMode] = useState<'satellite' | 'drone' | 'road'>('satellite');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: parcel.title,
          text: `Check out this verified parcel on ZameenSetu: ${parcel.location}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Parcel dossier link copied to clipboard', 'content_copy');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showToast(
      !isBookmarked ? 'Added to Saved Parcels' : 'Removed from Saved',
      !isBookmarked ? 'bookmark' : 'bookmark_border'
    );
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto">
      {/* Top Breadcrumb & Share/Save */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dee8ff] text-[#004532] text-xs font-semibold shadow-xs">
          <span
            className="material-symbols-outlined text-[15px] text-[#004532]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span>Khasra #{parcel.khasraNo}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            aria-label="Share listing"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#3f4944] shadow-xs active:scale-95 transition-transform hover:bg-[#f0f3ff]"
            onClick={handleShare}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>

          <button
            aria-label="Bookmark listing"
            className={`w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-xs active:scale-95 transition-transform hover:bg-[#f0f3ff] ${
              isBookmarked ? 'text-[#9b4500]' : 'text-[#3f4944]'
            }`}
            onClick={toggleBookmark}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>
      </div>

      {/* Main Title & Location */}
      <section className="px-4 py-1 flex flex-col gap-1.5">
        <h1 className="text-xl font-bold text-[#111c2d] tracking-tight leading-snug">
          {parcel.acres} Acres Premium Farmland & Agri-Investment Plot
        </h1>

        <div className="flex items-center gap-1 text-[#3f4944] text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#9b4500]">
            location_on
          </span>
          <span className="truncate">Village Dhunela, Sohna, Gurugram NCR (Pin: 122103)</span>
        </div>

        {/* Price Card */}
        <div className="mt-2 p-3.5 rounded-xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#004532] tracking-tight">
                {parcel.pricePerUnit}
              </span>
              <span className="text-xs text-[#3f4944]">{parcel.unit}</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdbca] text-[#763300] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px]">handshake</span>
              <span>Negotiable</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[#3f4944] text-xs pt-1 border-t border-[#f0f3ff]">
            <span>
              Total Deal Value:{' '}
              <strong className="text-xs font-bold text-[#111c2d]">{parcel.totalValue}</strong>
            </span>
            <span className="text-[11px] text-[#6f7973]">Circle Rate: {parcel.circleRate || '₹88L / Ac'}</span>
          </div>
        </div>
      </section>

      {/* Geo-Tagged Cadastral Cadre Map Viewport */}
      <section className="px-4 py-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#004532]">
              satellite_alt
            </span>
            <span className="text-xs font-bold text-[#111c2d]">
              Geo-Tagged Cadastral Cadre
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#004532] text-[11px] font-semibold">
            Perimeter: {parcel.perimeter || '820m'}
          </span>
        </div>

        {/* Map Viewport Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-[#263143] aspect-[4/3] border border-[#bec9c2]/30">
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 ${
              mapMode === 'road' ? 'hue-rotate-15 contrast-125' : mapMode === 'drone' ? 'brightness-110 saturate-125' : 'opacity-85'
            }`}
            style={{
              backgroundImage: `url('${BRAND_ASSETS.mapSatelliteDetails}')`,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
          ></div>

          {/* SVG Boundary Polygon Overlay with corner vertex pins */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 400 300"
          >
            <polygon
              fill="rgba(6, 95, 70, 0.28)"
              points="65,45 330,60 305,245 45,220"
              stroke="#8bd6b6"
              strokeDasharray="6,4"
              strokeWidth="2.5"
            />
            <circle cx="65" cy="45" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="330" cy="60" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="305" cy="245" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="45" cy="220" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />

            <rect fill="rgba(0, 33, 21, 0.75)" height="18" rx="4" width="115" x="75" y="48" />
            <text fill="#ffffff" fontFamily="Inter" fontSize="9" fontWeight="600" x="80" y="61">
              28°14'52.3"N 77°04'18.1"E
            </text>

            <rect fill="rgba(0, 33, 21, 0.75)" height="18" rx="4" width="125" x="175" y="222" />
            <text fill="#ffffff" fontFamily="Inter" fontSize="9" fontWeight="600" x="180" y="235">
              65ft Direct Pucca Road
            </text>
          </svg>

          {/* GPS HUD Top Left */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#263143]/90 backdrop-blur-md text-[#ecf1ff] text-[11px] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#fd8a42] animate-pulse"></span>
            <span>GPS Accuracy ±0.4m</span>
          </div>

          {/* Controls Top Right */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button
              className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-center text-[#111c2d] hover:text-[#004532] active:scale-95 transition-transform"
              title="Zoom In"
              type="button"
              onClick={() => setZoomLevel((z) => (z >= 1.4 ? 1 : z + 0.2))}
            >
              <span className="material-symbols-outlined text-[18px]">
                {zoomLevel > 1 ? 'zoom_out' : 'filter_center_focus'}
              </span>
            </button>
            <button
              className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-center text-[#111c2d] hover:text-[#004532] active:scale-95 transition-transform"
              title="Perimeter Calculator"
              type="button"
              onClick={() => showToast('Perimeter: 820m • Area: 4.50 Acres (36 Kanal)', 'square_foot')}
            >
              <span className="material-symbols-outlined text-[18px]">square_foot</span>
            </button>
          </div>

          {/* View switcher at bottom */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-1.5">
            <button
              className={`flex-1 py-1.5 px-2 rounded-lg backdrop-blur-md text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-98 ${
                mapMode === 'satellite'
                  ? 'bg-[#263143]/90 text-[#97f5cc]'
                  : 'bg-white/90 text-[#111c2d]'
              }`}
              type="button"
              onClick={() => {
                setMapMode('satellite');
                showToast('Switched to Satellite Orthomosaic Layer');
              }}
            >
              <span className="material-symbols-outlined text-[15px] text-[#97f5cc]">layers</span>
              <span className="truncate">Satellite</span>
            </button>

            <button
              className={`flex-1 py-1.5 px-2 rounded-lg backdrop-blur-md text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-98 ${
                mapMode === 'drone'
                  ? 'bg-[#263143]/90 text-[#ffdbca]'
                  : 'bg-white/90 text-[#111c2d]'
              }`}
              type="button"
              onClick={() => {
                setMapMode('drone');
                showToast('360° Aerial Drone View Loaded');
              }}
            >
              <span className="material-symbols-outlined text-[15px] text-[#9b4500]">flight</span>
              <span className="truncate">360° Drone</span>
            </button>

            <button
              className={`flex-1 py-1.5 px-2 rounded-lg backdrop-blur-md text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-98 ${
                mapMode === 'road'
                  ? 'bg-[#263143]/90 text-[#8bd6b7]'
                  : 'bg-white/90 text-[#111c2d]'
              }`}
              type="button"
              onClick={() => {
                setMapMode('road');
                showToast('Road Frontage Access Highway View');
              }}
            >
              <span className="material-symbols-outlined text-[15px] text-[#004532]">add_road</span>
              <span className="truncate">Road (60ft)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ZameenSetu Legal Scorecard */}
      <section className="px-4 py-1">
        <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#065f46] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div>
                <h2 className="text-xs font-bold text-[#111c2d] leading-tight">
                  ZameenSetu Legal Scorecard
                </h2>
                <p className="text-[11px] text-[#3f4944]">Govt. Revenue & Tehsil Cross-Audited</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-extrabold text-[#004532] tracking-tight">98</span>
                <span className="text-[11px] text-[#6f7973]">/100</span>
              </div>
              <span className="text-[11px] text-[#004530] font-bold">Ultra Safe</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#e7eeff] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#065f46] h-full rounded-full transition-all duration-700"
              style={{ width: '98%' }}
            ></div>
          </div>

          {/* Verification checklist items */}
          <div className="grid grid-cols-1 gap-2 pt-1">
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f0f3ff]">
              <div className="w-5 h-5 rounded-full bg-[#065f46] text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#111c2d]">30-Year Encumbrance Free</span>
                <span className="text-[11px] text-[#3f4944]">
                  Nil encumbrance certificate verified from Sohna Sub-Registrar
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f0f3ff]">
              <div className="w-5 h-5 rounded-full bg-[#065f46] text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#111c2d]">
                  Jamabandi / Khasra-Khatauni 2024 Matched
                </span>
                <span className="text-[11px] text-[#3f4944]">
                  Haryana Jamabandi digital portal integration synchronized today
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f0f3ff]">
              <div className="w-5 h-5 rounded-full bg-[#065f46] text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#111c2d]">
                  No Bank Mortgage or Court Injunction
                </span>
                <span className="text-[11px] text-[#3f4944]">
                  Clean SARFAESI & Civil Court clearance report filed
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#f0f3ff]">
              <div className="w-5 h-5 rounded-full bg-[#065f46] text-white flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[13px]">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#111c2d]">
                  Direct Single Owner Verification
                </span>
                <span className="text-[11px] text-[#3f4944]">
                  Aadhaar & PAN verified, live biometric KYC authenticated
                </span>
              </div>
            </div>
          </div>

          <button
            className="w-full mt-1 py-2.5 px-3 rounded-xl bg-[#e7eeff] text-[#004532] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#dee8ff] transition-colors active:scale-98"
            type="button"
            onClick={onOpenDeedVault}
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>Download Verified Title Report (PDF • 4.2 MB)</span>
          </button>
        </div>
      </section>

      {/* Physical Parcel Specifications */}
      <section className="px-4 py-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#111c2d]">Physical Parcel Specifications</h2>
          <span className="text-[11px] text-[#3f4944]">Survey #ZMP-8834</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#6f7973]">
              <span className="material-symbols-outlined text-[18px]">straighten</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Total Land Area</span>
            </div>
            <span className="text-sm font-extrabold text-[#111c2d]">4.5 Acres</span>
            <span className="text-[11px] text-[#3f4944]">21,780 Sq.Yd • 18,210 m²</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#9b4500]">
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Road Frontage</span>
            </div>
            <span className="text-sm font-extrabold text-[#111c2d]">65 Feet</span>
            <span className="text-[11px] text-[#3f4944]">All-weather Pucca road</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#004532]">
              <span className="material-symbols-outlined text-[18px]">compost</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Soil Quality</span>
            </div>
            <span className="text-sm font-extrabold text-[#111c2d]">Loamy Fertile</span>
            <span className="text-[11px] text-[#3f4944]">pH 7.2 (Ideal for crops/horticulture)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#6f7973]">
              <span className="material-symbols-outlined text-[18px]">water_drop</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Water Resources</span>
            </div>
            <span className="text-sm font-extrabold text-[#111c2d]">Dual System</span>
            <span className="text-[11px] text-[#3f4944]">2 Borewells + Canal feeder</span>
          </div>
        </div>

        {/* Grid Electricity */}
        <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dee8ff] text-[#3f4944] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#111c2d]">Grid Electricity</span>
              <span className="text-[11px] text-[#3f4944]">High-tension line 350m away • Active agri meter</span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#e7eeff] text-[#004532] text-[11px] font-bold shrink-0">
            <span className="material-symbols-outlined text-[14px]">power</span>
            <span>Active</span>
          </div>
        </div>
      </section>

      {/* Landowner & Verification Cadre */}
      <section className="px-4 py-2 pb-6">
        <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#bec9c2]/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#111c2d]">Landowner & Verification Cadre</span>
            <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[#004532] text-[11px] font-bold">
              Self-Owned
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              className="w-14 h-14 rounded-full object-cover shadow-sm shrink-0 border-2 border-[#a6f2d1]"
              src={BRAND_ASSETS.farmerOwner}
              alt="Rajeshwar Singh - Landowner"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#111c2d] truncate">Rajeshwar Singh</span>
                <span
                  className="material-symbols-outlined text-[17px] text-[#004532]"
                  title="Identity KYC Verified"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <span className="text-[11px] text-[#3f4944]">Sole Owner since 1994 • 30 Yrs Lineage</span>
              <span className="text-[11px] text-[#9b4500] font-semibold">Clear Title Deed Registered</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#f0f3ff] flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#065f46] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">approval_delegation</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#111c2d]">
                Field Inspected by Devender Sharma
              </span>
              <span className="text-[11px] text-[#3f4944]">
                ZameenSetu Lead Land Valuer • Oct 14, 2024
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action CTA Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(15,23,42,0.08)] px-4 py-2.5 border-t border-[#bec9c2]/20">
        <div className="flex items-center gap-2 max-w-lg mx-auto">
          <button
            className="flex-1 h-12 px-3 rounded-lg bg-white border border-[#bec9c2]/40 text-[#004532] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-98 transition-all hover:bg-[#f0f3ff]"
            onClick={() => onBookVisit(parcel)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span className="truncate">Book Site Visit</span>
          </button>

          <button
            className="flex-1 h-12 px-3 rounded-lg bg-[#065f46] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all hover:bg-[#004532]"
            onClick={() => onMakeOffer(parcel)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span className="truncate">Make Offer / Token</span>
          </button>
        </div>
      </div>
    </div>
  );
};
