export interface CommonValues {
  CreatedAt: Date;
}
export interface Commodity extends CommonValues {
  Commodity: string;
}

export interface Food extends CommonValues {
  Food: string;
  mount: string;
}

export interface RealEstate extends CommonValues {
  realEstate: string;
  time: string;
}

export interface Ticket extends CommonValues {
  Ticket: string;
  time: string;
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
