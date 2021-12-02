import mongoose from "mongoose";
import { expect } from "chai";
import { IToken, Token } from "../../src/models/token";
import { ITokenPrice, TokenPrice } from "../../src/models/token-price";
import {
  mockTokens,
  mockTokenPrices,
  mockTokenPricesUpdated,
  mockInvalidTokenPrices,
  mongodb_test_uri,
} from "../mockData";
import { ClientNames } from "../../src/lib/types";
import Logger from "../../src/lib/logger";

// Silence logs while running tests
Logger.transports.forEach((t) => (t.silent = true));

describe("Collection: token-prices", () => {
  before(async () => {
    await mongoose.connect(mongodb_test_uri);
  });

  beforeEach(async () => {
    // await mongoose.connection.dropDatabase();
    // await mongoose.connect(mongodb_test_uri);
    await TokenPrice.collection.deleteMany({});
    await Token.collection.deleteMany({});
    // let nDocs = await TokenPrice.countDocuments();
    // expect(nDocs).to.equal(0);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("should upsert TOKEN-PRICES", async () => {
    let res = await TokenPrice.addData(mockTokenPrices);
    expect(res.modifiedCount + res.upsertedCount).to.equal(
      mockTokenPrices.length
    );
  });

  it("should upsert TOKEN-PRICES already in db", async () => {
    let res1 = await TokenPrice.addData(mockTokenPrices);
    let res2 = await TokenPrice.addData(mockTokenPricesUpdated);
    expect(res2.modifiedCount + res2.upsertedCount).to.equal(
      mockTokenPrices.length
    );
    expect(res1.upsertedIds).to.have.all.members(res2.modifiedIds);
  });

  it("should handle adding invalid TOKEN-PRICES (returns nChanged=0 and doesn't add to db)", async () => {
    let res = await TokenPrice.addData(mockInvalidTokenPrices as any[]);
    expect(res.modifiedCount + res.upsertedCount).to.equal(0);
    expect(await TokenPrice.countDocuments()).to.equal(0);
  });

  it("should findLatestTokenPrice from source", async () => {
    let token = mockTokens[0];
    let src = ClientNames.COINGECKO;
    await TokenPrice.addData([
      {
        token: token,
        priceInEth: 999,
        source: src,
        lastUpdated: Date.now(),
      },
      {
        token: token,
        priceInEth: 456,
        source: src,
        lastUpdated: new Date().setDate(Date.now() - 1),
      },
      {
        token: token,
        priceInEth: 123,
        source: src,
        lastUpdated: new Date().setDate(Date.now() - 0.5),
      },
    ]);
    let latestTokenPrice = await TokenPrice.findLatestTokenPriceFromSource(
      token,
      src
    );
    expect(latestTokenPrice?.priceInEth).to.equal(999);
  });

  it("should getTokenPricesAcrossClients", async () => {
    // TODO
  });
});
