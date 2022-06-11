use crate::obstacle::Obstacles;
use crate::settings::Settings;
use kiddo::KdTree;
use macroquad::prelude::*;

#[derive(PartialEq, Copy, Clone)]
pub struct Bird {
    pub pos: Vec2,
    pub vel: Vec2,
    pub rot: f32,
    pub size: f32,
    pub color: Color
}

impl Bird {
    fn update(&mut self, tree: &KdTree<f32, Bird, 2>, obstacles: &Obstacles, settings: &Settings) {
        let neighbors = tree.nearest(&arr(&self.pos), 6, &squared_dist).unwrap();
        let mut accel = Vec2::ZERO;
        for other in &neighbors {
            let other = other.1;

            let dist = vec_between(&self.pos, &other.pos).length() - settings.spacing_goal;
            accel += vec_between(&other.pos, &self.pos).normalize_or_zero()
                * dist
                * if dist > 0. {
                    settings.cohesion_strength * 0.0001
                } else {
                    settings.separation_strength * 0.001
                };

            accel += vec_between(&other.vel, &self.vel) * settings.alignment_strength * 0.0005;
        }
        if !neighbors.is_empty() {
            self.vel += accel / neighbors.len() as f32;
        }

        let mut accel = Vec2::ZERO;
        for other in &obstacles.obstacles {
            let multiplier = if other.color == YELLOW {
                -0.0001
            } else {
                0.0001
            };
            accel += vec_between(&self.pos, &other.pos) * multiplier;
        }

        if !obstacles.obstacles.is_empty() {
            self.vel += accel / obstacles.obstacles.len() as f32;
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

fn arr(vec: &Vec2) -> [f32; 2] {
    [vec.x, vec.y]
}

fn squared_dist(a: &[f32; 2], b: &[f32; 2]) -> f32 {
    let dx = wrapped_dist(a[0], b[0], screen_width());
    let dy = wrapped_dist(a[1], b[1], screen_height());
    dx * dx + dy * dy
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
    tree: KdTree<f32, Bird, 2>,
}

impl Birds {
    pub fn new(quantity: usize) -> Self {
        let mut new = Self {
            birds: Vec::new(),
            tree: KdTree::new(),
        };
        for _ in 0..quantity {
            new.birds.push(Bird {
                pos: Vec2::new(
                    rand::gen_range(0., screen_width()),
                    rand::gen_range(0., screen_height()),
                ),
                vel: Vec2::new(rand::gen_range(-1., 1.), rand::gen_range(-1., 1.)),
                rot: 0.,
                size: screen_width().min(screen_height()) / 100.0,
                color: DARKGRAY,
            })
        }
        new
    }

    pub fn update(&mut self, obstacles: &Obstacles, settings: &Settings) {
        if self.birds.len() != settings.population as usize {
            *self = Self::new(settings.population as usize);
            return;
        }
        
        if settings.pause {
            return;
        }


        self.tree = KdTree::new();
        for bird in &self.birds {
            self.tree.add(&arr(&bird.pos), *bird).unwrap();
        }
        for bird in &mut self.birds {
            bird.update(&self.tree, obstacles, settings);
        }
    }
    pub fn draw(&self) {
        for bird in &self.birds {
            draw_poly(
                bird.pos.x, bird.pos.y, 3, bird.size, bird.rot, bird.color,
            );
        }
    }
}
