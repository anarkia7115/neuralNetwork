#!/usr/bin/env python
# -*- coding: iso-8859-15 -*-

from neuro import *

class Circuit():

    def __init__(self, n):
        # n is dimention
        self.mulgs = []
        self.addgs = []

        for i in range(n):
            self.mulgs[i] = multiGate()
            self.addgs[i] = addGate()

    def forward(self, x, w):
        '''
        x = [x0, x1, x2, ..., xn]
        w = [w0, w1, w2, ..., wn, w_n+1]
        '''

        # skip first add to score
        score = Unit(w[-1], 0.0)

        # assert len(x) + 1 = len(w)
        for i in range(len(x)):
            wxi     = self.mulgs[i].forward(w[i], x[i])
            score   = self.addgs[i].forward(score, wxi)

        self.score = score
        return self.score

    def backward(self, gradientTop):

        self.score.setGrad(gradientTop)
        for addg in addgs:
            addg.backward()

        for mulg in mulgs:
            mulg.backward()
        
    

class Svm():

    def __init__(self, wValues):

        # init weight values
        self.w = []

        for wv in wValues:
            self.w.append(Unit(wv, 0.0))

        # init circuit
        self.circuit = Circuit(len(wValues) - 1)

    def forward(self, x):
        self.unitOut = self.circuit.forward(x, self.w)

        return self.unitOut

    def backward(self, y):

        # accumulate cost
        for i in range(len(y)):
            costi = max(0, -y[i] * score[i].value + 1)

        # regularization cost
        alpha = 0.1
        reg_cost = 0.0
        for i in range(len(self.w) - 1):
            reg_cost += ww.value ** 2


