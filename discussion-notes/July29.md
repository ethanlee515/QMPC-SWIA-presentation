# Discussion with Yu-Ching

## SWIA challenge

Add more illustration on why SWIA is difficult

## Main theorem

* See how do others formulate theirs
* Highlight keywords

# Group discussion feedbacks

## Comments by Chunghao

### Meta/high-level

* Slide main issue: Too little key words
	* "What if the protocol aborts": actually write the answer on slides?
* Check what functionalities are available for HTML...?

#### Presentation breakdown

* Make slogens
* 3 major phases: Maybe conclude each part better?
* 1st part: Maybe can't even send qubits?
* 2nd part: *Can* send qubits
* 3rd part: actual conclusion

### SWIA

* Maybe say why classical easy? (can zk/clone; not doable for quantum)
* Say more on qubit sending?
* qubit sending is a "fundamental problem": all protocol sends messages. We have difficulty even doing that. (Maybe use as transition?)

## Comments by Dr. Chung

### High-level

* High-level flow acceptable.
* Still lots of work to do on the details
* Chunghao gave great suggestions
* Protocol overview - "so what"?
* Are there interesting ideas in the protocol?
* Should summarize...
* 9 steps is not intuitive. Can't follow where we're going.
* Is it possible to just compose routing with existing protocols to get SWIA? Why not?
	* All known protocols are 3-phases: Enc/commit, Eval, Dec
	* Maybe can just plug in?
	* Previous protocols require communication... QECC + AR + Communication = no-go.
	* Our choice - remove communications during eval.
	* Define VQFHE now?
	* Now protocol design can be followed better.
* Think about what kinda things can be high-level only. There are more than one way to talk about things.
* Slides texts are weird

### Qubit sending

* What to highlight needs work
* Right now it only demonstrates construction
* Don't waste time on notation... Illustrate QECC with pictures? One circle becomes many.
* Double index in main construction too...
* Right now we only trace code... what about high level message? Packet loss is unavoidable. So QECC is necessary. Highlight why QECC is used.
* High level argument isn't complete
* Graph routing...
* Key points need to be covered. Ie. What's the max qubit losses? Parameter choice: Its calculations is details, but the logic behind picking it is part of key points.
* Good complete flow: Can't see who's malicious, but can see that channel isn't good anymore. So we remove it. If before disconnect I can send enough qubits... Otherwise SWIA...
* Slogens are good. constant round presentation does it well by identifying actual key points.
* Round efficient - other work wasn't mentioned?
* GMW can be modified to achieve SWIA...
* Tone's weird?

### SWIA

* Can't grab high level idea
* Where's the take-home message?
* Worth bringing out why it's ok classically, to compare with quantum.
* A priori, maybe even impossible? Maybe even mention there were attempts to show impossibility.

### Main theorem

* Classical MPC... Maybe say a bit more.
* Main theorem is weird

## Comments by Chunghao

* Highlight QECC properties. Say how we use those properties.
* Logic flow earlier: Actually write down key words
* Dishonest majority
* Try to make slides so it's understandable without listening. (Or at least mostly true for high-level parts)

# Homework

* Polish slides (first)
* Font size... Just work on it now.
* To be safe - maybe script too. (second)
