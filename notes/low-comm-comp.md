# Multiparty Computation with Low Communication, Computation, and Interaction via Threshold FHE

## High-level overview

* State goal of MPC informally: parties with private inputs wanting to compute function
* Show trivial semi-honest solution for 2-party computation using FHE.

## Solution overview

* Lists good properties of trivial solution:
	* Low rounds
	* Low communication
	* Low computation
	* Simple
* Natural generalization of the trivial solution
* Use threshold FHE (again without introduction)
* Use some functionalities without justification
* Very high level, but understandable
* Which party holds what at each step is graphically shown

### main results

6 min in; spend about 2 mins

* Make puzzle pieces from the previous section
* Lists advantages
* Different main results against malicious adv

### History

Simple list, one sentence describing each of 6 works

## Technicals

9 min in

### Prelims.

* LWE - gives formal description
* Encryption scheme using LWE - shows construction
	* Don't like: A is not defined on the slides

### Construction

* Basic scheme overview - additive homomorphic
* Homomorphic multiplication done by citation and "magic"
	* Don't like: Doesn't transition cleanly. Need to connect the dots
* Create key-homomorphism for multiplication
* Lost :(

### Summary of constructions

So, bottom-up approach I guess?

1. Establish joint public key
2. Each party enc's
3. Parties do key homomorphism under encryption
4. Resulting outcome

### Malicious adv?

* Uses known, generic transform.
* Didn't cite.
* Not sure if I like so much text

## Conclusion

Re-state properties of solution.
