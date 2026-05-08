export interface SignalInterface {
  id: number;
  pair: string;
  tradeType: "BUY" | "SELL";
  logo: string;
  logoBg: string;
  date: string;
  time: string;
  entryPrice: number;
  tp: number;
  sl: number;
  result: "SUCCESS" | "BAD" | "EVEN";
  status: "ACTIVE" | "EXPIRED";
  followers: number;
  volume: string;
  leverage?: string;
}
