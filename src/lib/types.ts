import { EventFilter } from "ethers";
import {
  IAccount,
  IAccountReserve,
  IReserve,
  IToken,
  ITokenPrice,
  IEvent,
} from "../models";

// ============ Types ============

// TODO - ethereum address, other contract address
export type ContractAddress = string;

// TODO - fix this stupid shit
export type DbBn = {
  type: "BigNumber";
  hex: string;
};
// ===============================

// ============ Enums ============
export enum EventNames {
  LIQUIDATION = "liquidation",
  PENDING_LIQUIDATION = "pending-liquidation",
  ARBITRAGE = "arbitrage",
  PENDING_ARBITRAGE = "pending-arbitrage",
  MAJOR_TOKEN_PRICE_CHANGE = "major-token-price-change",
  LIQUIDATABLE_ACCOUNT = "liquidatable-account",
}

// TODO - auto do this using mongo connection.collections perhaps...
export enum CollectionNames {
  CONFIGS = "configs",
  EVENTS = "events",
  ACCOUNTS = "accounts",
  ACCOUNT_RESERVES = "accountReserves",
  RESERVES = "reserves",
  TOKENS = "tokens",
  TOKEN_PRICES = "tokenPrices",
  TEST = "test",
}

// TODO - remove
export enum NetworkNames {
  MAINNET = "mainnet",
  POLYGON = "polygon",
  KOVAN = "kovan",
  AVALANCHE = "avalanche",
}

export enum ClientNames {
  AAVE = "aave",
  SUSHISWAP = "sushiswap",
  DYDX = "dydx",
  UNISWAP = "uniswap",
  COMPOUND = "compound",
  MAKER = "maker",
  CURVE = "curve",
  CHAINLINK = "chainlink",
  COINGECKO = "coingecko",
}
// ===============================

// ============ Constants ============

export const DAILY_MS: number = 60 * 60 * 24 * 1000;
export const HOURLY_MS: number = 60 * 60 * 1000;
export const FIVE_MINS_IN_MS: number = 60 * 5 * 1000;

// ==================================

// ============ Interfaces ============
export interface ClientFunction {
  name: string;
  args?: string;
  frequency: number;
}

export interface ClientFunctionResult {
  success: boolean;
  client: ClientNames;
  network: string;
  data: DatabaseUpdate[];
}

export interface DatabaseUpdate {
  collectionName: CollectionNames;
  data: any[];
  // data:
  //   | IToken[]
  //   | ITokenPrice[]
  //   | IReserve[]
  //   | IAccountReserve[]
  //   | IAccount[]
  //   | IEvent[];
}
export interface DatabaseUpdateResult {
  upsertedCount: number;
  modifiedCount: number;
  invalidCount: number;
  upsertedIds: string[];
  modifiedIds: string[];
  errors?: string[];
}
// ==================================

// ============ Classes ============
// ==================================
