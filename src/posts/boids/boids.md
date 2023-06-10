---
title: Boids
date: 2022-06-01
---

<div>
<canvas id="glcanvas"></canvas>

<script src="https://not-fl3.github.io/miniquad-samples/mq_js_bundle.js" defer></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
    load("/resources/flocking_sim.wasm");
}, { once: true });
</script>
</div>

## Emergent Behavior
[Boids](https://en.wikipedia.org/wiki/Boids) are an artificial life form invented by Craig Reynolds in 1986. Each boid follows a set of simple rules, and yet surprising behaviors may occur. This is an example of [swarm intellegence](https://en.wikipedia.org/wiki/Swarm_intelligence), an expression coined by Gerardo Beni and Jing Wang in 1989.


[Emergent behavior](https://en.wikipedia.org/wiki/Emergence) is the ability of simple rules to create unpredictable and complex systems. At first glance, life seems to create order out of disorder, something that an observer would never predict. We, humans, are built of particles that follow simple [quantum equations](https://en.wikipedia.org/wiki/Quantum_mechanics), and yet we have complex personalities, interactions, and emotions. We even create [computer simulations](.) to mimic the processes that make our existence possible.

Someday I plan on adding new features such as natural selection, predators, and complex environments.</p>

## Rules

Each boid follows only these rules:

1. Each boid senses only its 6 nearest neighbors.
2. When a boid gets closer or further from its neighbors, it applies a corresponding force to return to the preset distance.
3. Each boid applies a force to minimize velocity difference in relation to its neighbors.
4. Each boid applies a force to accelerate or accelerate to the preset speed.
5. Each boid applies a force toward attractor objects, and away from repeller objects.


## Sliders

Mess around with the following sliders to discover new behaviors.


| Slider              | Function                                                                       |
|---------------------|--------------------------------------------------------------------------------|
| Population          | How many boids are simulated.                                                  |
| Spacing goal        | The distance every boid tries to maintain from its neighbors.                  |
| Separation strength | How strongly the boids try to return to the spacing goal if they're too close. |
| Cohesion strength   | How strongly the boids try to return to the spacing goal if they're too far.   |
| Alignment Strength  | How strongly the boids try to match their velocity to that of their neighbors. |
| Teaget Speed        | What speed each boid attempts to maintain.                                     |
| Speed strength      | How strongly boids try to maintain their target speed                          |

Click on the canvas to spawn obstacles, and click on them again to toggle their type. Yellow spheres attract boids and red spheres repel boids.


## Code

Having every boid measure distance with all neighbors to find its closest boids would require a quadratic time complexity O(n^2). Thankfully, a data structure called the [KD-tree](https://en.wikipedia.org/wiki/K-d_tree) sorts boids in a way that lowers time complexity to O(nlogn). KD-trees are like [binary trees](https://en.wikipedia.org/wiki/Binary_tree), but they alternate between comparing X and Y coordinates depending on the row depth. I used an unbalanced, pre-implemented KD-tree from the Rust [kiddo](https://docs.rs/kiddo/latest/kiddo/) crate.



{% image "kd-tree.png", "KD-TREE" %}



I wrote the actual simulation and rendering in the fabulous Rust “macroquad” crate. I compiled everything to web assembly (WASM) so it can be efficiently run online. [Rust](https://doc.rust-lang.org/book/) is a very well-designed language that I predict will soon take over huge chunks of the software industry. View this page's source code on [github](https://github.com/manforowicz/manforowicz.github.io/).

## APCSA Project Write-Up

At the beginning of this project, I wasn't quite sure what I wanted to make. Then I remembered seeing a simulation of birds flocking and decided to make my own. I chose to write in Rust because it's a very fast and practical language which has a lot of potential.

I was torn between using the two main Rust game engines, Bevy and Macroquad. Bevy uses an ECS (entity component system), meaning I give it every entity I create, and it manages them for me. I settled on Macroquad for its simplicity that stems from its lack of an ECS.

At the beginning, I easily implemented a system where the boids wrap to the other side of the screen when they go over. However, making forces wrap around the screen was tricky. I had to create a method which uses an if statement to wrap the force in the direction that minimizes distance.

Also, I ran into an interesting problem with the Rust borrow checker. I had a nested loop where each boid in a mutable vector compares itself to all other boids in the vector, and mutably updates itself. This threw a compile error, because having more than one reference when mutating an object is illegal. The borrow-checker did this to prevent possible data races and other hard-to-debug memory issues.

After I got everything working, I realized I can improve on the nested O(n^2) time. The performance was high, but I wanted to do better. I created a system where each boid can only sense boids within a radius of itself. Then I divided the canvas into square tiles as wide as the sensing radius. The tiles were stored in a HashMap, indexed by tuples of their x and y coordinates. Each boid only had to check for neighbors in the 9 tiles closest to itself. When too many neighbors were detected, a random subset of them was retrieved to improve performance.

Instead of retrieving a random subset, I wanted to try always retrieving the 6 closest boids, regardless of radius. (6 because boids tend to cluster in hexagonal patterns) To accomplish this, I used a pre-implemented unbalanced KD-tree from the Rust Kiddo crate. For an unknown reason, the performance increase over the naïve approach was high, but not as high as I expected. Maybe that had to do with the KD-tree not being balanced. I tried implementing my own KD-tree but put that sub-project on hold to work on other parts.

Then I learned how to compile Rust to web assembly (.wasm), and load it into an html canvas element using an imported JavaScript file. Everything was surprisingly seamless, and the performance was incredible. I then created a page on github.io and pushed my code into the repository using git. To make the website look better, I coded a side navigation bar, CSS styling, and a text explanation. Finally, I tuned the setting sliders to make the default behavior satisfying to watch.

This project taught me best-practices regarding using git and Github version control. I learned the intricacies of the Rust language, and its memory management model. I discovered a lot about flock behavior and emergence. I also used CSS, WASM, and HTML for the first time in my life.

This project was made in VSCode on MX Linux.

By Marcin Anforowicz

Tesla STEM High School

APCSA Period 4

Mr. Thompson, Mr. Kilian

