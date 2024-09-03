---
title: Boids
date: 2022-06-01
modified: 2024-09-02
tags: [rust, simulation]
---

[Boids](https://en.wikipedia.org/wiki/Boids) are an artificial life form invented by Craig Reynolds in 1986.
Each boid follows a set of simple rules, which leads to interesting flock behavior.
This is an example of [swarm intellegence](https://en.wikipedia.org/wiki/Swarm_intelligence), an expression coined by Gerardo Beni and Jing Wang in 1989.

[Emergent behavior](https://en.wikipedia.org/wiki/Emergence) is the ability of simple rules to create unpredictable and complex systems.
We, humans, are built of individual particles following the laws of physics, and yet we have complex personalities, interactions, and emotions. 
We even create [computer simulations](.) to mimic the emergent behavior that makes our existence possible.

Press "START!" to run the simulation, and tweak the sliders to experiment with different behaviors.

<canvas id="glcanvas"></canvas>

## Rules

Each boid in my simulation follows only these rules:

1. Each boid senses only its 6 nearest neighbors and the predator.
2. Each boid has an attraction force to its neighbors.
3. When a boid gets too close to a neighbor, it applies a separation force.
4. Each boid applies a force to minimize velocity difference in relation to its neighbors.
5. When a boid gets too close to a predator, it applies a force to get away from it.
4. Each boid applies a force to accelerate or deccelerate to its target speed.


## Sliders

Mess around with the following sliders to discover new behaviors.

<table>
    <tr>
        <th>Slider</th>
        <th>Function</th>
    </tr>
    <tr>
        <td>Population</td>
        <td>The number of boids.</td>
    </tr>
    <tr>
        <td>Spacing goal</td>
        <td>The distance every boid tries to maintain from its neighbors.</td>
    </tr>
    <tr>
        <td>Separation weight</td>
        <td>How strongly the boids try to return to the spacing goal if they're too close.</td>
    </tr>
    <tr>
        <td>Cohesion weight</td>
        <td>How strongly the boids are attracted to their neighbors.</td>
    </tr>
    <tr>
        <td>Alignment weight</td>
        <td>How strongly the boids try to match the velocity of their neighbors.</td>
    </tr>
    <tr>
        <td>Target speed</td>
        <td>What speed each boid attempts to maintain.</td>
    </tr>
    <tr>
        <td>Speed weight</td>
        <td>How strongly boids try to maintain their target speed.</td>
    </tr>

</table>

## Code

Having every boid measure distance with all other boids to find its closest neighbors would require an <code>O(n<sup>2</sup>)</code> quadratic time complexity.
Thankfully, a data structure called the [KD-tree](https://en.wikipedia.org/wiki/K-d_tree) sorts boids in a way that lowers time complexity to `O(n log(n))`.
I used a KD-tree from the Rust [kiddo](https://docs.rs/kiddo/latest/kiddo/) library.

{% image "/assets/kd-tree.png", "An image of a KD-Tree" %}

I wrote the actual simulation and rendering with the Rust [Macroquad](https://docs.rs/macroquad/latest/macroquad/) library. I compiled everything to web assembly (WASM) so it can be efficiently run online. View the code I wrote on [GitHub](https://github.com/manforowicz/boids).

## APCSA Project Write-Up

Here's what I wrote when I made this project for my 10th grade computer science class:

<blockquote>

At the beginning of this project, I wasn't quite sure what I wanted to make. Then I remembered seeing a simulation of birds flocking and decided to make my own. I chose to write in Rust because it's a fast and practical language.

I was torn between using the two main Rust game engines, Bevy and Macroquad. Bevy uses an ECS (entity component system), meaning I give it every entity I create, and it manages them for me. I settled on Macroquad for its simplicity that stems from its lack of an ECS.

At the beginning, I easily implemented a system where the boids wrap to the other side of the screen when they go over. However, making forces wrap around the screen was tricky. I had to create a method which uses an if statement to wrap the force in the direction that minimizes distance.

Also, I ran into an interesting problem with the Rust borrow checker. I had a nested loop where each boid in a mutable vector compares itself to all other boids in the vector, and mutably updates itself. This threw a compile error, because having more than one reference when mutating an object is illegal. The borrow-checker did this to prevent possible data races and other hard-to-debug memory issues.

After I got everything working, I realized I can improve on the nested O(n<sup>2</sup>) time complexity. I created a system where each boid can only sense boids within a radius of itself. Then I divided the canvas into square tiles as wide as the sensing radius. The tiles were stored in a HashMap, indexed by tuples of their x and y coordinates. Each boid only had to check for neighbors in the 9 tiles closest to itself. When too many neighbors were detected, a random subset of them was retrieved to improve performance.

Instead of retrieving a random subset, I wanted to try always retrieving the 6 closest boids, regardless of radius. (6 because boids tend to cluster in hexagonal patterns) To accomplish this, I used a pre-implemented unbalanced KD-tree from the Rust Kiddo crate. For an unknown reason, the performance increase over the naïve approach was not as high as I expected. Maybe that had to do with the KD-tree not being balanced. I tried implementing my own KD-tree but put that sub-project on hold to work on other parts.

Then I learned how to compile Rust to web assembly (.wasm), and load it into an html canvas element using an imported JavaScript file. Everything was surprisingly seamless, and the performance was incredible. I then created a page on github.io and pushed my code into the repository using git. To make the website look better, I coded a side navigation bar, CSS styling, and a text explanation. Finally, I tuned the setting sliders to make the default behavior satisfying to watch.

This project taught me best-practices regarding using git and Github version control. I learned the intricacies of the Rust language, and its memory management model. I discovered a lot about flock behavior and emergence. I also used CSS, WASM, and HTML for the first time in my life.

This project was made in VSCode on MX Linux.

By Marcin Anforowicz

Tesla STEM High School

APCSA Period 4

Mr. Thompson, Mr. Kilian

</blockquote>

<script src="/assets/mq_js_bundle.js"></script>
<script>
    load("/assets/flocking_sim.wasm");
</script>