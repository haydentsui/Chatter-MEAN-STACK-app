var passport = require('passport'),
	url = require('url'),
	TwitterStrategy = require('passport-twitter').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function(){
	passport.use(new TwitterStrategy({
		consumerKey: config.twitter.clientID,
		consumerSecret: config.twitter.clientSecret,
		callbackURL: config.twitter.callbackURL,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		var providerData = profile._json;
		providerData.accesstoken = accessToken;
		providerData.refreshToken = refreshToken;

		var providerUserProfile = {
			fullName: profile.displayName,
      		username: profile.username,
      		provider: 'twitters',
      		providerId: profile.id,
      		providerData: providerData,
      		avatar: profile.photos ? profile.photos[0].value : '/image/defaultAvatarjpg'
		};

		users.saveOAuthUserProfile (req, providerUserProfile, done);
	}
	));

};