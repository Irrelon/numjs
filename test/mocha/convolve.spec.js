'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var _ = require('lodash');
var nj = require('../../src');

describe('convolve', function () {
    it('should work on vectors', function () {
        var x = nj.float32([0,0,1,2,1,0,0]),
            filter = [-1,0,1],
            conv = nj.convolve(x, filter);
        expect(conv.round().tolist())
            .to.eql([-1, -2,  0,  2,  1]);
        expect(conv.dtype).to.be('float32');
    });

    it('should work on matrix', function () {
        var x = nj.arange(256).reshape(16,16),
            sobelFilterH = nj.array([[ 1, 2, 1], [ 0, 0, 0], [-1,-2,-1]]),
            sobelFilterV = sobelFilterH.T;
        var gX1 = nj.convolve(x, sobelFilterV),
            gH1 = nj.convolve(x, sobelFilterH);

        var gX2 = x.convolve([[1, 0,-1]]).convolve([[1],[2],[1]]),
            gY2 = x.convolve([[1, 2, 1]]).convolve([[1],[0],[-1]]);

        expect(gX1.round().tolist()).to.eql(gX2.round().tolist());
        expect(gH1.round().tolist()).to.eql(gY2.round().tolist());
    });
});