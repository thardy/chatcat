'use strict';
if (process.env.NODE_ENV === 'production') {
    // Offer production environment variables
    module.exports = {
        host: process.env.host || '',
        dbURI: process.env.dbURI,
        sessionSecret: process.env.sessionSecret,
        fb: {
            clientID: process.env.fbClientID,
            clientSecret: process.env.fbClientSecret,
            callbackURL: process.env.host + "/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos']
        },
        twitter: {
            clientID: process.env.twitterClientID,
            consumerSecret: process.env.twitterConsumerSecret,
            callbackURL: process.env.host + "/auth/twitter/callback",
            profileFields: ['id', 'displayName', 'photos']
        }
    };
} else {
    // Offer development variables
    module.exports = require('./development.json');
}

