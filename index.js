const app = require('./app');

const port = process.env.PORT || 5010;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));