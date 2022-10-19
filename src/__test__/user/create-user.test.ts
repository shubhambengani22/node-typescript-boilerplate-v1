import { Express } from "express";
import { Prisma } from "@prisma/client";
import supertest from "supertest";
import createNewUser from "./data/createNewUser.json";
import { getApp } from "@server";
import { prisma } from "@store";

let app: Express;
let request: supertest.SuperTest<supertest.Test>;

const createUser = async (data: Prisma.UserCreateInput) => {
  await prisma.user.create({ data });
};

describe("POST /user", () => {
  beforeAll(async () => {
    app = getApp();
    request = supertest(app);
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  test("returns 200 OK with the correct request body", async () => {
    const req = createNewUser.positiveTests.baseUserPayload;

    const res = await request.post("/api/user").send(req);

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(req.name);
    expect(res.body.email).toEqual(req.email);
    expect(res.body.role).toEqual(req.role);
  });

  test("returns 400 if email is invalid.", async () => {
    const req = createNewUser.negativeTests.invalidEmail;

    const res = await request.post("/api/user").send(req);

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("DEFAULT_ERRORS.VALIDATION_FAILED");
    expect(res.body.statusCode).toEqual(400);
    expect(res.body.failures[0].field).toEqual("email");
    expect(res.body.failures[0].message).toEqual("Enter a valid email.");
  });

  test("returns 400 when the email already exists.", async () => {
    const req: Prisma.UserCreateInput = {
      name: "test",
      email: "test@gmail.com",
      role: "USER",
      password: "test@1234",
    };

    await createUser(req);

    const newUser = createNewUser.negativeTests.emailExists;

    const res = await request.post("/api/user").send(newUser);

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("DEFAULT_ERRORS.VALIDATION_FAILED");
    expect(res.body.statusCode).toEqual(400);
    expect(res.body.failures[0].field).toEqual("email");
    expect(res.body.failures[0].message).toEqual(
      `User with email: ${newUser.email} already exists.`
    );
  });

  test("return 400 when role is neither USER nor ADMIN.", async () => {
    const req = createNewUser.negativeTests.invalidRole;

    const res = await request.post("/api/user").send(req);

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("DEFAULT_ERRORS.VALIDATION_FAILED");
    expect(res.body.statusCode).toEqual(400);
    expect(res.body.failures[0].field).toEqual("role");
    expect(res.body.failures[0].message).toEqual(
      "Role should be either USER or ADMIN."
    );
  });

  test("returns 400 when the password does not satisfy the conditions.", async () => {
    const req = createNewUser.negativeTests.invalidPassword;

    const res = await request.post("/api/user").send(req);

    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual("DEFAULT_ERRORS.VALIDATION_FAILED");
    expect(res.body.statusCode).toEqual(400);
    expect(res.body.failures[0].field).toEqual("password");
    expect(res.body.failures[0].message).toEqual(
      "Password should be 6 to 16 characters and should contain atleast a number and a special character."
    );
  });
});
