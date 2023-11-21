export interface TransactionData {
  id: string;
  name: string;
  type: string;
  regions: string[];
  sector: string;
  subsector: string;
  PPP: boolean;
  sizeValueUSD: number;
  status: string;
}
