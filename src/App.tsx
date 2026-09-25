import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { DetailsScreen } from './components/screens/DetailsScreen';
import { ListLandScreen } from './components/screens/ListLandScreen';
import { MyLandScreen } from './components/screens/MyLandScreen';

// Modals
import { InstantTitleModal } from './components/modals/InstantTitleModal';
import { BookVisitModal } from './components/modals/BookVisitModal';
import { MakeOfferModal } from './components/modals/MakeOfferModal';
import { PropertyTaxModal } from './components/modals/PropertyTaxModal';
import { DeedVaultModal } from './components/modals/DeedVaultModal';
import { DroneInspectionModal } from './components/modals/DroneInspectionModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { ProfileModal } from './components/modals/ProfileModal';

import { EXPLORE_PARCELS } from './data/mockData';
import { LandParcel, LandHolding, TabType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedParcel, setSelectedParcel] = useState<LandParcel>(EXPLORE_PARCELS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');
  const [isMobileFrameView, setIsMobileFrameView] = useState(false);

  // Modal open states
  const [isInstantTitleOpen, setIsInstantTitleOpen] = useState(false);
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false);
  const [isPropertyTaxOpen, setIsPropertyTaxOpen] = useState(false);
  const [isDeedVaultOpen, setIsDeedVaultOpen] = useState(false);
  const [isDroneModalOpen, setIsDroneModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const showToast = (msg: string, icon: string = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleSelectParcel = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setActiveTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHoldingCadastralView = (_holding: LandHolding) => {
    setSelectedParcel(EXPLORE_PARCELS[0]);
    setActiveTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Loaded Cadastral Demarcation view for Khasra 142/12', 'map');
  };

  const handleBookVisit = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setIsBookVisitOpen(true);
  };

  const handleMakeOffer = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setIsMakeOfferOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col justify-between selection:bg-[#a6f2d1] selection:text-[#002116]">
      {/* Optional Desktop Floating Frame Toggle */}
      <aside className="hidden lg:flex fixed top-4 right-4 z-50 items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-[#bec9c2]/40 text-xs font-semibold text-[#111c2d]">
        <span className="material-symbols-outlined text-[16px] text-[#004532]">
          {isMobileFrameView ? 'smartphone' : 'devices'}
        </span>
        <span>View:</span>
        <button
          type="button"
          onClick={() => setIsMobileFrameView(!isMobileFrameView)}
          className="px-2.5 py-1 bg-[#065f46] text-white rounded-full text-[11px] font-bold hover:bg-[#004532] transition-colors"
        >
          {isMobileFrameView ? 'Phone Frame (420px)' : 'Full Width'}
        </button>
      </aside>

      {/* Main Container Wrapper (handles mobile frame toggle if on wide screen) */}
      <div
        className={`w-full flex-1 flex flex-col mx-auto transition-all ${
          isMobileFrameView
            ? 'max-w-[420px] my-4 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] border-4 border-[#263143] bg-[#f9f9ff] overflow-hidden min-h-[860px]'
            : 'max-w-xl'
        }`}
      >
        {/* Fixed Header */}
        <Header
          activeTab={activeTab}
          onNotificationClick={() => setIsNotificationsOpen(true)}
          onProfileClick={() => setIsProfileOpen(true)}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 w-full pt-16">
          {activeTab === 'explore' && (
            <ExploreScreen
              onSelectParcel={handleSelectParcel}
              onOpenInstantTitle={() => setIsInstantTitleOpen(true)}
              onBookVisit={handleBookVisit}
              showToast={showToast}
            />
          )}

          {activeTab === 'details' && (
            <DetailsScreen
              parcel={selectedParcel}
              onBookVisit={handleBookVisit}
              onMakeOffer={handleMakeOffer}
              onOpenDeedVault={() => setIsDeedVaultOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'list-land' && (
            <ListLandScreen
              showToast={showToast}
              onOpenDeedVault={() => setIsDeedVaultOpen(true)}
            />
          )}

          {activeTab === 'my-land' && (
            <MyLandScreen
              onPayTax={() => setIsPropertyTaxOpen(true)}
              onOpenDeedVault={() => setIsDeedVaultOpen(true)}
              onBookDrone={() => setIsDroneModalOpen(true)}
              onViewCadastralMap={handleHoldingCadastralView}
              showToast={showToast}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Global Toast */}
      <Toast message={toastMessage} icon={toastIcon} />

      {/* Modals & Dialogs */}
      <InstantTitleModal
        isOpen={isInstantTitleOpen}
        onClose={() => setIsInstantTitleOpen(false)}
        onSelectParcel={(_khasra) => {
          setSelectedParcel(EXPLORE_PARCELS[0]);
          setActiveTab('details');
        }}
      />

      <BookVisitModal
        isOpen={isBookVisitOpen}
        onClose={() => setIsBookVisitOpen(false)}
        parcel={selectedParcel}
        onSuccess={(msg) => showToast(msg, 'verified')}
      />

      <MakeOfferModal
        isOpen={isMakeOfferOpen}
        onClose={() => setIsMakeOfferOpen(false)}
        parcel={selectedParcel}
        onSuccess={(msg) => showToast(msg, 'lock')}
      />

      <PropertyTaxModal
        isOpen={isPropertyTaxOpen}
        onClose={() => setIsPropertyTaxOpen(false)}
        onSuccess={(msg) => showToast(msg, 'receipt')}
      />

      <DeedVaultModal
        isOpen={isDeedVaultOpen}
        onClose={() => setIsDeedVaultOpen(false)}
      />

      <DroneInspectionModal
        isOpen={isDroneModalOpen}
        onClose={() => setIsDroneModalOpen(false)}
        onSuccess={(msg) => showToast(msg, 'flight')}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onActionClick={(type) => {
          if (type === '1') {
            setActiveTab('my-land');
            showToast('Showing Satellite Encroachment Sentinel Radar');
          } else if (type === '2') {
            setActiveTab('my-land');
            showToast('Showing Rent Tracker details');
          } else if (type === '3') {
            setActiveTab('my-land');
            showToast('Opening Buyer Enquiry on Pataudi Road plot');
          }
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
