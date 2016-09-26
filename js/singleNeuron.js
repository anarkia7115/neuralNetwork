
var Unit = function(value, grad) {

    this.value = value;

    this.grad = grad;
}

var multiplyGate = function() { };

multiplyGate.prototype = {
    forward: function(u0, u1) {

        this.u0 = u0;
        this.u1 = u1;
        this.utop = new Unit(u0.value * u1.value, 0.0);
        return this.utop;
    },

    backward: function() {

        this.u0.grad += this.u1.value * this.utop.grad;
        this.u1.grad += this.u0.value * this.utop.grad;
    }
}

var addGate = function() { };
addGate.prototype = {
    forward: function(u0, u1) {

        this.u0 = u0;
        this.u1 = u1;
        this.utop = new Unit(u0.value + u1.value, 0.0);
        return this.utop;
    },

    backward: function() {

        this.u0.grad += 1 * this.utop.grad;
        this.u1.grad += 1 * this.utop.grad;
    }
}

var sigmoidGate = function() { 
    this.sig = function(x) { return 1 / (1 + Math.exp(-x)); }
};
sigmoidGate.prototype = {
    forward: function(u0) {

        this.u0 = u0;
        this.utop = new Unit(this.sig(this.u0.value), 0.0);
        return this.utop;
    },

    backward: function() {
        var s = this.sig(this.u0.value);
        this.u0.grad += (s * (1 - s)) * this.utop.grad;
    }
}

var a = new Unit(1.0, 0.0);
var b = new Unit(2.0, 0.0);
var c = new Unit(-3.0, 0.0);
var x = new Unit(-1.0, 0.0);
var y = new Unit(3.0, 0.0);

var mulg0 = new multiplyGate();
var mulg1 = new multiplyGate();
var addg0 = new addGate();
var addg1 = new addGate();
var sg0 = new sigmoidGate();

// do the forward pass
var forwardNeuron = function() {
    ax = mulg0.forward(a, x);
    by = mulg1.forward(b, y);
    axpby = addg0.forward(ax, by);
    axpbypc = addg1.forward(axpby, c);
    s = sg0.forward(axpbypc);
};
forwardNeuron();
console.log('circuit output: ' + s.value);

s.grad = 1.0;
sg0.backward();
addg1.backward();
addg0.backward();
mulg1.backward();
mulg0.backward();

var step_size = 0.01;
console.log('grad1: ' + [a.grad, b.grad, c.grad, x.grad, y.grad]);
a.value += step_size * a.grad;
b.value += step_size * b.grad;
c.value += step_size * c.grad;
x.value += step_size * x.grad;
y.value += step_size * y.grad;

forwardNeuron();
console.log('circuit output after one backprop: ' + s.value);

var forwardCircuitFast = function(a, b, c, x, y) {
    return 1/(1 + Math.exp( - (a*x + b*y + c)));
}
var a = 1, b = 2, c = -3, x = -1, y = 3;
var h = 0.0001;
var a_grad = (forwardCircuitFast(a+h,b,c,x,y) - forwardCircuitFast(a,b,c,x,y))/h;
var b_grad = (forwardCircuitFast(a,b+h,c,x,y) - forwardCircuitFast(a,b,c,x,y))/h;
var c_grad = (forwardCircuitFast(a,b,c+h,x,y) - forwardCircuitFast(a,b,c,x,y))/h;
var x_grad = (forwardCircuitFast(a,b,c,x+h,y) - forwardCircuitFast(a,b,c,x,y))/h;
var y_grad = (forwardCircuitFast(a,b,c,x,y+h) - forwardCircuitFast(a,b,c,x,y))/h;
console.log('grad2: ' + [a_grad, b_grad, c_grad, x_grad, y_grad]);
