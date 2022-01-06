const clientConfig = require('./cfg/webpack.client.config');
const serverConfig = require('./cfg/webpack.server.config');

// webpack по-очереди сформирует бандлы для клиентской и серверной части 
module.exports = [clientConfig, serverConfig];
