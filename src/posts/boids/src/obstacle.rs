//Manages the formation and deletion of obstacles.

use macroquad::prelude::*;
use macroquad::ui::root_ui;

pub struct Obstacle {
    pub pos: Vec2,
    pub radius: f32,
    pub color: Color,
}

pub struct Obstacles {
    pub obstacles: Vec<Obstacle>,
}

impl Obstacles {
    pub fn new() -> Self {
        Self {
            obstacles: Vec::new(),
        }
    }
    pub fn update(&mut self) {
        let (x, y) = mouse_position();
        let mouse = Vec2::new(x, y);
        if root_ui().is_mouse_over(mouse) {
            return;
        }

        if is_mouse_button_pressed(MouseButton::Left) {
            for i in 0..self.obstacles.len() {
                let obs = &mut self.obstacles[i];
                if obs.pos.distance_squared(mouse) < obs.radius.powi(2) {
                    if obs.color == YELLOW {
                        obs.color = RED;
                    } else {
                        self.obstacles.remove(i);
                    }
                    return;
                }
            }
            self.obstacles.push(Obstacle {
                pos: mouse,
                radius: 10.,
                color: YELLOW,
            })
        }
    }
    pub fn draw(&self) {
        for obs in &self.obstacles {
            draw_circle(obs.pos.x, obs.pos.y, obs.radius, obs.color)
        }
    }
}
