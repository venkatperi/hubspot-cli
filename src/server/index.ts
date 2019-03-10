import * as express from 'express'
import { NotFound } from 'http-errors';
import * as cors from 'cors';

import { config } from '../config'
import oauthHandler from './hubspot';

export function authenticate() {
    const app = express()

    app.use(cors());

    app.use((req, res, next) => {
        console.log(req.url)
        next()
    })

    let promise = oauthHandler({
        baseUrl: '/auth',
        name: 'hubspot',
        app
    })

    // annoying
    app.get('/favicon.ico', (req, res) => {
        res.send('')
    })

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new NotFound()
        return next(err);
    });


    app.listen(config.get('port'), () => {
        console.info(`server started on port ${config.get('port')} (${config.get('env')})`);
    });

    return promise;

}
