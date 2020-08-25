const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../app");

chai.use(chaiHttp);
const { expect } = chai;

describe("index routes", function () {
  let requester;

  before(async function () {
    requester = await chai.request(app).keepOpen();
  });

  describe("GET /v1/latest", () => {
    it("the response should be an object", async function () {
      const res = await requester.get("/v1/latest");
      expect(res.body).to.be.an("object");
    });

    it("the response should have a meta property", async function () {
      const res = await requester.get("/v1/latest");
      expect(res.body).to.have.property("meta");
    });

    it("the response should have a foiaList property", async function () {
      const res = await requester.get("/v1/latest");
      expect(res.body).to.have.property("foiaList");
    });

    it("the response should have a foiaList property with 424 requests", async function () {
      const res = await requester.get("/v1/latest");
      expect(res.body.foiaList).to.have.lengthOf(424);
    });
  });

  after(function () {
    requester.close();
  });
});
