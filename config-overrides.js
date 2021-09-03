module.exports = {
    webpack: function(config, env) {
        // 这里修改config
        // react-app-rewired拦截后修改配置，然后按照配置进行脚本构建
        return config;
    }
}
