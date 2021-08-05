# Intro

Hello everyone! My name is Yi Lee, and today we'll be talking about round efficient secure multiparty quantum computation with identifiable abort.
This is a joint work with my research advisor Kai-Min, and with my friends and colleagues Bar, Hao, Mi-Ying, and Yu-Ching.

# MPC

Let's start with multiparty quantum computations.
Here we have n parties, and our goal is to jointly evaluate some quantum function.
It's got n quantum inputs; one from each party. Same idea with n outputs.
So each party starts with their own private input, and they run some protocol.
Exchange some messages that can be classical or quantum.
At the end of the computation, everybody gets their output.

A security notion that we have right now is called security with abort.
Intuitively speaking, everyone learns only their own output.
On abort, honest parties don't get outputs.

This security notion is ok, but it's really not the best.
The adversary gets to abort the protocol if it wants to.
When that happens, we also call it a "denial of service" attack.
It's well known that this kind of situation cannot be prevented with dishonest majority.
Also, for the quantum setting,
not only does nobody gets any output,
but all quantum inputs are consumed and lost to the no-cloning theorem.
So the parties might not be able to even re-run the protocol.

So we wanna ask: Is there anything we can do about this?

# SWIA

It turns out that the answer is yes.
There's this stronger security notion called "identifiable abort".
It means that when things go wrong, everyone at least knows whose to blame.

This idea was introduced in 2014 by this work.
The security notion is actually satisfied by the GMW protocol.
The key idea is to use broadcast and ZK proofs,
so the honest parties can prove that they did what they're supposed to.

But we can't broadcast a quantum state, so that strategy doesn't work for quantum.
So we know some MPQC protocols, but they are pretty far from achieving identifiable abort.

# Challenge

Turns out that it's hard to get identifiable abort under the quantum setting.
In fact, there are issues even with just sending protocol messages.
Let me show you real quick.

Here P1 is supposed to send a quantum message to P2.
Let's say P1 is malicious, and so it refuses to send it.
So we've now lost a message.
The no-cloning theorem says that's it's the only copy we have.
So now there's no way to recover, and the protocol aborts.
Now we need someone to blame.

From the perspective of P3, maybe he could blame P1,
but this other configuration is also consistent.
P2 could be malicious while P1 may be honest.
P2 can then take the message and claims that he's never received it.

So a bystander like P3 would not know which of P1 and P2 is malicious.
There's just not enough information to catch the cheater.

So under the quantum setting, we can't even send protocol messages without running into these issues.
A priori it almost seems like there's some fundamental issues with achieving IA under the quantum setting.
It turned out that we were able to overcome this issue and build a multiparty quantum computation protocol that satisfies identifiable abort.

# Main theorem

So here's our informal theorem statement.

(Read off the slide)

It's also worth mentioning that our protocol is round-efficient.
What we mean is that the number of quantum messages we send doesn't depend on this circuit.

But we don't have constant round.
Our round complexity does depend on the number of parties and the security parameter.
Unlike this concurrent work which is also presenting here at this conference.
This work is a constant-round MPQC but it doesn't have identifiable abort.

# Qubit-Sending

Ok, so let's talk about how did we do this.
Our first step is to solve the issue with sending quantum messages that I mentioned earlier.

Let's first fully define the problem.
So P1 wants to send a qubit to P2.
We'll make some restrictions on the adversary power to make our discussion more effective.
The bad guys can drop outgoing messages basically just by not sending them.
They can also drop incoming messages by pretending that they haven't received them.
For now that's it; we'll worry about issues related to privacy or authentication later.

So now I've defined the problem we want to solve,
I present our solution which we call routing.
As you might tell from the name,
this algorithm is inspired from computer networks.

For the purpose of this illustration,
let's say P2 and P4 are the bad guys.

Here's how it goes.
We first create our packets by running an quantum error correcting code on the input.
We're doing this because we cannot completely prevent packet losses from happening.
By using error correction, as long as most of these do arrive at P2 we'll be fine.

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

