---
title: Marcin's Website
---

Hi, I'm Marcin Anforowicz. I enjoy working on projects that combine software, creativity, and engineering.
Download my <a href="https://raw.githubusercontent.com/manforowicz/resume/main/resume.pdf" target="_blank">resume</a>
or visit my <a href="https://github.com/manforowicz">GitHub</a> to learn more!

{% image "/assets/window.jpg", "Marcin looking through a window.", 50 %}

## Industry Experience

In the summer of 2024, I had the pleasure of working as a software engineering intern at [WiBotic](https://www.wibotic.com/).
Check out my [LinkedIn post](https://www.linkedin.com/posts/m-anforowicz_today-is-the-final-day-of-my-engineering-activity-7242941893976711169-C97v)
and watch this video to learn more about my work there.

<video width="960" height="540" controls preload="metadata" style="max-width: 75%;">
    <source src="/assets/wibotic_internship_video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

## Circuit Boards

I enjoy designing circuit boards.
Here are a few that I'm particularly proud of:

<div class="horizontal-container">
    <p>As an engineering intern at <a href="https://www.wibotic.com/">WiBotic</a>, I designed a stackable circuit board to hold charger modules on a shared CAN bus. It's used for running automated CAN bus tests.
    I also wrote over 3000 lines of <a href="https://github.com/wibotic/socketcand_translate">ESP32 firmware</a>
    to allow remotely connecting to the CAN bus via internet.</p>
    {% image "/assets/can_test_pcb.jpg", "Circuit board", 100 %}
</div>
<div class="horizontal-container">
    {% image "/assets/can_test_pcb_regulator.jpg", "Circuit board", 100 %}
    <p>To supply 3.3 volts to all the charger modules on my PCB, I designed and soldered a simple integrated buck converter.</p>
</div>
<div class="horizontal-container">
    <p>As a member of <a href="https://huskysat.org/">Husky Satellite Lab</a>
    I used <a href="https://www.kicad.org/">KiCad</a> to design circuit boards that will fly on HuskySat-2. Here's a photograph of a radio I designed, based heavily on <a href="https://github.com/OpenLST/openlst">OpenLST</a>.</p>
    {% image "/assets/circuit.jpg", "Circuit board", 100 %}
</div>

At Husky Satellite Lab, I also designed and built a magnetorquer PCB. Instead of a conventional wire-wound coil, it uses an integrated PCB spiral. Here's a video I made about it:
<iframe width="560" height="315" src="https://www.youtube.com/embed/cGJYCe6mGR0?si=WpQh7-10B17vfXuP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Personal Projects

Did you know I'm an avid [rustacean](https://doc.rust-lang.org/book/)? 🦀 I'm currently working on a peer-to-peer file transfer tool called [Gday](https://github.com/manforowicz/gday). It's still in an early phase of development. Also, check out this [boid simulation](/flock/) I wrote in Rust!

```rust
fn main() {
    println!("Hello world!");
}
```

I enjoy making educational YouTube videos such as _The Just One More Paradox_ (see below).
I made this video before I had any formal education in probability, so the explanations aren't very rigorous, but all the concepts still hold.
I [programmed the animations](https://github.com/manforowicz/Manim-Videos) for this video using [Manim](https://www.manim.community/), an open source visualization library.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_FuuYSM7yOo?si=1e5alMVAzM3schbo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I'm a certified amateur radio operator since 2019 (callsign: KJ7JCN).
I enjoy exploring creative radio protocols such as [WSPR](https://en.wikipedia.org/wiki/WSPR_(amateur_radio_software)), [IRLP](https://en.wikipedia.org/wiki/Internet_Radio_Linking_Project), and [APRS](https://en.wikipedia.org/wiki/Automatic_Packet_Reporting_System).


## University of Washington

I enjoy making websites for student organizations at the University of Washington. I maintain the websites of [Husky Satellite Lab](https://huskysat.org/team) ([code](https://github.com/UWCubeSat/hsl-website)) and [Competitive Programming Club](https://uw-programming.netlify.app/) ([code](https://github.com/manforowicz/uwcp-site)).

I also teach others how to build and fly remote-controlled airplanes at the drone team of Husky Flying Club. Here are some pictures and videos from that:

<iframe width="560" height="315" src="https://www.youtube.com/embed/MtJTZ6KJV2U?si=ujwtz4EUnSX33SSN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Some relevant courses I've taken at the University of Washington include:

- **Foundations of Computing** - Here I learned the theoretical math underlying various aspects of computer science.

- **Software Design And Implementation** - Here I created multiple fullstack typescript projects, using the best practices in version control, testing, and modularity.

- **Data Structures and Parallelism** - This course covered parallelism and data structures through the lens of time complexity.

- **Systems Programming** - In this course I gained experience writing low-level C++ projects. I learned the ins-and-outs of system calls and memory management.

- **The Hardware/Software Interface** - Here I learned to use gdb, read assembly, and understand memory layout.

- **Machine Learning** - Here I used PyTorch and Numpy to implement algorithms such as LASSO regression, stochastic gradient descent, and backpropagation.

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
