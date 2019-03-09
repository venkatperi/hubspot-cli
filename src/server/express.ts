import express from 'express'
import {config} from '../config'
const express = require( 'express' );
const httpError = require( 'http-errors' );
const logger = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const cookieParser = require( 'cookie-parser' );
const compress = require( 'compression' );
const methodOverride = require( 'method-override' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const expressSessionMiddleware = require( 'express-session' );
const routes = require( '../routes/index.route' );
const config = require( './config' );
// const passport = require('./passport')

const linkedin = require( './linkedin' )
module.exports = () => {
    const app =  express()
    app.use( helmet() );

// enable CORS - Cross Origin Resource Sharing
    app.use( cors() );

// app.use(passport.initialize());
    let promise = linkedin( { app } )

// API router
// app.use('/', routes);

    app.get('/favicon.ico', (req, res) => {
        res.send('')
    })

// catch 404 and forward to error handler
    app.use( ( req, res, next ) => {
        const err = new httpError( 404 )
        return next( err );
    } );

// error handler, send stacktrace only during development
    app.use( ( err, req, res, next ) => {

        // customize Joi validation errors
        if ( err.isJoi ) {
            err.message = err.details.map( e => e.message ).join( '; ' );
            err.status = 400;
        }

        res.status( err.status || 500 ).json( {
            message: err.message,
        } );
        next( err );
    } );

    app.listen( config.port, () => {
        console.info( `server started on port ${ config.port } (${ config.env })` );
    } );

    return promise;

}
