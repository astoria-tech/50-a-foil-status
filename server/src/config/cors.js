let allowList = [];

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === "development") {
      const localDevOrigins = ["http://localhost:3000", "http://localhost:3001", undefined];
      allowList = [...allowList, ...localDevOrigins];
    }

    if (allowList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;
