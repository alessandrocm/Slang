/* global describe, beforeEach, it */
'use strict';

var expect = require('chai').expect;
var EventEmitter = require('events').EventEmitter;
var Promise = require('bluebird');
var SlackService = require('./../lib/slackService');
var plugins = require('./../plugins');
var echoPlugin = require('./../plugins/echo');

describe('Plugin', function () {
	var PLUGINS_DIR = './../test/fixtures/plugins';
	describe('#loadPlugins',function(){
		var app;
		beforeEach(function(done){
			app = new EventEmitter();
			done();
		});
		it('should load all plugins',function(done){
			var pluginCount = 0;
			app.use = function(command, plugin) {
				pluginCount += 1;
			};
			plugins({
				directory	:	PLUGINS_DIR,
				slang		:	app
			});
			expect(pluginCount).to.be.equal(2);
			done();
		});
	})
});