Structure is good.
Went through what I should've, in good order.

1st slide

Say it's joint work. Just name all of the coauthors.
Should also introduce myself.

MPQC?
Say we're interested in MPQC
quantum inputs, quantum circuits over joint inputs

Just "evaluate some function". Or maybe circuit?

Messages = both classical and quantum

instead of "when they're done", do "at the end of the computation"

"At the intuitive level" for security

Nobody can learn more than what they can learn from their own I/O.

Mention SWA (unfair version): Allow adversary to get their output and decide to abort before honest parties do.

*** Say more about SWA ***

Computation failed -> parties didn't learn any outputs -> maybe re-run if there's no inputs? -> DoS
With inputs -> even worse.

Typo: "output" is uncountable

Led to/motivate defining SWIA.

[IOZ14]

"Achieved by the GMW protocol"

Don't abbreviate IA


# Theorem

* First say conclusion
* Then Add caveats
* Assumptions
* _not_ constant round... The number of rounds with q messages is constant.

# Qubit sending

* "Malicious Pis"...? Just say "We limit the adversary to:"
* "Drop incoming messages" is bad wording. Say "claim message wasn't sent"
* "Network = parties" seems odd
* Say explicitly "let us assume P2 and P4 are malicious"
* Say explicitly "either enough packets are sent to P2 or the graph becomes disconnected" as in one of the two happen
* "Graph is disconnected
* General adversary behavior = requires authentication code

# Typical

Not very "typical" if only done twice. Maybe "general approach". Also paradigm is singular.
QAS = again don't abbreviate

# Enc-then-ECC

Instead of "strategy" write "first idea".
Also say we're trying to get SWIA.
"No-go: QECC destroys authentication." Need to say a lot more here.

# Hom-ECC

Call this 2nd idea/approach

# Ours

"Locally" homomorphic evaluation
Remind the audience that these are encrypted
Define the server
Maybe don't go into the symmetry... A bit too much cheating. Or maybe just say more or less the same in reverse...?
Instead of "Evaluate using", just "use"

# Summary
* 2nd point is just wrong
* Fairness means either all parties receive their outputs or none of them do. Ours achieves it if underlying cMPC does
* Last point: Stress that a single party can abort the entire protocol. Can we improve that?

# Finally/overall

Say more about previous works?
About Schaffner's paper? Maybe 1st slide.

