const url = new URL(process.env.DB_URL);

console.log({
  host: url.hostname,
  port: url.port,
  database: url.pathname
});