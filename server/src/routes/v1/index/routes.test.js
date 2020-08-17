const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../app");

chai.use(chaiHttp);
const { expect } = chai;

describe("index routes", function () {
  let requester;

  before(function () {
    requester = chai.request(app).keepOpen();
  });

  describe("GET /v1/", () => {
    it("the response should be an array", async function () {
      const res = await requester.get("/v1/");
      expect(res.body).to.be.an("array");
    });
  });

  after(function () {
    requester.close();
  });
});
