export type MerchantInfo = {
  companyName: string;
  address: [number, number];
};

export type Transaction = {
  transactionID: string;
  cardAccount: string;
  cardID: string;
  cardNumber: string;
  cardExpireDate: string;
  cardholderName: string;
  cardStatus: 'active' | 'blocked';
  amount: number;
  currency: string;
  transactionDate: string;
  merchantInfo: MerchantInfo;
};
