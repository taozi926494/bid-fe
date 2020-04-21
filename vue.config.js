module.exports = {
    assetsDir: "bid/static",
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                  @import "@/style/theme.scss";
                `
            }
        }
    }
}