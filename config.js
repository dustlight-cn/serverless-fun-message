const config = {
    "development": {
        "key": "value-dev"
    },
    "production": {
        "key": "value-prod"
    }
};
if (process.env.mode != null)
    process.env.mode = process.env.mode.trim()

module.exports = process.env.mode == "development" ? config.development :
    process.env.mode == "production" ? config.production : config.production