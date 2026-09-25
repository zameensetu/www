export type TabType = 'explore' | 'details' | 'list-land' | 'my-land';

export interface LandParcel {
  id: string;
  title: string;
  location: string;
  state: string;
  district: string;
  tehsil: string;
  khasraNo: string;
  surveyRef: string;
  acres: number;
  sqYd?: number;
  sqM?: number;
  pricePerUnit: string;
  unit: '/ Acre' | '/ Sq.Ft';
  totalValue: string;
  totalNumericValue: number;
  circleRate?: string;
  stampDutyEst?: string;
  type: 'Agricultural' | 'Industrial' | 'Commercial' | 'Residential' | 'Orchard';
  statusTag: string;
  statusTagType: 'verified' | 'clu' | 'green';
  subBadge?: string;
  badgeType?: 'registry' | 'rera' | 'foothills';
  badgeText?: string;
  imageUrl: string;
  imageAlt: string;
  features: Array<{ icon: string; label: string }>;
  legalScore?: number;
  legalStatus?: string;
  gpsCoords?: string;
  roadFrontage?: string;
  roadType?: string;
  soilQuality?: string;
  waterResources?: string;
  electricity?: string;
  ownerName?: string;
  ownerLineage?: string;
  ownerPhoto?: string;
  fieldInspector?: string;
  inspectionDate?: string;
  perimeter?: string;
}

export interface LandHolding {
  id: string;
  title: string;
  parcelTag: string;
  khasraNo: string;
  acres: number;
  imageUrl: string;
  statusBadge: string;
  statusBadgeType: 'farming' | 'leased' | 'marketplace';
  valuedAt?: string;
  askingPrice?: string;
  geoFenceStatus?: string;
  propertyTaxDue?: {
    days: number;
    amount: string;
  };
  leaseDetails?: {
    tenant: string;
    monthlyRevenue: string;
    nextAutoCredit: string;
    autoDebit: boolean;
    validTill: string;
  };
  marketplaceStats?: {
    enquiries: number;
    visitsBooked: number;
    listingId: string;
  };
}
