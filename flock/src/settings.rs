use macroquad::prelude::*;
use macroquad::ui::{hash, root_ui, widgets};
use std::ops::Range;

pub struct Settings {
    pub pause: bool,
    pub population: f32,
    //pub sensing_radius: f32,
    pub spacing_goal: f32,
    pub separation_strength: f32,
    pub cohesion_strength: f32,
    pub alignment_strength: f32,
    pub target_speed: f32,
    pub speed_strength: f32
    
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            pause: true,
            population: 50.,
            //sensing_radius: 300.,
            spacing_goal: screen_width() / 20.,
            separation_strength: 5.,
            cohesion_strength: 5.,
            alignment_strength: 5.,
            target_speed: 5.,
            speed_strength: 5.
            
        }
    }
}

macro_rules! slider {
    ($ui:ident, $settings:ident. $name:ident) => {
        slider!($ui, $settings.$name, 0., 10.)
    };
    ($ui:ident, $settings:ident. $name:ident, $start:expr, $stop:expr) => {
        $ui.slider(
            hash!(),
            &stringify!($name).replace("_", " "),
            Range {
                start: $start,
                end: $stop,
            },
            &mut $settings.$name,
        );
    };
}

impl Settings {
    pub fn draw_ui(&mut self) {
        widgets::Popup::new(hash!(), vec2(300., 180.)).ui(&mut root_ui(), |ui| {
            ui.checkbox(hash!(), "Pause", &mut self.pause);
            
            slider!(ui, self.population, 0., 100.);
            //slider!(ui, self.sensing_radius, 50., 500.);
            slider!(ui, self.spacing_goal, 0., 500.);
            slider!(ui, self.separation_strength);
            slider!(ui, self.cohesion_strength);
            slider!(ui, self.alignment_strength);
            slider!(ui, self.target_speed);
            slider!(ui, self.speed_strength);
            
        });

        draw_rectangle(0., 0., 350., 180., Color::new(1., 1., 1., 0.5));
    }
}
