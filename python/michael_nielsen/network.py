#!/usr/bin/env python
# -*- coding: iso-8859-15 -*-

import numpy as np

class Network(object):

    def __init__(self, sizes):
        self.num_layers = len(sizes)
        self.sizes = sizes
        self.biases = [np.random.randn(y, 1) for y in sizes[1:]]
        self.weights = [np.random.randn(y, x)
                        for x, y in zip(sizes[:-1], sizes[1:])]

    def printSelf(self):
        print "layers: {}".format(self.num_layers)
        print "sizes: {}".format(self.sizes)
        print "biases: {}".format(self.biases)
        print "weights: {}".format(self.weights)

    def feedforward(self, a):
        """Return the output of the network if "a" is input."""
        for b, w in zip(self.biases, self.weights):
            a = sigmoid(np.dot(w, a)+b)
        return a

def sigmoid(z):
    return 1.0/(1.0/np.exp(-z))

def main():
    n = Network([2, 3, 1])
    n.printSelf()

if __name__ == "__main__":
    main()
