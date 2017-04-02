'use strict';
const helpers = require('../helpers');
const passport = require('passport');
const config  = require('../config');

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
                        user: req.user,
                        host: config.host
                    });
                }
            ],
            '/chat/:id': [
                helpers.isAuthenticated,
                (req, res, next) => {
                    // Find a chatroom with the given id
                    // Render it if the id is found
                    let getRoom = helpers.findRoomById(req.app.locals.chatrooms, req.params.id);
                    if (getRoom === undefined) {
                        return next();
                    } else {
                        res.render('chatroom', {
                            user: req.user,
                            host: config.host,
                            room: getRoom.room,
                            roomID: getRoom.roomID
                        });
                    }

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
            '/auth/google': passport.authenticate('google', { scope : ['profile', 'email'] }),
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

