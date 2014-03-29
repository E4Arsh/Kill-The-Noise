/*
 * Utilities.js
 *
 * This is where extraneous and important functions are stored.
 *
 */

 var Utilities = exports.Utilities = {
 	escapeHTML: function (target) {
        if (!target) return false;
        target = target.replace(/&(?!\w+;)/g, '&amp;');
        target = target.replace(/</g, '&lt;');
        target = target.replace(/>/g, '&gt;');
        target = target.replace(/"/g, '&quot;');
        return target;
    },
    
	HueToRgb: function (m1, m2, hue) {
	    var v;
	    if (hue < 0)
	        hue += 1;
	    else if (hue > 1)
	        hue -= 1;

	    if (6 * hue < 1)
	        v = m1 + (m2 - m1) * hue * 6;
	    else if (2 * hue < 1)
	        v = m2;
	    else if (3 * hue < 2)
	        v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
	    else
	        v = m1;

	    return (255 * v).toString(16);
	},

	hashColor: function (name) {
	    var crypto = require('crypto');
	    var hash = crypto.createHash('md5').update(name).digest('hex');
	    var H = parseInt(hash.substr(4, 4), 16) % 360;
	    var S = parseInt(hash.substr(0, 4), 16) % 50 + 50;
	    var L = parseInt(hash.substr(8, 4), 16) % 20 + 25;

	    var m1, m2, hue;
	    var r, g, b
	        S /= 100;
	    L /= 100;
	    if (S == 0)
	        r = g = b = (L * 255).toString(16);
	    else {
	        if (L <= 0.5)
	            m2 = L * (S + 1);
	        else
	            m2 = L + S - L * S;
	        m1 = L * 2 - m2;
	        hue = H / 360;
	        r = this.HueToRgb(m1, m2, hue + 1 / 3);
	        g = this.HueToRgb(m1, m2, hue);
	        b = this.HueToRgb(m1, m2, hue - 1 / 3);
	    }

	    return 'rgb(' + r + ', ' + g + ', ' + b + ');';
	},
};