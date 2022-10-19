import { Express } from "express";
import supertest from "supertest";
import { getApp } from "@server";

let app: Express;
let request: supertest.SuperTest<supertest.Test>;

describe("GET /healthcheck", () => {
  beforeAll(async () => {
    app = getApp();
    request = supertest(app);
  });

  test("returns 200 OK", async () => {
    const res = await request.get("/api/healthcheck");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
    expect(res.body.result).toEqual("ok");
  });
});
