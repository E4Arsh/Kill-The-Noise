var Profile = {
	avatar: function (user, height) {
	    return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + user.avatar + '.png' + '" align="left" height="' + height + '">';
	},

	customAvatar: function (user, height) {
	    return '<img src="http://71.92.60.231:5000/avatars/' + user.avatar + '" align="left" height="' + height + '"><br/>';
	},

	name: function (user) {
	    return '<b><font size="2" color="' + Utilities.hashColor(user.name) + '">' + user.name + '</font></b><br/>';
	},

	unregisteredName: function (user) {
	    return '<b><font size="2" color="' + Utilities.hashColor(user.name) + '">' + user.name + ' </b></font><font color="2">(Unregistered)</font><br/>';
	},

	group: function (config, user) {
	    if (config.groups[user.group] && config.groups[user.group].name) {
	        return config.groups[user.group].name + ' (' + user.group + ')<br/>';
	    } else {
	        return 'Regular User<br/>';
	    }
	},

	/*views: function (user) {
	    Source.stdinNumber('views.csv', user, 'views');
	    return 'Views: ' + user.views + ' | ';
	},

	location: function (user) {
	    Source.stdinString('location.csv', user, 'location');
	    if (user.location === '') {
	        user.location = 'Unknown';
	    }
	    return 'Location: ' + user.location + '<br/>';
	},*/

	money: function (user) {
	    io.stdinNumber('db/money.csv', user, 'money');
	    return '<i>Money:</i> ' + '<img src="http://cdn.bulbagarden.net/upload/8/8c/Pok%C3%A9monDollar.png" title="PokeDollar">' + user.money + '<br/>';
	},

	/*status: function (user) {
	    Source.stdinString('status.csv', user, 'status');
	    if (user.status === '') {
	        user.status = 'This user hasn\'t set their status yet.';
	    }
	    return 'Status: "' + user.status + '"';
	},

	statusTime: function (user) {
	    Source.stdinString('statusTime.csv', user, 'statusTime');
	    return ' <font color="gray">' + user.statusTime + '</font>';
	}*/
};

var cmds = {
	profile: function (target, room, user, connection) {
	    if (!this.canBroadcast()) return;

	    var targetUser = this.targetUserOrSelf(target);

	    if (!targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');

	    var height = 85;

	    //io.stdoutNumber('views.csv', user, 'views', 1);

	    var display = Profile.avatar(targetUser, height) + Profile.name(targetUser) + '<hr>' + Profile.group(config, targetUser) + Profile.money(targetUser);
	    return this.sendReplyBox(display);
	    /*if (!targetUser.authenticated) {
	        display = Profile.avatar(targetUser, height) + Profile.unregisteredName(targetUser) + '<hr>' + Profile.group(config, targetUser) + Profile.views(targetUser) + Profile.location(targetUser) + Profile.money(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser);
	        return this.sendReplyBox(display);
	    /*} else if (typeof (targetUser.avatar) === typeof ('')) { //checks for custom avatar
	        display = Profile.customAvatar(targetUser, height) + Profile.name(targetUser) + '<hr>' + Profile.group(config, targetUser) + Profile.views(targetUser) + Profile.location(targetUser) + Profile.money(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser);
	        return this.sendReplyBox(display);
	    } else {
	        return this.sendReplyBox(display);
	    }*/
	},
};

Object.merge(CommandParser.commands, cmds);
exports.cmds = cmds;