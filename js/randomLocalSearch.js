// circuit with single gate for now
var forwardMultiplyGate = function(x, y) {
    return x * y;
};

var derivationMultiGate = function(x, y, partialVarNum) {
    var out = forwardMultiplyGate(x, y);
    var h = 0.0001;
    if(partialVarNum == 1) {
        var xph = x + h; 
        var out2 = forwardMultiplyGate(xph, y); 
        var x_derivative = (out2 - out) / h;
        return x_derivative;
    }
    else if(partialVarNum == 2) {
        var yph = y + h;
        var out2 = forwardMultiplyGate(x, yph); 
        var y_derivative = (out2 - out) / h;
        return y_derivative
    }
    else {
        process.exit(1)
    }


};

var x = -2, y = 3; // some input values
var x_try = x, y_try = y

// try changing x, y randomly small amounts and keep track of what works best
var tweak_amount = 0.01;
var best_out = -Infinity;
var best_x = x, best_y = y;
//x_derivative = Math.random() * 2 - 1;
//y_derivative = Math.random() * 2 - 1;

for (var k = 0; k < 10000; k++) {

    x_derivative = y_try;//derivationMultiGate(x_try, y_try, 1);
    y_derivative = x_try;//derivationMultiGate(x_try, y_try, 2);
    //console.log("xd: " + x_derivative);
    //console.log("yd: " + y_derivative);

    var x_try = x_try + tweak_amount * x_derivative; // tweak x a bit
    var y_try = y_try + tweak_amount * y_derivative;
    var out = forwardMultiplyGate(x_try, y_try);
    if (out > best_out) {
        // best improvement yet! Keep track of the x and y
        best_out = out;
        best_x = x_try, best_y = y_try;
    }
    //console.log("x: " + best_x);
    //console.log("y: " + best_y);
    console.log("o: " + best_out);
}

//console.log("x: " + best_x);
//console.log("y: " + best_y);
console.log("o: " + best_out);
