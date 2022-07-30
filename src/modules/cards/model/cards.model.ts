export enum CardStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export type Card = {
  cardID: string;
  cardAccount: string;
  cardNumber: string;
  expireDate: string;
  currency: string;
  status: CardStatus;
  balance: number;
  cardholderName: string;
};
