import React, { useState } from 'react';
import { BRAND_ASSETS } from '../../data/mockData';

interface ListLandScreenProps {
  showToast: (msg: string, icon?: string) => void;
  onOpenDeedVault: () => void;
}

export const ListLandScreen: React.FC<ListLandScreenProps> = ({
  showToast,
  onOpenDeedVault,
}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [intent, setIntent] = useState<'sell' | 'lease' | 'joint'>('sell');
  const [zoning, setZoning] = useState<'agri' | 'comm' | 'res' | 'ind'>('agri');
  const [khasraInput, setKhasraInput] = useState('142/12, 142/13, 143/1');
  const [roadWidth, setRoadWidth] = useState('60');
  const [roadSurface, setRoadSurface] = useState<'highway' | 'pucca' | 'kaccha'>('pucca');
  const [pricePerAcre, setPricePerAcre] = useState('14500000');
  const [isGuaranteed, setIsGuaranteed] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [gpsCoords, setGpsCoords] = useState('28.2481° N, 77.0645° E');
  const [calculatedArea, setCalculatedArea] = useState('4.50');
  const [aksShajraFile, setAksShajraFile] = useState<string | null>(null);

  // Dynamic calculations
  const numPrice = parseFloat(pricePerAcre) || 0;
  const numArea = parseFloat(calculatedArea) || 4.5;
  const totalCrores = (numPrice * numArea) / 10000000;
  const registryFeeLakhs = (totalCrores * 100 * 0.06); // ~6% stamp duty

  const handlePinGps = () => {
    showToast('Connecting to Device RTK-GPS...', 'my_location');
    setTimeout(() => {
      setGpsCoords('28.2492° N, 77.0658° E');
      showToast('GPS Lock confirmed with ±0.3m RTK accuracy', 'verified');
    }, 1000);
  };

  const handleRedraw = () => {
    showToast('Demarcation Polygon Mode active. Tap vertices on satellite map.', 'draw');
    setTimeout(() => {
      setCalculatedArea('4.75');
      showToast('Calculated area updated: 4.75 Acres (38 Kanal)', 'square_foot');
    }, 1500);
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Land listing draft saved to local registry!', 'save');
    }, 800);
  };

  const handleVerifyAndContinue = () => {
    if (!isGuaranteed) {
      showToast('Please confirm the legal ownership guarantee checkbox', 'warning');
      return;
    }
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      showToast('Haryana Land Registry Hash verified successfully!', 'verified');
      if (currentStep < 4) {
        setCurrentStep((s) => s + 1);
      } else {
        showToast('Land listing published to 50,000+ verified investors!', 'celebration');
      }
    }, 1400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAksShajraFile(file.name);
      showToast(`Uploaded: ${file.name} (Cadastral Patwari Map)`, 'check_circle');
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-lg mx-auto">
      {/* Progress Header */}
      <section className="px-4 pt-3 pb-2">
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#9b4500] uppercase tracking-wider font-extrabold">
              Step {currentStep} of 4
            </span>
            <div className="flex items-center gap-1.5 bg-[#a6f2d1]/30 px-2.5 py-1 rounded-full border border-[#8bd6b6]/40">
              <span
                className="material-symbols-outlined text-[14px] text-[#004532]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-[11px] text-[#004532] font-semibold">
                Government Land Registry API Synced
              </span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-[#111c2d] mb-0.5 leading-snug">
            List Your Land on ZameenSetu
          </h1>
          <p className="text-xs text-[#3f4944]">
            Reach 50,000+ verified institutional buyers & investors with 100% legal privacy.
          </p>

          {/* Stepper Visual Track */}
          <div className="mt-3 pt-1">
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div
                onClick={() => setCurrentStep(1)}
                className={`h-1.5 rounded-full cursor-pointer transition-colors ${
                  currentStep >= 1 ? 'bg-[#004532]' : 'bg-[#dee8ff]'
                }`}
              ></div>
              <div
                onClick={() => setCurrentStep(2)}
                className={`h-1.5 rounded-full cursor-pointer transition-colors ${
                  currentStep >= 2 ? 'bg-[#fd8a42]' : 'bg-[#dee8ff]'
                }`}
              ></div>
              <div
                onClick={() => setCurrentStep(3)}
                className={`h-1.5 rounded-full cursor-pointer transition-colors ${
                  currentStep >= 3 ? 'bg-[#004532]' : 'bg-[#dee8ff]'
                }`}
              ></div>
              <div
                onClick={() => setCurrentStep(4)}
                className={`h-1.5 rounded-full cursor-pointer transition-colors ${
                  currentStep >= 4 ? 'bg-[#004532]' : 'bg-[#dee8ff]'
                }`}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[#3f4944] text-[11px]">
              <span
                onClick={() => setCurrentStep(1)}
                className={`cursor-pointer font-medium ${
                  currentStep === 1 ? 'text-[#004532] font-bold' : ''
                }`}
              >
                1. Overview
              </span>
              <span
                onClick={() => setCurrentStep(2)}
                className={`cursor-pointer font-bold ${
                  currentStep === 2 ? 'text-[#9b4500]' : ''
                }`}
              >
                2. Demarcation
              </span>
              <span
                onClick={() => setCurrentStep(3)}
                className={`cursor-pointer ${currentStep === 3 ? 'text-[#004532] font-bold' : 'opacity-60'}`}
              >
                3. Title Deed
              </span>
              <span
                onClick={() => setCurrentStep(4)}
                className={`cursor-pointer ${currentStep === 4 ? 'text-[#004532] font-bold' : 'opacity-60'}`}
              >
                4. Valuation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Multi-Step Form Container */}
      <form
        className="px-4 flex flex-col gap-3 pb-8"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 1. Listing Intent Selector */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <label className="block text-xs font-bold text-[#111c2d] mb-0.5">
            Select Listing Intent
          </label>
          <p className="text-[11px] text-[#3f4944] mb-3">
            Specify legal framework for prospective buyers.
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all ${
                intent === 'sell'
                  ? 'bg-[#065f46] text-white shadow-sm'
                  : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#dee8ff]'
              }`}
              onClick={() => setIntent('sell')}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-1">
                real_estate_agent
              </span>
              <span className="text-xs font-semibold">Sell Land</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all ${
                intent === 'lease'
                  ? 'bg-[#065f46] text-white shadow-sm'
                  : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#dee8ff]'
              }`}
              onClick={() => setIntent('lease')}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-1">
                history_edu
              </span>
              <span className="text-xs font-semibold">Lease / Rent</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all ${
                intent === 'joint'
                  ? 'bg-[#065f46] text-white shadow-sm'
                  : 'bg-[#f0f3ff] text-[#111c2d] hover:bg-[#dee8ff]'
              }`}
              onClick={() => setIntent('joint')}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-1">handshake</span>
              <span className="text-xs font-semibold">Joint Dev</span>
            </button>
          </div>
        </div>

        {/* 2. Land Classification (Zoning) */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#111c2d]">Land Classification</label>
            <span className="text-[11px] text-[#004532] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">policy</span> Master Plan 2031
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                zoning === 'agri'
                  ? 'bg-[#065f46] text-white font-bold'
                  : 'bg-[#e7eeff] text-[#111c2d] font-medium'
              }`}
              onClick={() => setZoning('agri')}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                agriculture
              </span>
              <span className="text-xs">Agricultural</span>
            </button>

            <button
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                zoning === 'comm'
                  ? 'bg-[#065f46] text-white font-bold'
                  : 'bg-[#e7eeff] text-[#111c2d] font-medium'
              }`}
              onClick={() => setZoning('comm')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">domain</span>
              <span className="text-xs">Commercial</span>
            </button>

            <button
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                zoning === 'res'
                  ? 'bg-[#065f46] text-white font-bold'
                  : 'bg-[#e7eeff] text-[#111c2d] font-medium'
              }`}
              onClick={() => setZoning('res')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">holiday_village</span>
              <span className="text-xs">Residential Layout</span>
            </button>

            <button
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                zoning === 'ind'
                  ? 'bg-[#065f46] text-white font-bold'
                  : 'bg-[#e7eeff] text-[#111c2d] font-medium'
              }`}
              onClick={() => setZoning('ind')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">warehouse</span>
              <span className="text-xs">Industrial / Log</span>
            </button>
          </div>
        </div>

        {/* 3. Cadastral Administrative Location */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#a6f2d1]/40 flex items-center justify-center text-[#004532]">
              <span className="material-symbols-outlined text-[20px]">explore</span>
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#111c2d]">Administrative Revenue Record</h2>
              <p className="text-[11px] text-[#3f4944]">Matches Tehsil land parcel database.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-1">
            <div className="bg-[#f0f3ff] rounded-lg p-2.5">
              <span className="text-[10px] text-[#3f4944] block mb-0.5">State</span>
              <span className="text-xs font-bold text-[#111c2d] flex items-center justify-between">
                Haryana{' '}
                <span className="material-symbols-outlined text-[15px] text-[#004532]">
                  verified
                </span>
              </span>
            </div>

            <div className="bg-[#f0f3ff] rounded-lg p-2.5">
              <span className="text-[10px] text-[#3f4944] block mb-0.5">District</span>
              <span className="text-xs font-bold text-[#111c2d] truncate">Gurugram</span>
            </div>

            <div className="bg-[#f0f3ff] rounded-lg p-2.5">
              <span className="text-[10px] text-[#3f4944] block mb-0.5">Tehsil</span>
              <span className="text-xs font-bold text-[#111c2d] truncate">Sohna</span>
            </div>
          </div>

          <div className="mt-1">
            <label className="block text-xs font-semibold text-[#111c2d] mb-1">
              Khasra / Murabba / Survey Numbers <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#6f7973]">
                pin
              </span>
              <input
                className="w-full bg-[#f0f3ff] text-[#111c2d] rounded-lg pl-9 pr-24 py-2.5 text-xs font-medium focus:bg-white focus:shadow-xs focus:outline-none focus:ring-1 focus:ring-[#004532] transition-all"
                placeholder="e.g., 142/12, 142/13"
                type="text"
                value={khasraInput}
                onChange={(e) => setKhasraInput(e.target.value)}
              />
              <span className="absolute right-2 px-2 py-0.5 bg-[#97f5cc] text-[#002115] rounded text-[11px] font-bold">
                3 Parcels
              </span>
            </div>
          </div>
        </div>

        {/* 4. Interactive Boundary Polygon Card */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xs font-bold text-[#111c2d]">Interactive Boundary Polygon</h2>
              <p className="text-[11px] text-[#3f4944]">Differential GPS & Satellite Orthomosaic</p>
            </div>
            <div className="bg-[#ffdbca] text-[#331200] px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">satellite_alt</span> Live
            </div>
          </div>

          {/* Map Viewport with SVG Polygon */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#d8e3fb] shadow-inner border border-[#bec9c2]/20">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${BRAND_ASSETS.mapDemarcation}')`,
              }}
            ></div>

            {/* Polygon Overlay SVG with orange pins */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              viewBox="0 0 320 220"
            >
              <polygon
                fill="rgba(6, 95, 70, 0.28)"
                points="50,45 270,30 250,180 80,165"
                stroke="#8bd6b7"
                strokeDasharray="4 2"
                strokeWidth="2.5"
              />
              <circle cx="50" cy="45" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="270" cy="30" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="250" cy="180" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="80" cy="165" fill="#fd8a42" r="5" stroke="#ffffff" strokeWidth="1.5" />
            </svg>

            {/* Dynamic GPS Coordinates HUD */}
            <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-xs">
              <span className="text-[11px] text-[#111c2d] block font-bold">{gpsCoords}</span>
              <span className="text-[10px] text-[#005f44] font-semibold">
                Accuracy ± 0.4m (RTK-GPS)
              </span>
            </div>

            {/* Detected Area Counter Floater */}
            <div className="absolute bottom-2.5 right-2.5 bg-[#065f46] text-white px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#97f5cc]">
                square_foot
              </span>
              <div>
                <span className="text-[10px] block opacity-85 leading-none">Calculated Area</span>
                <span className="text-xs text-[#97f5cc] font-extrabold leading-tight">
                  {calculatedArea} Acres
                </span>
              </div>
            </div>
          </div>

          {/* Demarcation Action CTAs */}
          <div className="grid grid-cols-2 gap-2 mt-2.5">
            <button
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#dee8ff] hover:bg-[#d8e3fb] text-[#111c2d] text-xs font-semibold transition-colors active:scale-98"
              type="button"
              onClick={handlePinGps}
            >
              <span className="material-symbols-outlined text-[18px] text-[#9b4500]">
                my_location
              </span>
              <span>Pin GPS from Site</span>
            </button>

            <button
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#dee8ff] hover:bg-[#d8e3fb] text-[#111c2d] text-xs font-semibold transition-colors active:scale-98"
              type="button"
              onClick={handleRedraw}
            >
              <span className="material-symbols-outlined text-[18px] text-[#004532]">draw</span>
              <span>Redraw Polygon</span>
            </button>
          </div>
        </div>

        {/* 5. Access Road & Frontage */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <h2 className="text-xs font-bold text-[#111c2d] mb-0.5">Access Road & Frontage</h2>
          <p className="text-[11px] text-[#3f4944] mb-2.5">
            Critical factor for valuation and industrial zoning clearance.
          </p>

          <div className="flex flex-col gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-[#111c2d] mb-1">
                Approaching Road Width
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    className="w-full bg-[#f0f3ff] text-[#111c2d] rounded-lg pl-3 pr-14 py-2 font-bold text-sm focus:bg-white focus:outline-none"
                    type="number"
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#3f4944] font-semibold">
                    Feet
                  </span>
                </div>

                <div className="flex gap-1">
                  {['30', '60', '100'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setRoadWidth(w)}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        roadWidth === w
                          ? 'bg-[#065f46] text-white shadow-xs'
                          : 'bg-[#dee8ff] text-[#111c2d] hover:bg-[#a6f2d1]'
                      }`}
                    >
                      {w}ft{w === '100' ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111c2d] mb-1.5">
                Surface Material Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-2 rounded-lg text-center text-xs font-medium transition-all ${
                    roadSurface === 'highway'
                      ? 'bg-[#065f46] text-white font-bold shadow-xs'
                      : 'bg-[#f0f3ff] text-[#111c2d]'
                  }`}
                  onClick={() => setRoadSurface('highway')}
                  type="button"
                >
                  NH / State Hwy
                </button>

                <button
                  className={`p-2 rounded-lg text-center text-xs transition-all ${
                    roadSurface === 'pucca'
                      ? 'bg-[#065f46] text-white font-bold shadow-xs'
                      : 'bg-[#f0f3ff] text-[#111c2d]'
                  }`}
                  onClick={() => setRoadSurface('pucca')}
                  type="button"
                >
                  Paved Pucca
                </button>

                <button
                  className={`p-2 rounded-lg text-center text-xs font-medium transition-all ${
                    roadSurface === 'kaccha'
                      ? 'bg-[#065f46] text-white font-bold shadow-xs'
                      : 'bg-[#f0f3ff] text-[#111c2d]'
                  }`}
                  onClick={() => setRoadSurface('kaccha')}
                  type="button"
                >
                  Kaccha Track
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Land Document & Deed Verification Area */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-xs font-bold text-[#111c2d]">Legal Title & Records</h2>
              <p className="text-[11px] text-[#3f4944]">
                Automated OCR cross-check with state digital portal.
              </p>
            </div>
            <span className="material-symbols-outlined text-[#004532] text-[24px]">gavel</span>
          </div>

          {/* Item 1: Uploaded Jamabandi / 7/12 (Success State) */}
          <div className="mb-2 bg-[#f0f3ff] rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#97f5cc] text-[#002115] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#111c2d] truncate">
                  jamabandi_sohna_oct2024.pdf
                </div>
                <div className="flex items-center gap-1 text-[#004532]">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span className="text-[11px] font-bold">Title Verified by RoR Hash</span>
                </div>
              </div>
            </div>

            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#3f4944] hover:bg-[#dee8ff]"
              type="button"
              onClick={onOpenDeedVault}
              title="View Title Document"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
          </div>

          {/* Item 2: Aks-Shajra Upload Dropzone */}
          <div className="bg-[#f0f3ff] rounded-lg p-4 text-center flex flex-col items-center justify-center border border-dashed border-[#bec9c2]">
            <div className="w-12 h-12 rounded-full bg-[#dee8ff] flex items-center justify-center text-[#9b4500] mb-2">
              <span className="material-symbols-outlined text-[26px]">map</span>
            </div>
            <span className="text-xs font-bold text-[#111c2d] mb-0.5">
              Upload Aks-Shajra (Plot Cadastral Map)
            </span>
            <span className="text-[11px] text-[#3f4944] mb-3">
              {aksShajraFile || 'Clear photo or official Patwari certified PDF'}
            </span>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer bg-[#004532] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform hover:bg-[#065f46]">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                <span>Scan via Camera</span>
                <input
                  accept="image/*,application/pdf"
                  className="hidden"
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>

              <label className="cursor-pointer bg-[#dee8ff] text-[#111c2d] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-[#d8e3fb] transition-colors">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                <span>Files</span>
                <input
                  accept=".pdf,.jpg,.png"
                  className="hidden"
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 7. Expected Financial Terms */}
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#bec9c2]/30">
          <h2 className="text-xs font-bold text-[#111c2d] mb-0.5">Expected Financial Terms</h2>
          <p className="text-[11px] text-[#3f4944] mb-2">
            Transparent quote directly presented to serious investors.
          </p>

          <div className="bg-[#f0f3ff] rounded-xl p-3 flex flex-col gap-2.5">
            <div>
              <label className="block text-[11px] text-[#3f4944] uppercase tracking-wider mb-1 font-semibold">
                Price per Acre
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-base font-bold text-[#004532]">₹</span>
                <input
                  className="w-full bg-white text-[#111c2d] text-base font-extrabold rounded-lg pl-9 pr-20 py-2 focus:outline-none shadow-inner border border-[#bec9c2]/30"
                  type="number"
                  value={pricePerAcre}
                  onChange={(e) => setPricePerAcre(e.target.value)}
                />
                <span className="absolute right-3.5 text-xs text-[#3f4944] font-semibold">
                  / Acre
                </span>
              </div>
            </div>

            {/* Calculated Summary Strip */}
            <div className="bg-[#065f46] text-white rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#97f5cc]">
                  calculate
                </span>
                <div>
                  <span className="text-[11px] opacity-85 block leading-tight">
                    Estimated Deal Value ({calculatedArea} Ac)
                  </span>
                  <span className="text-base font-extrabold text-[#97f5cc]">
                    ₹ {totalCrores.toFixed(2)} Crore
                  </span>
                </div>
              </div>
              <span className="text-[11px] bg-[#004530]/60 px-2 py-1 rounded text-white font-semibold">
                Registry Fee: ~₹{registryFeeLakhs.toFixed(1)}L
              </span>
            </div>
          </div>
        </div>

        {/* 8. Legal Ownership Guarantee Assertion */}
        <div className="bg-[#dee8ff]/50 rounded-xl p-3.5 border border-[#bec9c2]/40">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              checked={isGuaranteed}
              onChange={(e) => setIsGuaranteed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#004532] accent-[#004532]"
              type="checkbox"
            />
            <span className="text-xs text-[#111c2d] leading-snug">
              I confirm that I am the sole owner or legally authorized GPA holder for this property.
              Title deed is clean, unencumbered, free from adverse litigation, and ready for instant
              mutation.
            </span>
          </label>
        </div>

        {/* Bottom Action CTA Buttons (Sticky above bottom nav) */}
        <div className="sticky bottom-16 z-30 bg-[#f9f9ff]/95 backdrop-blur-lg pt-2 pb-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              className="col-span-1 py-3 px-2 rounded-lg bg-[#dee8ff] hover:bg-[#d8e3fb] text-[#111c2d] text-xs font-bold flex items-center justify-center gap-1 transition-colors active:scale-95"
              onClick={handleSaveDraft}
              disabled={isSaving}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSaving ? 'sync' : 'save'}
              </span>
              <span>{isSaving ? 'Saved!' : 'Save Draft'}</span>
            </button>

            <button
              className="col-span-2 py-3 px-4 rounded-lg bg-[#004532] hover:bg-[#065f46] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all"
              onClick={handleVerifyAndContinue}
              disabled={isValidating}
              type="button"
            >
              {isValidating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                  <span>Validating Registry Hash...</span>
                </>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
