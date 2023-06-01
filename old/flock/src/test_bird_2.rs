//CURRENTLY NOT USED
//This system uses a KD-tree from the ACAP crate


//use kiddo::ErrorKind;
//use crate::obstacle::Obstacles;
use crate::settings::Settings;
use acap::coords::Coordinates;
use acap::kd::FlatKdTree;
use acap::NearestNeighbors;
use acap::Proximity;
use macroquad::prelude::*;

#[derive(PartialEq, Copy, Clone)]
pub struct Bird {
    pub pos: Vec2,
    pub vel: Vec2,
    pub rot: f32,
    pub size: f32,
    pub sides: u8,
    pub color: Color,
}

impl Coordinates for Bird {
    fn dims(&self) -> usize {
        2
    }
    fn coord(&self, i: usize) -> Self::Value {
        if i == 0 {
            self.pos.x
        } else {
            self.pos.y
        }
    }
    type Value = f32;
}

impl Proximity for Bird {
    fn distance(&self, other: &Bird) -> Self::Distance {
        let dx = wrapped_dist(self.pos.x, other.pos.x, screen_width());
        let dy = wrapped_dist(self.pos.y, other.pos.y, screen_height());
        dx * dx + dy * dy
    }
    type Distance = f32;
}

impl Bird {
    fn update(&mut self, tree: &FlatKdTree<Bird>, settings: &Settings) {
        let neighbors = tree.k_nearest(self, 10);
        let mut accel = Vec2::ZERO;
        for other in &neighbors {
            let other = other.item;

            let dist = vec_between(&self.pos, &other.pos).length() - settings.spacing_goal;
            accel += vec_between(&other.pos, &self.pos).normalize_or_zero()
                * dist
                * if dist > 0. {
                    settings.cohesion_strength * 0.0001
                } else {
                    settings.separation_strength * 0.001
                };

            accel += vec_between(&other.vel, &self.vel) * settings.alignment_strength * 0.001;
        }
        if !neighbors.is_empty() {
            self.vel += accel / neighbors.len() as f32;
        }
        self.vel *=
            1. + (settings.target_speed - self.vel.length()) * settings.speed_strength * 0.0002;
        self.pos += self.vel;
        self.wrap_around();
        self.rot = Vec2::X.angle_between(self.vel).to_degrees();
    }

    fn wrap_around(&mut self) {
        self.pos.x = self.pos.x.rem_euclid(screen_width());
        self.pos.y = self.pos.y.rem_euclid(screen_height());
    }
}

fn vec_between(a: &Vec2, b: &Vec2) -> Vec2 {
    let dx = wrapped_dist(a.x, b.x, screen_width());
    let dy = wrapped_dist(a.y, b.y, screen_height());
    Vec2::new(dx, dy)
}
fn wrapped_dist(a: f32, b: f32, dimension: f32) -> f32 {
    let diff = a - b;
    if diff > dimension / 2. {
        diff - dimension
    } else if diff < -dimension / 2. {
        diff + dimension
    } else {
        diff
    }
}

pub struct Birds {
    birds: Vec<Bird>,
    tree: FlatKdTree<Bird>,
}

impl Birds {
    pub fn new(quantity: u32) -> Self {
        let mut birds = Vec::new();

        for _ in 0..quantity {
            birds.push(Bird {
                pos: Vec2::new(
                    rand::gen_range(0., screen_width()),
                    rand::gen_range(0., screen_height()),
                ),
                vel: Vec2::new(rand::gen_range(-1., 1.), rand::gen_range(-1., 1.)),
                rot: 0.,
                size: screen_width().min(screen_height()) / 100.0,
                sides: 3,
                color: DARKGRAY,
            })
        }
        Self {
            birds: birds.clone(),
            tree: FlatKdTree::balanced(birds.iter().copied()),
        }
    }

    pub fn update(&mut self, settings: &Settings) {
        if settings.pause {
            return;
        }
        FlatKdTree::balanced(self.birds.iter());
        for bird in &mut self.birds {
            bird.update(&self.tree, settings);
        }
    }
    pub fn draw(&self) {
        for bird in &self.birds {
            draw_poly(
                bird.pos.x, bird.pos.y, bird.sides, bird.size, bird.rot, bird.color,
            );
        }
    }
}
