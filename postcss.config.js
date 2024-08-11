module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          [
            "postcss-pxtorem",
            {
              rootValue: 16,
              propList: ["*"],
            },
          ],
          [
            "autoprefixer",
            {
              flexbox: "no-2009",
            },
          ],
        ]
      : [],
};
