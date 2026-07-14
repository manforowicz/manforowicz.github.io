---
title: Marcin's Website
---

Hi, I'm Marcin Anforowicz. I enjoy working on projects that combine software, creativity, and research.
I'll graduate from the University of Washington with a master's degree in CSE in June 2027.
Feel free to download my <a href="https://raw.githubusercontent.com/manforowicz/resume/main/Anforowicz_Marcin_resume.pdf" target="_blank">resume</a>
or view my <a href="https://github.com/manforowicz">GitHub</a> account.

{% image "marcin_mountain_2025.jpg", "Marcin on a mountain.", 50 %}

## High-altitude balloon

In May 2026, the Husky Satellite Lab launched the PHAT-3 high altitude balloon.
I started this project over a year earlier, and it's been a blast working with the team to [design and program the payload PCB](https://github.com/UWCubeSat/phat3_code).
Our balloon ascended to over 28km (90,000ft), and landed 57km (35mi) away, after a roughly 2.5 hour flight. We received atmospheric sensor telemetry transmitted over LoRa at 915MHz for several kilometers, and recovered footage from the onboard SD cards. I learned a lot, had fun, and made a video about it. Thanks everyone, and especially Yehoshua for leading the launch effort!

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XpSKpyZeOgA?si=h5vrm9BJkqOIBPJ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## Qumulo Internship

This summer of 2026, I'm interning at Qumulo, a company that makes a flexible distributed filesystem.
It supports protocols like SMB, NFS, FTP, and allows customers to deploy it on any mix of on-prem servers and cloud object storage.

My project is allowing the filesystem to mount external S3 buckets, allowing customers to access them as if they're real files. 
So far I contributed to the large Rust and C codebase by writting distributed chaos tests, adding support for multipart S3 object upload, and debugging distributed transaction race conditions.

## WiBotic internship

