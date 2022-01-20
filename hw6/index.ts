import express from 'express';
import router from './src/routes';
import { createLogger } from './src/utils/logger';

const app = express();
const port = 3000;

const uncaughtExceptionLogger = createLogger('uncaughtException');
const unhandledRejectionLogger = createLogger('unhandledrejection');

process.on('uncaughtException', (err) => {
  uncaughtExceptionLogger.log('error', err);
});

process.on('unhandledRejection', (err, p ) => {
  unhandledRejectionLogger.log('error', new Error(JSON.stringify(p)));
});

app.use(express.json());

app.use('/api/v1', router);
app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
    res.status(500).send('Internal server error');
    next()
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});