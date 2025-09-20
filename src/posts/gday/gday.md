---
title: I Made a Program for Transferring Files
date: 2024-12-09
modified: 2025-09-20
---

Sending large files between computers is annoying.
Email and Google Drive have file size limits.
Running your own file server requires port forwarding, which is a hassle.

Thankfully, tools like [Magic Wormhole](https://github.com/magic-wormhole/magic-wormhole)
can relay files over a volunteer-run server.

However, I was curious if I could avoid relays by establishing a direct TCP connection between computers.

In summary, I learned that it's difficult to establish peer-to-peer connections since computers don't always have unique public IP addresses, because of NATs (network address translators). Thankfully, NATs can usually (but not always) be traversed with TCP hole punching.

Read on for a more detailed explanation.

## NATs to work around IPv4 exhaustion

Originally every computer had its own unique IPv4 address.
But as more computers connected to the internet, the 2<sup>32</sup> &approx; 4 billion IPv4 addresses were running out.

So in 1994, [RFC 1631](https://datatracker.ietf.org/doc/html/rfc1631) proposed NATs (network address translators) as a temporary workaround.

Most computers connect to the internet through their building's NAT.
A NAT has a single real/public IP address, but it
hands out many fake/private IP addresses to all the computers within that building's private network.

The NAT translates packets flowing out of the private network by replacing their private IP addresses with its own public IP address, and vice versa.

But how does it know which internal computer to forward incoming packets to? Well, first it modifies the origin port numbers of outgoing packets, so that each port number corresponds to a different internal computer or connection.
Then it looks at the destination port numbers of incoming response packets to determine which internal computer to forward them to.

Unfortunately, this makes it difficult for computers to connect if they're both behind different NATs.
If one computer tries to send a packet to another computer, the receiving NAT won't know which computer on its internal network to forward it to, so it'll drop the packet.

Note: this is just a high-level summary. To learn more, read [Wikipedia article on NATs](https://en.wikipedia.org/wiki/Network_address_translation).

## IPv6 to the rescue?

In 1995, [RFC 1883](https://datatracker.ietf.org/doc/html/rfc1883) proposed a longer-term solution which doesn't involve private IP addresses. 
I'm talking about IPv6, which has 2<sup>128</sup> = 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses, enough for each computer to have its own public IP address without any NATs.

Problem solved, right? Unfortunately, although IPv6 is becoming more popular, [50% of internet traffic still uses IPv4](https://www.google.com/intl/en/ipv6/statistics.html) as of 2025.

<blockquote>
"NAT may be a good short term solution to the address depletion and
scaling problems. This is because it requires very few changes and
can be installed incrementally. NAT has several negative
characteristics that make it inappropriate as a long term solution,
and may make it inappropriate even as a short term solution." - <a href="https://datatracker.ietf.org/doc/html/rfc1631">RFC 1631</a> (1994)
</blockquote>

In the meantime, we have to use servers which _do_ have a public IP address to relay files between computers behind NAT's.
Common examples of relay servers are email, Google Drive, [Magic Wormhole](https://github.com/magic-wormhole/magic-wormhole), and [croc](https://github.com/schollz/croc).

## Hole-punching

Thankfully, there's a way to trick most NATs into allowing computers behind them to connect directly to each other called [TCP hole punching](https://bford.info/pub/net/p2pnat/). In short, both computers temporarily connect to a contact exchange server, which shares their public IP addresses and port numbers with each other.
Then, both computers try connecting a few times to the address+port they've received.

However, this only works on full-cone NATs, address-restricted-cone NATs, and port-restricted cone NATs. It doesn't work on symmetric NATs. To understand why, [read about NATs on Wikipedia](https://en.wikipedia.org/wiki/Network_address_translation).

## My Program

So for learning purposes, I created an open-source tool which uses hole-punching
to securely transfer files without a relay.
It works through most NATs, but not all.
And it works on almost all computers with IPv6, because NATs are uncommon on IPv6.

Note: For a higher success rate, consider a tool that uses a relay server, such as [magic-wormhole](https://github.com/magic-wormhole/magic-wormhole).

My file transfer program is available on [GitHub](https://github.com/manforowicz/gday).

<script src="https://asciinema.org/a/692670.js" id="asciicast-692670" async="true"></script>
