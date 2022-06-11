#![warn(clippy::all)]

use macroquad::prelude::*;

mod obstacle;
use crate::obstacle::Obstacles;

mod settings;
use crate::settings::Settings;

mod used_bird;
use crate::used_bird::Birds;

#[macroquad::main("flocking_sim")]
async fn main() {
    let mut settings = Settings::default();
    let mut birds = Birds::new(settings.population as usize);
    let mut obstacles = Obstacles::new();

    // MAIN GAME LOOP
    loop {
        clear_background(LIGHTGRAY);

        obstacles.update();
        obstacles.draw();
        

        birds.update(&obstacles, &settings);
        birds.draw();

        settings.draw_ui();

        next_frame().await;
    }
}
