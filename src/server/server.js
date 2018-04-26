import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import Handlebars from 'handlebars';
import hapiPlugins from './config/plugin';
import routes from './config/routes';
import webpackConfig from '../../webpack.config';

import Path from 'path';
import Hapi from 'Hapi';
const server = new Hapi.Server();

const host = process.env.NODE_ENV || 'localhost';
const port = 3000;

server.connection({ host: 'localhost', port });

//Localhost configuration
if (host === 'localhost' || host === 'development') {
  const webpackdevConfig = webpackConfig('development');
  const compiler = webpack(webpackdevConfig);

  const _devMiddleware = devMiddleware(compiler, {
    historyApiFallback: true,
    publicPath: webpackdevConfig.output.publicPath,
    quiet: true  // important for webpack-dashboard to work
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: () => {}
  });

  server.ext('onRequest', (request, reply) => {

      _devMiddleware(request.raw.req, request.raw.res, (err) => {

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
            html: Handlebars
        },
        compileOptions: {},
        relativeTo: __dirname,
        path: '../../dist/'
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
