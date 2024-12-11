---
title: I Made a Program for Transferring Files
date: 2024-12-09
---

Why is it so tricky to send large files from computer to computer? It's a long story.

Originally every computer had its own unique IPv4 address.
But as more and more computers were using the internet, the 2<sup>32</sup> &approx; 4 billion IPv4 addresses were running out.

## NATs to work around IPv4 exhaustion?

So in 1994, [RFC 1631](https://datatracker.ietf.org/doc/html/rfc1631) proposed network address translators (NATs) as a temporary workaround.

Computers inside most buildings connect to the internet through the building's NAT.
A NAT has 1 real/public IP address, but it
hands out many fake/private IP addresses to all the computers within that building's private network.

The NAT translates packets flowing out of the private network by replacing their fake/private IP addresses with its own real/public IP address, and vice versa.

It also dynamically modifies the origin port numbers of outgoing packets, so that each port number corresponds to a different internal computer or connection.
Then it looks at the port numbers of incoming response packets to determine which internal computer to forward them to.

Unfortunately, this makes it difficult for computers to connect if they're both behind different NATs.
If one computer tries to send a packet to another computer, the receiving NAT won't know which computer on its internal network to forward it to.
So it'll drop the packet.

Note: this is just a high-level summary. To learn more, read [Wikipedia article on NATs](https://en.wikipedia.org/wiki/Network_address_translation).

## IPv6 to the rescue?

In 1995, [RFC 1883](https://datatracker.ietf.org/doc/html/rfc1883) proposed a longer-term solution which doesn't involve fake/private IP addresses. 
I'm talking about IPv6, which has 2<sup>128</sup> = 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses, more than enough for each computer to have its own real/public IP address without any NATs.

Problem solved, right??? Unfortunately, although IPv6 is becoming more popular, [less than 50% of internet traffic uses IPv6 as of 2024](https://www.google.com/intl/en/ipv6/statistics.html).
So 29 years have passed, and half of us are still stuck with NATs.

<br>
<blockquote>
"NAT may be a good short term solution to the address depletion and
scaling problems. This is because it requires very few changes and
can be installed incrementally. NAT has several negative
characteristics that make it inappropriate as a long term solution,
and may make it inappropriate even as a short term solution." - <a href="https://datatracker.ietf.org/doc/html/rfc1631">RFC 1631</a> (1994)
</blockquote>
<br>

In the meantime, we have to use servers which _do_ have a public IP address to relay files between computers behind NAT's.
Common examples of relay servers are email, Google Drive, [Magic Wormhole](https://github.com/magic-wormhole/magic-wormhole) and [croc](https://github.com/schollz/croc).

## Hole-punching

Thankfully, there's a way to trick certain NATs into allowing computers behind them to connect directly to each other.
It's a procedure called [TCP hole punching](https://bford.info/pub/net/p2pnat/) in which both computers temporarily connect to a contact exchange server, which shares their public IP addresses and port numbers with each other.
Then, both computers try connecting a few times to the address+port they've received.

However, this only works on full-cone NATs, address-restricted-cone NATs, and port-restricted cone NATs. It doesn't work on symmetric NATs. To understand why, [read about NATs on Wikipedia](https://en.wikipedia.org/wiki/Network_address_translation).

## Introducing Gday

I learned about this while trying to send an SD-card worth of vacation photos and videos directly to my cousin in Poland.

So I created an open-source command-line tool which uses hole-punching
to allow computers to securely transfer files without a relay.

If you'd like to install it or learn more, take a look at the [Gday GitHub](https://github.com/manforowicz/gday).

<script src="https://asciinema.org/a/692670.js" id="asciicast-692670" async="true"></script>
