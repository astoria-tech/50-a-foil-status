const puppeteer = require("puppeteer");

const getDataByPage = async (url, foiaIds = []) => {
  console.log(`Getting data from ${url} ...`);
  const response = await getData(url);

  const accumlatedFoiaIds = foiaIds.concat(response.foiaIds);

  if (!response.nextPageLink) {
    return accumlatedFoiaIds;
  } else {
    return getDataByPage(response.nextPageLink, accumlatedFoiaIds);
  }
};

const getData = async (url) => {
  const browserOpts =
    process.env.NODE_ENV === "debug" ? { headless: false, devtools: true } : {};
  const browser = await puppeteer.launch(browserOpts);
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitFor(1000);

  const data = await page.evaluate(() => {
    let links = document.querySelectorAll(".st-val > .bold");

    let foiaIds = Array.from(links).map((anchorEl) => {
      const regex = /\d+$/;

      const [jurisdictionId, foiaId] = anchorEl.href
        .split("/")
        .filter((el) => regex.test(el))
        .map((el) => regex.exec(el)[0]);

      return {
        foiaReq: {
          id: foiaId,
        },
        jurisdiction: {
          id: jurisdictionId,
        },
      };
    });

    let nextPage = Array.from(
      document.querySelector(".pagination__links").querySelectorAll("a")
    ).filter((anchorEl) => {
      return anchorEl.innerText === "Next Page";
    })[0];

    return {
      nextPageLink: (nextPage && nextPage.href) || null,
      foiaIds,
    };
  });

  process.env.NODE_ENV !== "debug" && browser.close();
  return data;
};

module.exports = getDataByPage;
