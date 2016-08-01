'use strict';

var util = require('../../util/util');
var StyleLayer = require('../style_layer');

function DataDrivenRasterStyleLayer() {
    StyleLayer.apply(this, arguments);

    // some defaults
    this.paint['raster-value-min'] = 0;
    this.paint['raster-value-max'] = 100;
    this.paint['raster-data-min'] = 0;
    this.paint['raster-data-max'] = 100;
    this.paint['raster-value-color-mapping'] = [
        [0, 'rgba(0, 0, 0, 0.6)'],
        [1, 'rgba(255, 255, 255, 0.6)']
    ];

    this.createGradientTexture();
}

module.exports = DataDrivenRasterStyleLayer;

DataDrivenRasterStyleLayer.prototype = util.inherit(StyleLayer, {
    createGradientTexture() {
        console.log(this.paint);
        this.paint['raster-lookup-texture'] = createTexture(this.paint);
    },

    configureColorMapping(dataRange, valueRange, colors) {
        this.paint['raster-value-min'] = valueRange.min;
        this.paint['raster-value-max'] = valueRange.max;
        this.paint['raster-data-min'] = dataRange.min;
        this.paint['raster-data-max'] = dataRange.max;
        this.paint['raster-value-color-mapping'] = colors;

        this.createGradientTexture();
    }
});

function createTexture(paint) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 256;
    canvas.height = 1;

    context.fillStyle = createGradient(context, paint);
    context.fillRect(0, 0, 256, 1);

    return canvas;
}

function createGradient(context, paint) {
    const min = paint['raster-value-min'];
    const max = paint['raster-value-max'];
    const colors = paint['raster-value-color-mapping'];

    const gradient = context.createLinearGradient(0, 0, 256, 0);

    colors.forEach(([value, color]) => {
        const normalized = normalize(value, min, max);
        gradient.addColorStop(normalized, color);
    });

    return gradient;
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
}
