module.exports = {
    assetsDir: "static",
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