import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick?: (type: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onActionClick,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Satellite Sentinel Radar Scan OK',
      desc: 'Perimeter intact, zero encroachment detected across Sohna & Rewari holdings.',
      time: '12m ago',
      icon: 'satellite_alt',
      iconColor: 'text-[#004532]',
      unread: true,
    },
    {
      id: '2',
      title: 'Rent Credit Received: ₹1,80,000',
      desc: 'Auto-credited from AgriLogix Cold Chains Ltd for Rewari Logistics Hub.',
      time: '2h ago',
      icon: 'payments',
      iconColor: 'text-[#065f46]',
      unread: true,
    },
    {
      id: '3',
      title: 'New Institutional Investor Enquiry',
      desc: 'Godrej Properties Land Desk submitted inquiry on Pataudi Road Corner Plot.',
      time: '5h ago',
      icon: 'real_estate_agent',
      iconColor: 'text-[#9b4500]',
      unread: false,
    },
    {
      id: '4',
      title: 'Haryana Jamabandi Digital Portal Synced',
      desc: 'Record of Rights (RoR) verified hash for Khasra 142/12 renewed.',
      time: '1d ago',
      icon: 'verified',
      iconColor: 'text-[#004532]',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#263143]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004532] text-[24px]">
              notifications
            </span>
            <div>
              <h3 className="text-base font-bold text-[#111c2d]">Cadastral Notifications</h3>
              <p className="text-[11px] text-[#3f4944]">Real-time Land Registry & Geofence Alerts</p>
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

        <div className="divide-y divide-[#f0f3ff]">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`py-3 flex items-start gap-3 cursor-pointer hover:bg-[#f0f3ff]/50 px-1 rounded-lg transition-colors ${
                n.unread ? 'bg-[#f0f3ff]/30' : ''
              }`}
              onClick={() => {
                if (onActionClick) onActionClick(n.id);
                onClose();
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#e7eeff] flex items-center justify-center shrink-0 mt-0.5">
                <span className={`material-symbols-outlined text-[18px] ${n.iconColor}`}>
                  {n.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#111c2d] truncate">{n.title}</h4>
                  <span className="text-[10px] text-[#6f7973]">{n.time}</span>
                </div>
                <p className="text-[11px] text-[#3f4944] mt-0.5 leading-snug">{n.desc}</p>
              </div>
              {n.unread && (
                <span className="w-2 h-2 rounded-full bg-[#fd8a42] shrink-0 mt-1"></span>
              )}
            </div>
          ))}
        </div>

        <button
          className="w-full py-2.5 rounded-lg bg-[#f0f3ff] text-[#004532] text-xs font-bold hover:bg-[#e7eeff] transition-colors"
          onClick={onClose}
          type="button"
        >
          Mark All As Read
        </button>
      </div>
    </div>
  );
};
