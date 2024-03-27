export interface CommonValues {
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  Verified: boolean;
}
export interface Commodity extends CommonValues {
  Commodity: string;
  Kind: CommonValues;
}

export interface Food extends CommonValues {
  Food: string;
  Mount: string;
}

export interface RealEstate extends CommonValues {
  RealEstate: string;
  Time: string;
}

export interface Ticket extends CommonValues {
  Ticket: string;

  ExpiryDate: string;
}
export interface financialAid extends CommonValues {
  Mount: string;
  Currency: string;
}
export interface FinancialAid extends CommonValues {
  Mount: string;
  Currency: string;
}
export interface Course extends CommonValues {
  Topic: string;
  Duration: string;
}
export interface LegalSupport extends CommonValues {
  Topic: string;
  Duration: string;
}
export interface Money extends CommonValues {
  Mount: number;
}
