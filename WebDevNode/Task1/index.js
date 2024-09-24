// server.js
import http from 'http';
import url from 'url';

const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Set default content type to JSON
  res.setHeader('Content-Type', 'application/json');

  // Defined muultiple routes 
  const routes = {
    '': () => {
      res.setHeader('Content-Type', 'text/plain');
      res.end('Welcome to the homepage!');
    },
    'hello': () => {
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');
    },
    'api/users': () => {
      const users = [
        { id: 1, name: 'Syed Ali Abbas' },
        { id: 2, name: 'Hamid' }
      ];
      res.end(JSON.stringify(users));
    },
    'api/products': () => {
      const products = [
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Smartphone', price: 499.99 }
      ];
      res.end(JSON.stringify(products));
    }
  };

  // Check if the route exists
  if (routes[trimmedPath]) {
    routes[trimmedPath]();
  } else {
    // Route not found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});