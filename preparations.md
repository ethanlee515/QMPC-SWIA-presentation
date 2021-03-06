20-25 min?
Try to cover abstract + intro
abstract = 3-4 slides
state result informally

Things to mention:
* Define problem
* Importance?
* Challenge?
* Prior works (and comparisons)
* Novelty?
* Theorem statement
* Future directions?

# High-level

## MPC (SWA)

### Definition

Take from UC presentation?

* n parties
* private inputs
* wish to perform joint comp.

Constant round starts with an illutration of a typical protocol execution.
Maybe try that too?

* Security notion maybe take from constant round presentation too?

### Motivation

Take from UC presentation?

### Quantum?

TODO check other quantum papers to see how is this introduced

When do we talk about prior works?

## SWIA

Take from SWIA presentation...
Try to transition smoothly from SWA

This probably should come after quantum?

## Challenges

High-level of qubit-sending problem.
* Classical MPCs have satisfied SWIA before the property was even formulated.
* Not true for quantum - why?
* Take an arbitrary MPQC protocol and see that a protocol message can be lost.

## Main theorem

There exists a protocol for computing any multiparty quantum circuit with SWIA.
* Assumptions: Classical HE and MPC
* Need to mention round efficient too.

TODO look at how others state their theorems...
Constant round looks good but not sure if format fits

Constant round = interesting byproduct.
No need to do detailed comparison

## Prior works

Some people put this before main theorem, and some after.
Putting it after seems to flow better?

* MPQC DGJ+
* 2PQC constant round?
* VQFHE - special case of 2PQC. Our computation reduces to it.

# Technical

* Don't expect the audience to follow the details.
* Don't even expect our results to be explained cleanly.
* The audience won't be able to reconstruct our solution after the talk.
* Rather, the details should incentive them to read the paper.
* The set of audience shrinks. There are ways to bring them back though.

## Qubit-sending problem

* Clearly define it
* Solve it

## Recap - VQFHE and quantum authentications

* Mention that authentication implies encryption under the quantum setting.
* Maybe abuse of notation and "collapse" the two ideas?

## Extending solution to MPQC protocol

Modularize SA/AR first? Or handwave those and go straight to protocol?

TODO think about how to make this illustration possible to follow

Want to mention invalid QECC attack, but hard to define the context...

Maybe just bring it up in the right step of our protocol?

## Caveats

1. evaluation key...? This is nontrivial.
2. we need an extra "check-integrity" operation.

Just encourage the audience to read our paper...

# Concluding slide

TODO

# Open problems...?

TODO Copy from paper page 3-4

# Strategy (?)

Goals:
1. let audience learn things
2. sell our results

## On following our intro's flows

Do we have time for IDPD?
How to transition into invalid-QECC attack?

## On illustrations

* Higher reqs on how well picture is drawn
* Highlights the right places?
* Ciphertext colored background good
* Example of good pictures and text design. Right amount of info.
* Disadvantage of illustration: Too much info => lost audience

## Misc

* When long texts are used, highlight key terms.
