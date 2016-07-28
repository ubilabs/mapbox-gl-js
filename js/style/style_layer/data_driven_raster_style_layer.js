'use strict';

var util = require('../../util/util');
var StyleLayer = require('../style_layer');

function DataDrivenRasterStyleLayer() {
    StyleLayer.apply(this, arguments);
}

module.exports = DataDrivenRasterStyleLayer;

DataDrivenRasterStyleLayer.prototype = util.inherit(StyleLayer, {});
