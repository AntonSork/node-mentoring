import express from 'express';
import router from './src/routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1', router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});