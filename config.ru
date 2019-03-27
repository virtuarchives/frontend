require 'bundler'
Bundler.require(ENV['RACK_ENV'].to_sym || :development)

$stdout.sync = true

require './server/controller.rb'
require './server/configuration.rb'

Configuration.instance.load!

map('/') { run Controller.new }