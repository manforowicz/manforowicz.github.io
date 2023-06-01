//CURRENTLY NOT USED
//This system uses a tiled hashmap to find birds within a preset radius.

use crate::obstacle::Obstacles;
use crate::settings::Settings;
use macroquad::prelude::*;
use std::collections::HashMap;
use arrayvec::ArrayVec;

//TODO: Remove copy and clone traits
#[derive(PartialEq, Copy, Clone)]
struct Bird {
    pub pos: Vec2,
    pub vel: Vec2,
    pub rot: f32,
    pub size: f32,
    pub sides: u8,
    pub color: Color,
}


impl Bird {
    fn flock(
        self,
        birds: &HashMap<(i32, i32), Vec<Bird>>,
        obstacles: &Obstacles,
        settings: &Settings,
    ) -> Self {
        let mut new = self;
        let mut accel = Vec2::ZERO;

        let neighbors = new.get_neighbors(settings.sensing_radius as i32, birds);

        let mut followed = 0;
        for other in neighbors {
            let dist_squared = vec_between(&new.pos, &other.pos).length_squared();
            if other == new || dist_squared > settings.sensing_radius.powi(2) {
                continue;
            }
            followed += 1;
            //Spacing
            let dist = vec_between(&new.pos, &other.pos).length() - settings.spacing_goal;
            accel += vec_between(&other.pos, &new.pos).normalize_or_zero()
                * dist
                * if dist > 0. {
                    settings.cohesion_strength * 0.0005
                } else {
                    settings.separation_strength / settings.spacing_goal * 0.1
                };
            //Alignment
            accel += vec_between(&other.vel, &new.vel) * settings.alignment_strength * 0.001;

            accel += new.vel.normalize()
                * (settings.target_speed - new.vel.length())
                * 0.002
                * settings.speed_strength;
        }
        if followed != 0 {
            new.vel += accel / followed as f32;
        }
        let mut accel = Vec2::ZERO;
        for obs in &obstacles.obstacles {
            let dist_squared = vec_between(&new.pos, &obs.pos).length_squared();
            if dist_squared > settings.sensing_radius.powi(2) {
                continue;
            }
            let multiplier = if obs.color == YELLOW { 0.01 } else { -0.01 };

            accel += vec_between(&obs.pos, &new.pos).normalize_or_zero() * multiplier;
        }
        new.vel += accel;
        new.pos += new.vel;
        new.pos = wrap_around(&new.pos);
        new.rot = Vec2::X.angle_between(new.vel).to_degrees();
        new
    }

    fn get_neighbors(
        &self,
        radius: i32,
        birds: &HashMap<(i32, i32), Vec<Bird>>,
    ) -> ArrayVec<Bird, 15> {
        
        let mut chosen = ArrayVec::<Bird, 15>::new();
        if radius == 0 {
            return chosen;
        }
        let (x, y) = self.get_tile(radius);
        let mut neighbors = ArrayVec::<&Vec<Bird>, 9>::new();
        let mut len = 0;
        for dx in -1..=1 {
            for dy in -1..=1 {
                let tile_x = x + dx * radius; // ADD WRAPPING
                let tile_y = y + dy * radius;
                if let Some(subset) = birds.get(&(tile_x, tile_y)) {
                    neighbors.push(subset);
                    len += subset.len();
                }
            }
        }
        if len <= 15 {
            for neighbor in neighbors {
                chosen.extend(neighbor.iter().copied());
            }
        } else {
            let mut i_list: [usize; 15] = [0; 15];
            for i in &mut i_list {
                *i = rand::gen_range(0, len);
            }
            i_list.sort_unstable();

            let mut iter = neighbors.iter();
            let mut vec = iter.next().unwrap();
            let mut pos = 0;

            for i in i_list {
                while i - pos >= vec.len() {
                    pos += vec.len();
                    vec = iter.next().unwrap();
                }
                chosen.push(vec[i - pos])
            }
        }
        chosen
    }

    fn get_tile(&self, radius: i32) -> (i32, i32) {
        let x = self.pos.x as i32 / radius * radius;
        let y = self.pos.y as i32 / radius * radius;
        (x, y)
    }
}

fn vec_between(a: &Vec2, b: &Vec2) -> Vec2 {
    let dx = a.x - b.x;
    let dy = a.y - b.y;

    let dy = if dy > screen_height() / 2.0 {
        dy - screen_height()
    } else if dy < -screen_height() / 2.0 {
        dy + screen_height()
    } else {
        dy
    };

    let dx = if dx > screen_width() / 2.0 {
        dx - screen_width()
    } else if dx < -screen_width() / 2.0 {
        dx + screen_width()
    } else {
        dx
    };

    Vec2::new(dx, dy)
}

fn wrap_around(v: &Vec2) -> Vec2 {
    Vec2::new(
        v.x.rem_euclid(screen_width()),
        v.y.rem_euclid(screen_height()),
    )
}

pub struct Birds {
    birds: Vec<Bird>,
    tiles: HashMap<(i32, i32), Vec<Bird>>,
}
impl Birds {
    pub fn new(quantity: u32) -> Self {
        let mut new = Self {
            birds: Vec::new(),
            tiles: HashMap::new(),
        };
        for _ in 0..quantity {
            new.birds.push(Bird {
                pos: Vec2::new(
                    rand::gen_range(0., screen_width()),
                    rand::gen_range(0., screen_height()),
                ),
                vel: Vec2::new(rand::gen_range(-5., 5.), rand::gen_range(-5., 5.)),
                rot: 0.,
                size: screen_width().min(screen_height()) / 100.0,
                sides: 3,
                color: DARKGRAY,
            })
        }
        new
    }

    pub fn update(&mut self, obstacles: &Obstacles, settings: &Settings) {
        if settings.sensing_radius != 0. {
            for (pos, vec) in self.tiles.iter_mut() {
                if pos.0 % settings.sensing_radius as i32 != 0
                    || pos.1 % settings.sensing_radius as i32 != 0
                {
                    self.tiles.clear();
                    break;
                } else {
                    vec.clear();
                }
            }
            for bird in &self.birds {
                let tile = bird.get_tile(settings.sensing_radius as i32);
                self.tiles.entry(tile).or_default().push(*bird);
            }
        }
        //println!("{}", self.tiles.len());
        self.birds = self
            .birds
            .iter()
            .map(|bird| bird.flock(&self.tiles, obstacles, settings))
            .collect();
    }
    pub fn draw(&self) {
        self.birds.iter().for_each(|bird| {
            draw_poly(
                bird.pos.x, bird.pos.y, bird.sides, bird.size, bird.rot, bird.color,
            );
            //draw_circle_lines(bird.pos.x, bird.pos.y, settings.sensing_radius, 10., WHITE);
        });
    }
}
