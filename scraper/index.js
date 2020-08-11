const puppeteer = require("puppeteer");
const writeOutput = require("./writeOutput");

const init = async () => {
  try {
    const foiaIds = await getFoiaIdsByPage(
      "https://www.muckrock.com/foi/list/?page=1&per_page=100&projects=778"
    );

    console.log(`${foiaIds.length} ids collected.`);

    writeOutput(foiaIds);
  } catch (error) {
    console.log(error);
  }
};

const getFoiaIdsByPage = async (url, foiaIds = []) => {
  const response = await getData(url);

  const accumlatedFoiaIds = foiaIds.concat(response.foiaIds);

  if (!response.nextPageLink) {
    return accumlatedFoiaIds;
  } else {
    return getFoiaIdsByPage(response.nextPageLink, accumlatedFoiaIds);
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

    let foiaIds = Array.from(links).map((anchorEl) =>
      anchorEl.href
        .slice(anchorEl.href.lastIndexOf("-") + 1)
        .split("/")
        .join("")
    );

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

init();
