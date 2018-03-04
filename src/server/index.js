import hapiPlugins from './config/plugin';
import routes from './config/routes';

const Path = require('path');
const Hapi = require('Hapi');
const server = new Hapi.Server();

const host = process.env.NODE_ENV || 'localhost';
const port = 3000;

server.connection({ host, port });

//Localhost configuration
if (host === 'localhost') {
  const Webpack = require('webpack');
  const Config = require('../../webpack.config.js');
  const compiler = Webpack(Config);

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    host,
    port,
    historyApiFallback: true,
    publicPath: Config.output.publicPath,
    quiet: true  // important for webpack-dashboard to work
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
  });

  server.ext('onRequest', (request, reply) => {

      devMiddleware(request.raw.req, request.raw.res, (err) => {

          if (err) {
              return reply(err);
          }

          reply.continue();
      });
  });

  server.ext('onRequest', (request, reply) => {

    hotMiddleware(request.raw.req, request.raw.res, (err) => {

        if (err) {
            return reply(err);
        }

        reply.continue();
    });
  });
}

server.register(hapiPlugins, (err) =>  {

  if (err) return console.error(err);
  
    // Add the React-rendering view engine
    server.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        compileOptions: {},
        relativeTo: __dirname,
        path: '../views'
    });

   // Add main app route
    server.route(routes.config);

    server.start(err => {
        if (err) {
            console.error( 'Error was handled!' );
            console.error( err );
        }
        console.log( `Server started at address ${ server.info.uri }` );
    });
});
