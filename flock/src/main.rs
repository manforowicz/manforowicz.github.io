#![warn(clippy::all)]

use macroquad::prelude::*;

mod obstacle;
use crate::obstacle::Obstacles;

mod settings;
use crate::settings::Settings;

mod bird_2;
use crate::bird_2::Birds;

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
        

        birds.update(&settings);
        birds.draw();

        settings.draw_ui();

        next_frame().await;
    }
}
