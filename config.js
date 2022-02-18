const config = {
    "development": {
        "env": "dev",
        "api": {
            "auth": "https://api.dustlight.cn",
            "messenger": "https://messenger.dustlight.cn"
        }
    },
    "production": {
        "env": "prod",
        "api": {
            "auth": "https://api.dustlight.cn",
            "messenger": "https://messenger.dustlight.cn"
        }
    }
};
if (process.env.mode != null)
    process.env.mode = process.env.mode.trim()

module.exports = process.env.mode == "development" ? config.development :
    process.env.mode == "production" ? config.production : config.production