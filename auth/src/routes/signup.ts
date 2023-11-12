import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signup', async (req: Request, res: Response) => {
    // const result = validationResult(req);
    // if (result.isEmpty()) {
    //     const data = matchedData(req);
    //     res.status(200).send(`Hello ${data.name}`);
    // }
    // res.send({ errors: result.array() });

    res.send('Success');
});

export { router as signupRouter };
