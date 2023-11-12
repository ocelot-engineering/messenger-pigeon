import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';

import { signupRouter } from './routes/signup';
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';
// import { currentUserRouter } from './routes/current-user';

dotenv.config();

const app = express();
// app.set('trust proxy', true);
app.use(json());
// app.use(
//     cookieSession({
//         signed: false,
//         secure: false,
//     })
// );

app.use(signupRouter);
// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(currentUserRouter);

// app.use(errorHandler); // custom error handling

app.all('*', async (req, res) => {
    throw new Error('Route not found');
});

export { app };
