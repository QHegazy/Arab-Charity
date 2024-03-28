export interface BaseCommodity {
  title: string;
  description: string;
}

export interface CommonValues {
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  Verified: boolean;
}

export interface Commodity extends BaseCommodity {
  Commodity: string;
}
export interface Food extends BaseCommodity {
  Food: string;
}

export interface RealEstate extends BaseCommodity {
  RealEstate: string;
  Time: string;
  Location: string;
}

export interface Ticket extends BaseCommodity {
  Ticket: string;
  ExpiryDate: string;
}

export interface FinancialAid extends BaseCommodity {
  Currency: string;
}
export interface Course extends BaseCommodity {
  Topic: string;
  Duration: string;
}
export interface LegalSupport extends BaseCommodity {
  Name: string;
}
