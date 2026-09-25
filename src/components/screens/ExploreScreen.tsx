import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPLORE_PARCELS } from '../../data/mockData';
import { LandParcel } from '../../types';

interface ExploreScreenProps {
  onSelectParcel: (parcel: LandParcel) => void;
  onOpenInstantTitle: () => void;
  onBookVisit: (parcel: LandParcel) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectParcel,
  onOpenInstantTitle,
  onBookVisit,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<'buy' | 'lease' | 'commercial' | 'farmland'>('buy');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFilter = (filterKey: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterKey) ? prev.filter((f) => f !== filterKey) : [...prev, filterKey]
    );
  };

  const toggleFavorite = (parcelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const nextState = !prev[parcelId];
      showToast(
        nextState ? 'Added to Saved Parcels' : 'Removed from Saved',
        nextState ? 'bookmark' : 'bookmark_border'
      );
      return { ...prev, [parcelId]: nextState };
    });
  };

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    showToast('Listening for District, Tehsil, or Khasra...', 'mic');
    setTimeout(() => {
      setSearchQuery('Sohna 142/12');
      setIsVoiceListening(false);
      showToast('Found Khasra #142/12 in Tehsil Sohna', 'check_circle');
    }, 2200);
  };

  const filteredParcels = EXPLORE_PARCELS.filter((p) => {
    if (selectedMode === 'commercial' && p.type !== 'Industrial' && p.type !== 'Commercial') {
      return false;
    }
    if (selectedMode === 'farmland' && p.type !== 'Agricultural' && p.type !== 'Orchard') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${p.title} ${p.location} ${p.khasraNo} ${p.district} ${p.tehsil}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-8 max-w-lg mx-auto">
      {/* Search & Discovery Controller */}
      <section className="px-4 pt-2 pb-2">
        <div className="relative flex items-center bg-white rounded-xl shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-1.5 transition-all focus-within:shadow-[0_4px_16px_rgba(6,95,70,0.12)] border border-[#bec9c2]/30">
          <div className="flex items-center pl-1 text-[#004532]">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input
            className="w-full bg-transparent border-0 px-2 py-2 text-[#111c2d] text-xs font-medium placeholder:text-[#6f7973] focus:outline-none"
            placeholder={isVoiceListening ? 'Listening for Khasra or District...' : 'District, Tehsil, Khasra No. or Pin...'}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#6f7973] hover:text-[#111c2d]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          )}
          <div className="flex items-center gap-1 shrink-0 pr-1">
            <button
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                isVoiceListening
                  ? 'bg-[#fd8a42] text-white animate-pulse'
                  : 'text-[#004532] hover:bg-[#e7eeff]'
              }`}
              onClick={handleVoiceSearch}
              title="Voice Search"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#065f46] text-white hover:bg-[#004532] transition-all active:scale-95 shadow-sm"
              title="Filter Preferences"
              onClick={() => toggleFilter('Clean 30-Yr Search')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mode Switcher Carousel */}
      <section className="px-4 py-1 overflow-x-auto no-scrollbar flex items-center gap-2">
        <button
          onClick={() => setSelectedMode('buy')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 ${
            selectedMode === 'buy'
              ? 'bg-[#004532] text-white'
              : 'bg-white text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <span>Buy Land</span>
        </button>

        <button
          onClick={() => setSelectedMode('lease')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 ${
            selectedMode === 'lease'
              ? 'bg-[#004532] text-white'
              : 'bg-white text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
          <span>Rent / Lease</span>
        </button>

        <button
          onClick={() => setSelectedMode('commercial')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 ${
            selectedMode === 'commercial'
              ? 'bg-[#004532] text-white'
              : 'bg-white text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">factory</span>
          <span>Commercial Plots</span>
        </button>

        <button
          onClick={() => setSelectedMode('farmland')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 ${
            selectedMode === 'farmland'
              ? 'bg-[#004532] text-white'
              : 'bg-white text-[#3f4944] hover:text-[#004532]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">agriculture</span>
          <span>Farmland / Villas</span>
        </button>
      </section>

      {/* Trust & Verification Metric Ticker */}
      <section className="px-4 py-2">
        <div className="bg-gradient-to-r from-[#065f46] via-[#005f44] to-[#004532] rounded-xl p-3 text-white shadow-[0_2px_8px_rgba(6,95,70,0.18)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none blur-sm"></div>
          <div className="flex items-center justify-between gap-2 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <span
                  className="material-symbols-outlined text-[#ffdbca] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <div>
                <div className="text-xs font-bold tracking-wide text-[#a6f2d1] uppercase flex items-center gap-1.5">
                  <span>Legal Shield Active</span>
                  <span className="w-2 h-2 rounded-full bg-[#ffdbca] animate-ping"></span>
                </div>
                <p className="text-[11px] text-white/90 font-medium">
                  12,450+ Verified Parcels • Zero Title Disputes
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-center shrink-0">
              <span className="text-[13px] block leading-none font-bold text-white">100%</span>
              <span className="text-[9px] uppercase tracking-wider text-[#8bd6b6] font-bold">
                Inspected
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Parametric Fast Filter Chips */}
      <section className="px-4 py-1 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {[
          { key: 'Clean 30-Yr Search', icon: 'policy', iconColor: 'text-[#004532]' },
          { key: 'RERA / DTCP Approved', icon: 'approval_delegation', iconColor: 'text-[#9b4500]' },
          { key: 'Direct Owner', icon: 'person_check', iconColor: 'text-[#005f44]' },
          { key: 'Road Access > 40ft', icon: 'add_road', iconColor: 'text-[#004532]' },
        ].map((chip) => {
          const isActive = activeFilters.includes(chip.key);
          return (
            <button
              key={chip.key}
              onClick={() => toggleFilter(chip.key)}
              className={`filter-chip shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium shadow-xs flex items-center gap-1 transition-all ${
                isActive
                  ? 'bg-[#004532] text-white font-semibold'
                  : 'bg-white text-[#111c2d] hover:bg-[#e7eeff] border border-[#bec9c2]/30'
              }`}
              type="button"
            >
              <span
                className={`material-symbols-outlined text-[15px] ${
                  isActive ? 'text-[#97f5cc]' : chip.iconColor
                }`}
              >
                {chip.icon}
              </span>
              <span>{chip.key}</span>
            </button>
          );
        })}
      </section>

      {/* Curated Verified Parcels Stream */}
      <section className="px-4 pt-3 flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredParcels.map((parcel, index) => {
            const isFav = !!favorites[parcel.id];
            return (
              <motion.article
                key={parcel.id}
                layout
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectParcel(parcel)}
                className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(6,95,70,0.14)] transition-shadow cursor-pointer border border-[#bec9c2]/20 group will-change-transform"
              >
                {/* Media Viewport with Overlay Tags */}
                <div className="relative w-full h-48 bg-[#dee8ff] overflow-hidden">
                  <img
                    alt={parcel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={parcel.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#263143]/80 via-transparent to-black/30"></div>

                  {/* Pinned Top Tags */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-sm">
                      <span
                        className={`material-symbols-outlined text-[15px] ${
                          parcel.statusTagType === 'clu' ? 'text-[#9b4500]' : 'text-[#004532]'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {parcel.statusTagType === 'clu' ? 'gavel' : parcel.statusTagType === 'green' ? 'park' : 'shield'}
                      </span>
                      <span
                        className={`text-xs font-bold tracking-tight ${
                          parcel.statusTagType === 'clu' ? 'text-[#9b4500]' : 'text-[#004532]'
                        }`}
                      >
                        {parcel.statusTag}
                      </span>
                    </div>

                    <button
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center pointer-events-auto transition-colors shadow-sm ${
                        isFav ? 'bg-white text-[#9b4500]' : 'bg-white/80 text-[#111c2d] hover:bg-white'
                      }`}
                      onClick={(e) => toggleFavorite(parcel.id, e)}
                      type="button"
                      aria-label="Save to favorites"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Media Floating Geospatial Meta */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs bg-black/40 backdrop-blur-md px-2 py-0.5 rounded font-medium">
                      <span className="material-symbols-outlined text-[14px] text-[#97f5cc]">
                        {parcel.type === 'Industrial' ? 'electric_bolt' : parcel.type === 'Orchard' ? 'water' : 'satellite_alt'}
                      </span>
                      <span>{parcel.surveyRef}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        parcel.badgeType === 'rera'
                          ? 'bg-[#065f46] text-white'
                          : parcel.badgeType === 'foothills'
                          ? 'bg-white/30 backdrop-blur-md text-white'
                          : 'bg-[#fd8a42] text-white'
                      }`}
                    >
                      {parcel.badgeText || parcel.subBadge}
                    </span>
                  </div>
                </div>

                {/* Parcel Body Specs */}
                <div className="p-3.5 flex flex-col gap-2">
                  <div>
                    <div className="flex items-center gap-1 text-[#3f4944] text-[11px] mb-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#004532]">
                        location_on
                      </span>
                      <span className="font-medium truncate">{parcel.location}</span>
                    </div>
                    <h2 className="text-base font-bold text-[#111c2d] leading-tight group-hover:text-[#004532] transition-colors">
                      {parcel.title}
                    </h2>
                  </div>

                  {/* Micro Feature Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 py-0.5">
                    {parcel.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e7eeff] text-[#004532] text-[11px] font-medium"
                      >
                        <span className="material-symbols-outlined text-[13px]">{feat.icon}</span>
                        <span>{feat.label}</span>
                      </span>
                    ))}
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#e7eeff]">
                    <div>
                      <div className="text-lg text-[#004532] font-extrabold tracking-tight">
                        {parcel.pricePerUnit}{' '}
                        <span className="text-xs text-[#3f4944] font-normal">{parcel.unit}</span>
                      </div>
                      <div className="text-[11px] text-[#3f4944]">
                        Total {parcel.totalValue} {parcel.stampDutyEst && `• Stamp Duty Est. ${parcel.stampDutyEst}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        className="h-10 px-3 rounded-lg bg-[#e7eeff] text-[#004532] font-semibold text-xs flex items-center justify-center hover:bg-[#dee8ff] transition-colors"
                        type="button"
                        title="View Cadastral Map"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectParcel(parcel);
                        }}
                      >
                        <span className="material-symbols-outlined text-[18px]">map</span>
                      </button>

                      <button
                        className={`h-10 px-3.5 rounded-lg text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95 ${
                          parcel.type === 'Industrial'
                            ? 'bg-[#9b4500] hover:bg-[#763300]'
                            : 'bg-[#065f46] hover:bg-[#004532]'
                        }`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (parcel.type === 'Industrial') {
                            showToast('Connecting to Apex Logistics direct owner helpline...');
                          } else {
                            onBookVisit(parcel);
                          }
                        }}
                      >
                        <span>
                          {parcel.type === 'Industrial' ? 'Contact Owner' : parcel.type === 'Orchard' ? 'View Parcel' : 'Book Visit'}
                        </span>
                        <span className="material-symbols-outlined text-[16px]">
                          {parcel.type === 'Industrial' ? 'call' : 'chevron_right'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>

      {/* Sticky Floating Action Bar for Instant Verification Radar */}
      <aside className="sticky bottom-20 z-30 mx-4 mt-3 flex justify-center">
        <button
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#9b4500] text-white shadow-[0_8px_20px_rgba(155,69,0,0.35)] hover:bg-[#682c00] transition-all active:scale-95 group"
          onClick={onOpenInstantTitle}
          type="button"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffdbca] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffdbca]"></span>
          </span>
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-45 transition-transform">
            radar
          </span>
          <span className="text-xs font-bold tracking-wide uppercase">Instant Title Search</span>
        </button>
      </aside>
    </div>
  );
};