So we first notice that the edges never break between any pair of honest parties.
In terms of the graph, it means that they stay on the same connected component.
So when the graph becomes disconnected, which is clearly true when the protocol aborts,
the honest parties can just blame everyone on different connected components.

To sum things up, for this subproblem, and with this restricted adversary model,
we're able to get something like SWIA.

Now let's build a real MPQC off of this.

# Strategy

Before we go at it,
let's have a quick rundown on I guess the common strategy out there.

As a really rough picture, there are kinda three phases.
Encryption, evaluation, and decryption.

In the first phase, everyone encrypts their own input.
There's classical communications only.
The parties might run a classical MPC to decide on their encryption key for example.
But there's no quantum communications yet.

Here everyone just encodes their inputs using QAS.
Recall that under the quantum setting, authentication implies encryption,
so this is also encrypted in the usual sense.

Once that's done, we move on to the next phase.
The parties will evaluate homomorphically over the encoded input.
This phase would involve passing quantum messages around.

Finally, once the evaluation is done, everyone can just decrypt their own output.

# Strategy - Enc then ECC

So let's see how routing fit into this picture.
The first question to ask, of course, is the following.
Can we incorporate routing into existing MPQCs and get IA?

For example, maybe every time there's a quantum message,
we send it using the routing subroutine from earlier.
And we try to touch the rest of the protocol as little as possible.

Kinda like this here.
Everyone encode their inputs locally like normal.
They can then run error-correcting code on every message and use routing to send them.

Well, unfortunately, this actually doesn't work.
Recall this encoding is an authentication.
It stops the bad guys from tampering with the message.
But when we take its ECC, this protection doesn't work anymore on the individual packets.
So when we route this, the packets get tampered by the relays and we won't notice until it's too late.

# Strategy - Homomorphic ECC

From the previous attack, we see that each of the packets need to be protected separately.
So let's do QECC first, then encrypt the individual packets.
Like this here.

Now we have QECC,
Then maybe we try to homomorphically evaluate over these QECC too.
The rest of the picture is the same as before.
Each party gets their output packets.
They decrypt them, then decode the ECC to get their outputs.

So this seems promising.
But unfortunately, I have some bad news.
This construction actually doesn't work as well as it might sound.
We actually have a concrete attack.

See, this ECC might be prepared by malicious parties.
So they can do something like this.
These are some garbage that's not a real QECC codeword.
So this evaluation is done over some garbage input.
And well, we know what they say.
"Garbage in, garbage out".
And now the outputs are garbage too.

# Strategy - Ours

So we need to fix that attack.
This is what we did.
We first decode the ECC, then we evaluate.
So if this is garbage here, it'll get properly handled here.

It turns out that this strategy is actually correct.

A caveat is that without the ECC, we can't send quantum messages during the evaluation.
So all these evaluation would have to be done locally.
And so our construction uses a homomorphic encryption scheme to take care of that.

So to sum things up and fill in the gap, here's how our protocol actually goes.

Everyone first encodes their inputs with QECC and QAS,
then the encrypted inputs all get routed to the server.
The server decodes the QECC homomorphically, so now the input is protected by only QAS.

The server then actually does the computation.
Here I'll pause and remark that this picture is symmetrical.
The next four steps are actually just these four steps done in reverse order.

Ok so the QECC is applied again,
then the packets here get routed back to everyone.
Then everyone decrypts and get their output.

Or at least that's the high level summary.
There are quite a few nontrivial issues that I'm brushing under the rug here.
I encourage you to read our paper for a more complete treatment.

# Conclusion

So we've constructed the first MPQC with SWIA.

In terms of future work, there's a concrete improvement we could've made to our construction.
Right now it takes only one dishonest party to abort the protocol.
For example, the server can just take everyone's encrypted inputs and you know, go home with them.

It might be interesting to come up with a different construction that can deal with more dishonest parties before aborting.
