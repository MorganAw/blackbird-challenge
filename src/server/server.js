import express   from 'express';
import favicon   from 'serve-favicon';
import path      from 'path';
import pug       from 'pug';
import useRoutes from './config/routes';

// Instantiate server components
const server = new express();
const router = express.Router();

// Set view engines
server.set(
  'views',
  path.join(__dirname, '..', 'resources', 'templates')
);
server.set('view engine', 'pug');

// Set static + favicon paths
let root_dir = path.join(__dirname, '..', '..');
let static_dir = path.join(root_dir, 'static');
server.use(express.static(static_dir));
server.use(favicon(path.join(static_dir, 'img', 'favicon.ico')));

// Apply request middleware
server.disable('x-powered-by');

// Handle routing
useRoutes(server, router);

// Start the server
let port = process.env.PORT || 8080;
let serverInstance = server.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    let mode = server.settings.env;
    console.info('App listening on port %s in %s mode', port, mode);
  }
});

export default serverInstance;