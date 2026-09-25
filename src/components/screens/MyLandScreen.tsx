import React, { useState } from 'react';
import { MY_LAND_HOLDINGS } from '../../data/mockData';
import { LandHolding } from '../../types';

interface MyLandScreenProps {
  onPayTax: () => void;
  onOpenDeedVault: () => void;
  onBookDrone: () => void;
  onViewCadastralMap: (holding: LandHolding) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const MyLandScreen: React.FC<MyLandScreenProps> = ({
  onPayTax,
  onOpenDeedVault,
  onBookDrone,
  onViewCadastralMap,
  showToast,
}) => {
  const [selectedQuickTab, setSelectedQuickTab] = useState('geofence');
  const [holdings, setHoldings] = useState(MY_LAND_HOLDINGS);

  const handleSort = () => {
    setHoldings((prev) => [...prev].reverse());
    showToast('Sorted holdings by valuation', 'swap_vert');
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-lg mx-auto">
      {/* Portfolio Card Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative overflow-hidden rounded-xl bg-[#004532] text-white p-4 shadow-md">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#065f46]/40 pointer-events-none blur-xl"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#a6f2d1] text-[20px]">
                  account_balance
                </span>
                <span className="text-xs text-[#a6f2d1] uppercase tracking-wider font-bold">
                  My Land Portfolio
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/15 text-[#a6f2d1] backdrop-blur-sm font-semibold">
                3 Parcels
              </span>
            </div>

            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-3xl font-extrabold text-white tracking-tight">₹14.80 Cr</span>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#97f5cc] text-[#002115] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+8.4% YoY</span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between bg-white/10 rounded-lg px-3 py-2 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a6f2d1] text-[18px]">
                  nature_people
                </span>
                <span className="text-xs text-white font-medium">12.8 Total Acres</span>
              </div>
              <span className="text-[11px] text-white/80">Gurugram & Rewari</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Tabs */}
      <div className="py-1">
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar pb-1">
          <button
            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs active:scale-95 transition-all ${
              selectedQuickTab === 'geofence'
                ? 'bg-[#dee8ff] text-[#111c2d] border border-[#065f46]/30'
                : 'bg-[#f0f3ff] text-[#111c2d]'
            }`}
            onClick={() => {
              setSelectedQuickTab('geofence');
              showToast('Satellite Geo-Fence radar active on all parcels', 'radar');
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[#004532] text-[18px]">
              verified_user
            </span>
            <span>Geo-Fence: Active</span>
            <span className="w-2 h-2 rounded-full bg-[#065f46] animate-pulse"></span>
          </button>

          <button
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f0f3ff] text-[#111c2d] text-xs font-semibold shadow-xs active:scale-95 transition-all hover:bg-[#dee8ff]"
            onClick={onOpenDeedVault}
            type="button"
          >
            <span className="material-symbols-outlined text-[#9b4500] text-[18px]">
              folder_special
            </span>
            <span>Deed Vault</span>
          </button>

          <button
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f0f3ff] text-[#111c2d] text-xs font-semibold shadow-xs active:scale-95 transition-all hover:bg-[#dee8ff]"
            onClick={() => showToast('Rent tracker: ₹1.80L received for October', 'payments')}
            type="button"
          >
            <span className="material-symbols-outlined text-[#004532] text-[18px]">payments</span>
            <span>Rent Tracker</span>
          </button>

          <button
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#f0f3ff] text-[#111c2d] text-xs font-semibold shadow-xs active:scale-95 transition-all hover:bg-[#dee8ff]"
            onClick={onPayTax}
            type="button"
          >
            <span className="material-symbols-outlined text-[#3f4944] text-[18px]">gavel</span>
            <span>Mutation & Tax</span>
          </button>
        </div>
      </div>

      {/* Active Holdings List */}
      <div className="px-4 py-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#111c2d]">Active Holdings</span>
            <span className="px-2 py-0.5 rounded-full bg-[#dee8ff] text-[#3f4944] text-[11px] font-bold">
              {holdings.length} Total
            </span>
          </div>

          <button
            className="text-[#004532] text-xs font-bold flex items-center gap-0.5 hover:underline"
            onClick={handleSort}
            type="button"
          >
            <span>Sort by Value</span>
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          </button>
        </div>

        {/* HOLDING 1: Sohna Farmland */}
        <div className="flex flex-col rounded-xl bg-white shadow-xs border border-[#bec9c2]/30 overflow-hidden transition-all hover:shadow-md">
          <div className="relative h-36 w-full">
            <img
              className="w-full h-full object-cover"
              src={holdings[0].imageUrl}
              alt={holdings[0].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#263143]/80 via-[#263143]/20 to-transparent"></div>
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#065f46]"></span>
              <span className="text-[11px] text-[#111c2d] font-bold">Self-Managed Farming</span>
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-[#ecf1ff]">
              <div>
                <h3 className="text-sm font-bold drop-shadow-sm">{holdings[0].title}</h3>
                <p className="text-[11px] text-white/90">{holdings[0].parcelTag}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">{holdings[0].acres}</span>
                <span className="text-[10px] block leading-none">Acres</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f3ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004532] text-[20px]">radar</span>
                <div>
                  <p className="text-xs font-bold text-[#111c2d]">Boundary Geo-Fence OK</p>
                  <p className="text-[11px] text-[#3f4944]">Zero encroachments detected</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#065f46] text-[20px]">
                check_circle
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#ffdbca]/40 text-[#111c2d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
                  calendar_clock
                </span>
                <div>
                  <p className="text-xs font-bold text-[#763300]">Property Tax Due</p>
                  <p className="text-[11px] text-[#3f4944]">Due in 24 days • ₹4,250</p>
                </div>
              </div>
              <button
                className="px-3 py-1.5 rounded-lg bg-[#9b4500] hover:bg-[#763300] text-white text-xs font-bold active:scale-95 transition-transform"
                onClick={onPayTax}
                type="button"
              >
                Pay Now
              </button>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <button
                className="text-[#004532] font-bold flex items-center gap-1 hover:underline"
                onClick={() => onViewCadastralMap(holdings[0])}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">crop_free</span>
                <span>View Cadastral Map</span>
              </button>
              <span className="text-[11px] text-[#3f4944]">Valued at ₹4.20 Cr</span>
            </div>
          </div>
        </div>

        {/* HOLDING 2: Rewari Hub */}
        <div className="flex flex-col rounded-xl bg-white shadow-xs border border-[#bec9c2]/30 overflow-hidden transition-all hover:shadow-md">
          <div className="relative h-36 w-full">
            <img
              className="w-full h-full object-cover"
              src={holdings[1].imageUrl}
              alt={holdings[1].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#263143]/80 via-[#263143]/20 to-transparent"></div>
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md">
              <span className="material-symbols-outlined text-[#9b4500] text-[14px]">
                warehouse
              </span>
              <span className="text-[11px] text-[#111c2d] font-bold">Leased: AgriLogix</span>
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-[#ecf1ff]">
              <div>
                <h3 className="text-sm font-bold drop-shadow-sm">{holdings[1].title}</h3>
                <p className="text-[11px] text-white/90">{holdings[1].parcelTag}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">{holdings[1].acres}</span>
                <span className="text-[10px] block leading-none">Acres</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 flex flex-col gap-2">
            <div className="p-3 rounded-lg bg-[#f0f3ff] flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#3f4944] font-medium">Monthly Lease Revenue</span>
                <span className="text-sm font-extrabold text-[#004532]">₹1,80,000/mo</span>
              </div>
              <div className="flex items-center justify-between text-[#111c2d]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#065f46]"></span>
                  <span className="text-[11px]">Next Auto-credit: 1st Nov</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#97f5cc] text-[#002115] font-bold">
                  Auto-Debit On
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[#3f4944] text-[11px]">
                <span className="material-symbols-outlined text-[16px] text-[#004532]">
                  verified
                </span>
                <span>Lease valid till March 2027</span>
              </div>
              <button
                className="text-[#004532] text-xs font-bold flex items-center gap-0.5 hover:underline"
                onClick={onOpenDeedVault}
                type="button"
              >
                <span>Renew / Deed</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* HOLDING 3: Pataudi Road Corner Plot */}
        <div className="flex flex-col rounded-xl bg-white shadow-xs border border-[#bec9c2]/30 overflow-hidden transition-all hover:shadow-md">
          <div className="relative h-36 w-full">
            <img
              className="w-full h-full object-cover"
              src={holdings[2].imageUrl}
              alt={holdings[2].title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#263143]/80 via-[#263143]/20 to-transparent"></div>
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fd8a42] text-white font-bold text-[11px]">
              <span className="material-symbols-outlined text-[14px]">storefront</span>
              <span>Active on Marketplace</span>
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-[#ecf1ff]">
              <div>
                <h3 className="text-sm font-bold drop-shadow-sm">{holdings[2].title}</h3>
                <p className="text-[11px] text-white/90">{holdings[2].parcelTag}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] bg-white/20 px-2 py-1 rounded backdrop-blur-sm font-bold">
                  Listing #ZS-902
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-[#dee8ff] flex flex-col">
                <span className="text-xl font-extrabold text-[#111c2d]">6</span>
                <span className="text-[11px] text-[#3f4944]">Verified Enquiries</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#dee8ff] flex flex-col">
                <span className="text-xl font-extrabold text-[#9b4500]">2</span>
                <span className="text-[11px] text-[#3f4944]">Site Visits Booked</span>
              </div>
            </div>

            <button
              className="w-full py-2.5 rounded-lg bg-[#004532] hover:bg-[#065f46] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-transform shadow-sm"
              onClick={() => showToast('Opening Buyer Negotiation & Bid Desk for #ZS-902...')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Manage Listing & Offers</span>
            </button>
          </div>
        </div>
      </div>

      {/* GUARDIAN SERVICES */}
      <div className="px-4 pt-2 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004532] text-[22px]">shield_lock</span>
          <h2 className="text-xs font-bold text-[#111c2d]">Smart Land Guardian Services</h2>
        </div>

        <div className="rounded-xl bg-[#f0f3ff] p-3.5 flex flex-col gap-3 shadow-xs border border-[#bec9c2]/30">
          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#d8e3fb] flex items-center justify-center shrink-0 text-[#004532]">
              <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111c2d]">Satellite Encroachment Radar</h4>
                <span className="text-[11px] text-[#065f46] font-bold">Active</span>
              </div>
              <p className="text-[11px] text-[#3f4944] mt-0.5">
                Scanned 2 days ago via Sentinel-2. Perimeter intact, zero anomaly detected across all 3 parcels.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#d8e3fb] flex items-center justify-center shrink-0 text-[#004532]">
              <span className="material-symbols-outlined text-[24px]">balance</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111c2d]">
                  Revenue Court & Registry Tracker
                </h4>
                <span className="text-[11px] text-[#065f46] font-bold">Clean</span>
              </div>
              <p className="text-[11px] text-[#3f4944] mt-0.5">
                Automated synchronization with Haryana Jamabandi records. No pending disputes or stays.
              </p>
            </div>
          </div>

          <div className="pt-1">
            <div className="p-2.5 rounded-lg bg-white flex items-center justify-between shadow-xs border border-[#bec9c2]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#ffdbca] flex items-center justify-center text-[#9b4500]">
                  <span className="material-symbols-outlined text-[20px]">engineering</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#111c2d]">Need Boundary Verification?</p>
                  <p className="text-[11px] text-[#3f4944]">DGPS Drone & Revenue Patwari Visit</p>
                </div>
              </div>
              <button
                className="px-3 py-1.5 rounded-lg bg-[#9b4500] hover:bg-[#763300] text-white text-xs font-bold active:scale-95 transition-transform shrink-0"
                onClick={onBookDrone}
                type="button"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