In the summer of 2024, I had the pleasure of working as a software engineering intern at [WiBotic](https://www.wibotic.com/).
Check out my [LinkedIn post](https://www.linkedin.com/posts/m-anforowicz_today-is-the-final-day-of-my-engineering-activity-7242941893976711169-C97v)
and watch this video to learn more about my work there.

<video width="960" height="540" controls preload="metadata" style="max-width: 75%;" id="wibotic-video">
    <source src="/assets/wibotic_internship_video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

## Circuit Boards

<div class="horizontal-container">
    {% image "phat3_pcb.jpg", "Circuit board", 100 %}
    <p>Here's a photo of <a href="https://github.com/UWCubeSat/PHAT-3-Main-Board">the PCB</a> Yehoshua and I designed for our high-altitude balloon project.
    It has cameras and sensors to collect data, a radio to transmit it, and an SD card to save it.
    </p>
</div>
<div class="horizontal-container">
    <p>As an engineering intern at <a href="https://www.wibotic.com/">WiBotic</a>, I designed a stackable circuit board to hold charger modules on a shared CAN bus. It's used for running automated CAN bus tests.
    I also wrote over 3000 lines of <a href="https://github.com/wibotic/socketcand_translate">ESP32 firmware</a>
    to allow remotely connecting to the CAN bus via internet.</p>
    {% image "can_test_pcb.jpg", "Circuit board", 100 %}
</div>
<div class="horizontal-container">
    {% image "can_test_pcb_regulator.jpg", "Circuit board", 100 %}
    <p>To supply 3.3 volts to all the charger modules on my PCB, I designed and soldered a simple integrated buck converter.</p>
</div>
<div class="horizontal-container">
    <p>As a member of <a href="https://huskysat.org/">Husky Satellite Lab</a>
    I used <a href="https://www.kicad.org/">KiCad</a> to design circuit boards that will fly on HuskySat-2. Here's a photograph of a radio I designed, based heavily on <a href="https://github.com/OpenLST/openlst">OpenLST</a>.</p>
    {% image "circuit.jpg", "Circuit board", 100 %}
</div>

At Husky Satellite Lab, I also designed and built a magnetorquer PCB. Instead of a conventional wire-wound coil, it uses an integrated PCB spiral. Here's a video I made about it:
<iframe width="560" height="315" src="https://www.youtube.com/embed/cGJYCe6mGR0?si=WpQh7-10B17vfXuP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Personal Projects

My favorite programming language is [Rust](https://doc.rust-lang.org/book/). To get better at it, I created a file transfer tool called [Gday](https://github.com/manforowicz/gday), and wrote a [blog post](/gday/) about it.

<script src="https://asciinema.org/a/692670.js" id="asciicast-692670" async="true"></script>

Also, check out this [boid simulation](/flock/) I wrote in Rust!

I enjoy making educational YouTube videos such as _The Just One More Paradox_ (see below).
I made this video before I had any formal education in probability, so the explanations aren't very rigorous, but all the concepts still hold.
I [programmed the animations](https://github.com/manforowicz/Manim-Videos) for this video using Manim, an open source visualization library.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_FuuYSM7yOo?si=1e5alMVAzM3schbo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I'm a certified amateur radio operator since 2019 (callsign: KJ7JCN).
I enjoy exploring creative radio protocols such as WSPR, IRLP, and APRS.

I also enjoy building and flying model airplanes:

<iframe width="560" height="315" src="https://www.youtube.com/embed/0HckCmFCpzc?si=24FlGgH9R9AdjkjN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen id="slow-flyer"></iframe>

## University of Washington

I spent the summer of 2025 as a research assistant, helping develop a new UW course called _CSE 493L: Concurrency, Parallelism, and Rust_. I TA'ed for it in winter 2026, and will TA it again in autumn 2026. One of the assignments I designed requires students to create a simple mail server with async Rust. This [_Intro to Rust's async/await_](/intro_to_rust_async) post is one of the teaching materials I created. I enjoy teaching about synchronization, model-checking, testing, and API design.

In spring 2026, my machine learning capstone team ran experiments on ViT structured pruning, and wrote a [report](/assets/anforowicz_ml_capstone.pdf) about it.

<a href="/assets/anforowicz_ml_capstone.pdf"><img src="/assets/anforowicz_ml_capstone_thumbnail.png" alt="My machine learning capstone document"></a>

I enjoy making websites for student organizations at the University of Washington. I maintain the websites of [Husky Satellite Lab](https://huskysat.org/team) ([code](https://github.com/UWCubeSat/hsl-website)) and [Competitive Programming Club](https://uw-programming.netlify.app/) ([code](https://github.com/manforowicz/uwcp-site)).

I also teach others how to build and fly remote-controlled airplanes at the drone team of Husky Flying Club. Here's a video of me flying a DIY airplane our team built:

<iframe width="560" height="315" src="https://www.youtube.com/embed/MtJTZ6KJV2U?si=ujwtz4EUnSX33SSN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen id="plane-chase"></iframe>

And here's a video of me trying to race an FPV (first-person-view) drone.

<video width="712" height="480" controls preload="metadata" style="max-width: 75%;" id="fpv-drone">
    <source src="/assets/whoop2024.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

Some relevant courses I've taken at the University of Washington include:

- **Reinforcement Learning** - Supervised and self-superised learning is often used to train models to mimic humans. But what if there isn't enough human data, or we want an AI to be unhindered by human performance? Reinforcement learning is a broad field of research creating solutions to this problem. Things I learned include Soft Q Learning, and model-based approaches.

- **Deep Learning** - Recent AI progress was driven by figuring out how to throw more compute at a problem. Modern deep neural networks with innovations like skip connections and attention are great at finding patterns in large unlabelled datasets. In this class I implemented a transformer, studied encoder-decoder architectures, and learned about using latent space vectors in creative ways.

- **Wireless Communication** - Devices like our phones use a complex stack of compression, encoding, modulation, and transmission to send information over a large distance. In this course I programmed a software defined radio using digital signal processing principles. I used it to decode the azimuth information transmitted over VOR.

- **Distributed Systems** - This course involved implementing Paxos, a fault-tolerant consensus protocol. Paxos is the backbone of services like Google and AWS, allowing them to reliably operate, even if multiple servers fail.

- **Fundementals of Electrical Engineering** - In this course, I learned how to analytically design and test electrical circuits. 

- **Software Design And Implementation** - Here I created multiple fullstack typescript projects, using the best practices in version control, testing, and modularity.

- **Data Structures and Parallelism** - This course covered parallelism and data structures through the lens of time complexity.

- **The Hardware/Software Interface** - Here I learned to use gdb, read assembly, and understand memory layout.

- **Machine Learning** - Here I used PyTorch and Numpy to implement algorithms such as LASSO regression, stochastic gradient descent, and backpropagation.

- **Operating Systems** - In this course I took an experimental kernel which runs directly in QEMU, and implemented system calls like `fork()`, `wait()`, `sbrk()`, `open()`, `write()`, and more. I implemented filesystem journaling, page table management, and page fault handling.

- **Computer Security** - Computers are everywhere: cars, pacemakers, phones, airplanes, printers, etc. How can we prevent an attacker from shutting them down or extracting secrets? That was my guiding question as I learned about buffer overflows, cross-site scripting, SQL injections, double-free errors, and more.

- **Introduction to Computer Communication Networks** - In this course I took a deep dive learning about network protocols including IEEE 802.11, ethernet, ARP, DHCP, IP, DNS, UDP, TCP, HTTP, and HTTPS.

- **Introduction to Digital Design** - Here I wrote a snake game in SystemVerilog. SystemVerilog is a language that compiles into logic gates and can be run on FPGAs (field programmable gate arrays).

<video width="854" height="480" controls preload="metadata" style="max-width: 75%;">
    <source src="/assets/verilog_snake.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>


## Book Recommendations

Here's a list of non-fiction books I enjoyed reading.
All of them have helped me understand the forest instead of just seeing the trees.

### [The Righteous Mind](https://www.goodreads.com/book/show/11324722) - Jonathan Haidt, Simona Drelciuc
Humans have evolved a gut feeling to judge things as moral or immoral.
How does our moral compass work, and what evolutionary purpose does it serve?
How does it fuel varying political views?


### [The Dictator's Handbook](https://www.goodreads.com/book/show/11612989-the-dictator-s-handbook) - Bruce Bueno de Mesquita, Alastair Smith
Why do countries with more natural resources tend to have lower standards of living? Why are some countries rich and others poor? What prevents democracies from turning into dictatorships?

World events are often explained by analyzing the ideologies and beliefs of countries. I find this unconvincing. I mean, what does it mean for an abstract entity called a country to have motives, ideas, and thoughts?

This book takes a very different approach, and explains the structure of power through the lens of game theory. 


### [Order Without Design](https://www.goodreads.com/en/book/show/39644188) - Alain Bertaud
Cities spontaneously form because living closer to others allows the efficient exchange of labor, goods, and ideas. What factors and incentives influence things like population density, building height, and housing costs? Why are cities in different countries so different? How do government attempts to regulate how cities grow influence their structure? Read this book to find out!


### [Negotiation Genius](https://www.goodreads.com/en/book/show/1909043) - Deepak Malhotra, Max H. Bazerman
Two parties with different goals, motives, and incentives, come to the negotiation table. How can they come to a mutually beneficial agreement?

This book derives a comprehensive framework for analyzing negotiations and creating shared value that benefits both parties. The art of negotiation is so much more than just back-and-forth haggling.


### [How to Drive a Nuclear Reactor](https://www.goodreads.com/en/book/show/50878951) - Colin Tucker
Ever wondered how a nuclear reactor works? How do they reliably and safely produce about [10% of the world's electricity](https://ourworldindata.org/electricity-mix)? This book, written by a reactor operator, strikes the perfect balance between dumbed-down and too-technical.
