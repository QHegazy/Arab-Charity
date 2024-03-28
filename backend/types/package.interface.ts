export interface BaseCommodity {
  Title: string;
  Description: string;
}

export interface Commodity extends BaseCommodity {
  Commodity: Commodity;
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
