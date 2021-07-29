# Intro

Hello everyone! Today we'll be talking about multiparty quantum computation with identifiable abort.

# MPC

So let's start with multiparty quantum computation. Or what we call MPC.
In MPC, we start with n parties, and our goal is to evaluate a function that looks like this.
It takes n quantum inputs; one from each party. Same idea with the n outputs.
So each party starts with their own private input, and they run some protocol.
They exchange some messages that can be quantum.
At the end of the protocol, each party gets their output.

We say an MPC is secure if every party learns only their own output.
This security notion is fine, but it's really not the best.
It still allows what we call a "denial of service" attack,
which is just a fancy way of saying that the malicious parties abort the protocol,
and so nobody gets any outputs.
It's known that we can't stop this kind of attack when the majority of the parties are malicious.
So this attack will happen.
When it does happen, all inputs would be lost due to the quantum no-cloning theorem.

So we ask. Is there anything we can do about this?

# SWIA

It turns out that the answer is yes.
There's this stronger notion of security called "identifiable abort", or what we call SWIA.
It basically means that when things go wrong, everyone at least knows whose fault it is.
It's formulated back in 2014.

In the classical setting, it's actually fairly simple to achieve.
In fact, we can make some modification to GMW87 and it'll satisfy SWIA.
It's because we have tools like broadcast and ZK proofs.
Honest parties can use these to show that they haven't deviated from the protocol.

However, for quantum, we have neither of these things.
There are some MPQC protocols, but they don't satisfy IA.
It's unclear how to modify them so they do satisfy IA.

Let me show why.
Let's say these parties are running some known version of MPQC protocol. Maybe DGJ+.
And P1 is supposed to send a quantum message to P2.
But let's say P1 is malicious, and so it refuses to send the message.

We've now lost a message.
In fact, we've lost it forever.
There's no-cloning theorem which says what we lost is the only copy.
So now there's no way to recover, and now the protocol needs to abort.







# Main theorem

# Qubit-Sending

# Discussion

# VQFHE

# Construction

# Conclusion

TODO follow-up questions?
