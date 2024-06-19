import express from 'express';
import uploadRouter from './route';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(uploadRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
