'use strict';
const helpers = require('../helpers');
const passport = require('passport');

module.exports = () => {
    let routes = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': [
                helpers.isAuthenticated,
                (req, res, next) => {
                    res.render('rooms', {
                        user: req.user
                    });
                }
            ],
            '/chat': [
                helpers.isAuthenticated,
                (req, res, next) => {
                    res.render('chatroom', {
                        user: req.user
                    });
                }
            ],
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/auth/twitter': passport.authenticate('twitter'),
            '/auth/twitter/callback': passport.authenticate('twitter', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/auth/google': passport.authenticate('google'),
            '/auth/google/callback': passport.authenticate('google', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/logout': (req, res, next) => {
                req.logout();
                res.redirect('/');
            }
            // '/getsession': (req, res, next) => {
            //     res.send(`My favorite color: ${req.session.favColor}`);
            // },
            // '/setsession': (req, res, next) => {
            //     req.session.favColor = 'red';
            //     res.send('Session Set');
            // }
        },
        'post': {

        },
        'NA': (req, res, next) => {
            // process.cwd will map to folder of server.js, the folder that is running the main server file
            res.status(404).sendFile(`${process.cwd()}/views/404.htm`);
        }
    };

    return helpers.route(routes);
};

