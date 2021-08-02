# Intro

Hello everyone! Today we'll be talking about round efficient secure multiparty quantum computation with identifiable abort.

# MPC

Let's start with multiparty quantum computations. Or what we call MPQC.
Here we have n parties, and our goal is to evaluate a function that looks like this.
It's got n quantum inputs; one from each party. Same idea with n outputs.
So each party starts with their own private input, and they run some protocol.
Exchange some quantum messages.
And when they're done, everybody gets their output.

We say an MPC is secure if everyone learns only their own output.
This security notion is ok, but it's really not the best.
It allows what we call a "denial of service" attack,
which basically means that the protocol can abort,
and then nobody gets any output.
It's well known that this kind of situation cannot be prevented with dishonest majority.
So this attack will happen.
When it does happen, all quantum inputs would be lost due to the no-cloning theorem.

So we wanna ask: Is there anything we can do about this?

# SWIA

It turns out that the answer is yes.
There's this stronger security notion called "identifiable abort", or what we call SWIA.
It means that when things go wrong, everyone at least knows whose fault it is.

It's been done classically.
In fact, we can make some simple changes to GMW and get IA.
The key idea is to use broadcast and ZK proofs,
so the honest parties can prove that they did what they're supposed to.

But we can't broadcast a quantum state, so that strategy doesn't work for quantum.
So we know some MPQC protocols, but they are pretty far from achieving IA.

Let me show you why.
Let's say these guys are running one of them. Maybe DGJ+.
And here P1 is supposed to send a quantum message to P2.
Let's say P1 is malicious, and so it refuses to send the message.

We've now lost a message.
The no-cloning theorem says that's it's the only copy we have.
So now there's no way to recover, and the protocol aborts.
Now we need someone to blame.

Of course it could be P1, but this other configuration is also consistent.
P2 could be malicious.
He can take the message and claims that he's never received it.

A bystander like P3 would not know which of P1 and P2 is malicious.
So there's just not enough information to catch the cheater.

So under the quantum setting, we can't even send protocol messages without running into these issues.
A priori it almost seems like there's some fundamental issues with achieving IA under the quantum setting.

# Main theorem

It turned out that we were able to overcome this issue and some other challenges that I'll also mention.
We were able to build a MPQC protcol with IA.

Here's the informal theorem statement.

(Read off the slide)

It's also worth mentioning that our protocol is round-efficient.
What we mean is that our round complexity doesn't depend on this circuit.

But we don't have constant round.
Our round complexity does depend on the number of parties and the security parameter.
Unlike this concurrent work who's also an accepted paper here are CRYPTO 2021.
They built a constant-round MPQC but it doesn't have identifiable abort.

# Qubit-Sending

Ok, so let's talk about how we do this.
Our first step is to solve the issue with sending quantum messages that I mentioned earlier.

Let's first fully define the problem.
So P1 wants to send a qubit to P2.
For this presentation we'll make some simplifying assumptions about the adversary.
I encourage you to read the our paper for a more complete treatment on this.

Today we allow the bad guys to drop outgoing messages.
They can also drop incoming messages.
For now that's it.

So now I've defined the problem we want to solve,
I present our solution which we call routing.
As you might tell from the name,
this algorithm is inspired from computer networks.
Here's how it goes.
We first create our packets by running an error correcting code on the input.
Our network is initialized as a complete graph like this.
We now try to route these packets from P1 to P2.

Naturally we try the direct path first.
We send our packets along this edge until a packet gets dropped.
If no packets get dropped, then P2 can just decode the ECC and we're done.

Now to keep things interesting, let's say we lose a packet.
That's still fine, since we're using an ECC.
And now we've found out that this edge is unreliable.
We get rid of it.

We next try a different path. Maybe this green one.
For this demo, let's say a packet gets dropped here this time.
That'll break this edge, but not this other one.
Generally, we erase the edge where the packet drop occurs.

We then find another path, and this process just kinda repeats itself.

Now let's assume the algorithm eventually terminates successfully.
Meaning that P1 has no packets left.
Everything is either sent to P2 or dropped.
Obviously the number of packet losses is bounded by the number of edges in the graph.
Since we have this upper bound, the ECC can always be decoded.

So I guess I've shown some sort of correctness property.
Let's next try to make the protocol abort instead.

So let's say this path gets broken again. We get rid of this.
Then same thing again.

Now there's no paths from P1 to P2, so the protocol aborts.
Time to find the bad guys.

See how the graph is disconnected, and all the honest parties are on the same connected component.
It turns out that'll be true in general.
So everyone can just blame people on different connected components,
and that will satisfy IA.

To sum things up, for this subproblem, and with this really restricted adversary model,
we're able to get something like SWIA.

Now it's time to build a real MPQC.

# Building MPQC

Before we go at it,
let's have a quick rundown on I guess the common strategy out there.

There are usually three phases.
In the first phase, everyone encodes their own input.
This encoding has a bunch of good properties.
You can think of it as some kind of encryption and authentication.

Once that's done, we move on to the next phase.
The parties will evaluate homomorphically over the encoded input.
This phase usually involves passing messages around.

Finally, once the evaluation is done, everyone can just decrypt their own output.

So let's see how routing fit into this picture.
The first idea is to let everyone encode their inputs locally like normal.
Then they can ECC the messages right before sending them.
Like this.

But it actually doesn't work.
Like I mentioned earlier, this encoding is basically some kind of authentication.
It stops the bad guys from modifying the underlying message.
But when we take its ECC, this protection doesn't work anymore on the individual codewords.
So when we route this, the packets get tampered by the relays and we won't notice until it's too late.

Let's try something else.
Maybe we should try to take the ECC before encoding. Like this here.
Then maybe we try to homomorphically evaluate over these ECC too.
This strategy almost works, but unfortunately we have a concrete attack.

See, this ECC might be prepared by malicious parties.
So they can do something like this.
These are some garbage that's not a real ECC codeword.
So this evaluation is done over some garbage input.
And well, we know what they say.
"Garbage in, garbage out".
And now the outputs are garbage too.

So we need to do something about this attack.
This is what we tried.
We first decode the ECC, then we evaluate.
So if this is garbage here, it'll get properly handled here.
It turns out that this strategy is actually correct.

A caveat is that without the ECC, we can't send quantum messages.
So all these evaluation would have to be done locally.
And so our construction uses a homomorphic encryption scheme.

This is the actual outline of our construction.
Let's fill in the gaps now.

# Construction

Let's put everything together.
First of all, we use homomorphic encryption, so we have a server.

TODO and I didn't draw the rest yet.
The idea is to "bend" and "embed" the picture from the last slide here.

There's another caveat though.
First, those who are familiar with homomorphic evaluation schemes might notice that we need an evaluation key.
Moreover, the evaluation key is actually quantum, so we can't just prepare it by running a classical MPC protocol.
There's some nontrivial things happening there that I encourage you to read the paper to find out.

# Conclusion

TODO follow-up questions?
