import express from 'express';
import { Request, Response } from 'express';
const PORT : Readonly<number> = 3001;
const app = express();


app.get('/', (req : Request, res : Response) => {
  res.send('hello world from burmese chit chat AUTHENTICATION service');
});

app.get('/login', (req : Request, res : Response) => {
  res.send('login page');
});


app.listen(PORT, () => {
    console.log('burmese chit chat authentication server is running on port ' + PORT);
});