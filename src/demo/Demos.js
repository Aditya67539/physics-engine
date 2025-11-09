import { Stick } from "../engine/Stick.js";
import { Body } from "../engine/Body.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../engine/settings.js";

function randInt(min=0, max=255) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Demos = {
    clothSimulation(world) {
        let rows = 80, columns = 30;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                world.addBody(new Body(500 + i * 12, 200 + j * 12, "green", 2, 0, 0, 0.0001));
            }
        }

        for (let i = 0; i < world.bodies.length; i++) {
            if ((i + 1) % columns !== 0) world.addStick(new Stick(world.bodies[i], world.bodies[i + 1]));
            if (i + columns < rows * columns) world.addStick(new Stick(world.bodies[i], world.bodies[i + columns]));
        }

        world.addBody(new Body(350, 100, "red", 25, 0, 0, 1.0, true));
        world.addBody(new Body(1550, 100, "red", 25, 0, 0, 1.0, true));

        world.addStick(new Stick(world.bodies[0], world.bodies[rows * columns]));
        world.addStick(new Stick(world.bodies[rows * columns + 1], world.bodies[rows * columns - columns]));
    },

    fallingBalls(world, p, count) {
        for (let i = 0; i < count; i++) {
            let x = randInt(0, SCREEN_WIDTH);
            let y = randInt(0, SCREEN_HEIGHT);
            let vx = 0;
            let vy = randInt(-10, 10);
            let color = p.color(randInt(), randInt(), randInt());
            world.addBody(new Body(x, y, color, 25, vx, vy, 1.0));
        }
    }, 

    planetSimulation(world) {
        world.addBody(new Body(SCREEN_WIDTH / 1.5, SCREEN_HEIGHT / 2, "yellow", 100, 0, 0, 10.0, true));
        world.addBody(new Body(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 16, "blue", 25, 400, 0, 1.0));
    }
}