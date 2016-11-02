#!/usr/bin/env python
# -*- coding: iso-8859-15 -*-

class Unit():
    
    def __init__(self, value, grad):

        self.value  = value
        self.grad   = grad

    def setGrad(self, gradValue):

        self.grad = gradValue

class multiGate():

    def forward(self, u0, u1):

        self.u0 = u0
        self.u1 = u1
        self.utop = Unit(u0.value * u1.value, 0.0)
        return self.utop

    def backward(self):

        self.u0.grad += self.u1.value * self.utop.grad
        self.u1.grad += self.u0.value * self.utop.grad

class addGate():

    def forward(self, u0, u1):

        self.u0 = u0
        self.u1 = u1
        self.utop = Unit(u0.value + u1.value, 0.0)
        return self.utop

    def backward(self):

        self.u0.grad += 1 * self.utop.grad
        self.u1.grad += 1 * self.utop.grad

class maxGate():

    def forward(self, u0, u1):

        self.u0 = u0
        self.u1 = u1
        self.utop = Unit(max(u0, u1), 0.0)
        return self.utop

    def backward(self):

        if u0 > u1:
            self.u0.grad += 1 * self.utop.grad
            self.u1.grad += 0
        else:
            self.u1.grad += 1 * self.utop.grad
            self.u0.grad += 0

