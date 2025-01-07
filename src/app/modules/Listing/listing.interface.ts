export interface TRoomDetails {
  postcode: string;
  advertType: "wholeProperty" | "roomOnly";
  houseNumber: string;
  propertyType: string;
  addressLine2?: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  town: string;
  furnishingOptions:
    | "Furnished"
    | "Unfurnished"
    | "Furnishing at tenant choice";
  description: string;
}

export interface TTenancyDetails {
  monthlyRent: number;
  minTenancyLength: number;
  weeklyRent: number;
  maxTenancyLength: number;
  depositAmount: "2 Week's Rent" | "3 Week's Rent" | "1 Month's Rent";
  moveInDate: Date;
}

export interface TFeatures {
  billsIncluded: boolean;
  gardenAccess: boolean;
  parking: boolean;
  fireplace: boolean;
}

export interface TTenantPreferences {
  studentsAllowed: boolean;
  familiesAllowed: boolean;
  dssIncomeAccepted: boolean;
  petsAllowed: boolean;
  smokersAllowed: boolean;
}

export interface TAddListing {
  landlordEmail: string;
  propertyRoomDetails: TRoomDetails;
  tenancyDetails: TTenancyDetails;
  features: TFeatures;
  tenantPreferences: TTenantPreferences;
  availabilityDetails?: string;
  remoteVideoViewing: boolean;
  propertyPhotos: string[];
  youTubeUrl?: string;
}
