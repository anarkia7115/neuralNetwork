#!/usr/bin/env nodejs

var X = [ [1.2, 0.7], [-0.3, 0.5], [3, 2.5] ] // array of 2-dimensional data
var y = [1, -1, 1] // array of labels
var w = [0.1, 0.2, 0.3] // example: random numbers
var alpha = 0.1; // regularization strength

function cost(X, y, w) {

    var total_cost = 0.0;
    N = X.length;
    for(var i=0;i<N;i++) {

        var xi = X[i];
        var score = w[0] * xi[0] + w[1] * xi[1] + w[2];

        var yi = y[i];
        var costi = Math.max(0, - yi * score + 1);
        console.log('example' + i + ': xi = (' + xi + ') and label = ' + yi);
        console.log('  score computed to be ' + score.toFixed(3));
        console.log('  => cost computed to be ' + costi.toFixed(3));
        total_cost += costi;
    }

    // regularization cost
    reg_cost = alpha * (w[0]*w[0] + w[1]*w[1]);
    console.log('regularization cost for current model is ' + reg_cost.toFixed(3));
    total_cost += reg_cost;

    console.log('total cost is ' + total_cost.toFixed(3));
    return total_cost;
}

cost(X, y, w)
