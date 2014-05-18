/*!
 * Browser-sync config file
 * http://halffullstudio.com
 * @version 0.2
 * @author Ben Boarder
 * @copyright Halffull Studio ©2014
____*/

module.exports = {
	files: ["../css/style.css"],
	exclude: false,
	server: {
		baseDir: "../"
	},
	proxy: false,
	startPath: null,
	ghostMode: {
		clicks: true,
		links: true,
		forms: true,
		scroll: true
	},
	open: true,
	xip: false,
	timestamps: true,
	fileTimeout: 1000,
	injectChanges: true,
	scrollProportionally: true,
	scrollThrottle: 0,
	notify: true,
	host: null,
	excludedFileTypes: [],
	reloadDelay: 0
};
