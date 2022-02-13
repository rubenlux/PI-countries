/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);

describe("----Country routes----", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Country.sync({ force: true }));
  describe("----GET /countries----", () => {
    it("should get 200", () => agent.get("/countries").expect(200));
  });
  describe("----GET /countries/:id----", () => {
    it("should get 200", () => {
      return Country.create({
        id: "SAV",
        name: "SAV example",
        flags: "SAV",
        continent: "SAV",
        capital: "SAV",
      }).then(() => {
        return agent.get("/countries/SAV").expect(200);
      });
    });
    it("should get 404 => abcs", () =>
      agent.get("/countries/abcs").expect(404));
    it("should get 404 => 123", () => agent.get("/countries/123").expect(404));
  });
  describe("----(query) GET /countries?name=...----", () => {
    it("(query) should get 404 => example", () => {
      return Country.create({
        id: "Ariel",
        name: "Ariel example",
        flags: "Ariel",
        continent: "Ariel",
        capital: "Ariel",
      }).then(() => {
        return agent.get("/countries?name=example").expect(200);
      });
    });
    it("(query) should get 404 => errores", () => {
      return agent.get("/countries?name=error").expect(404);
    });
  });
});
