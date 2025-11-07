import p5 from "https://cdn.jsdelivr.net/npm/p5@1.9.0/+esm";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../engine/settings.js";
import { World } from "../engine/World.js";
import { Body } from "../engine/Body.js";
import Vec2 from "../engine/Vec2.js";
import { Stick } from "../engine/Stick.js";

function randInt(min=0, max=255) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

new p5((p) => {
    let world;

    p.setup = () => {
        p.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

        world = new World(new Vec2(0, 981.4));
        // world.addBody(new Body(600, 500, "red", 25, 100));
        // world.addBody(new Body(1400, 200, "green", 25, -100));
        // world.addStick(new Stick(world.bodies[0], world.bodies[1], 100));
        // for (let i = 0; i < 100; i++) {
        //     let color = p.color(randInt(), randInt(), randInt());
        //     let x = randInt(0, SCREEN_WIDTH);
        //     let y = randInt(0, SCREEN_HEIGHT);
        //     let vx = randInt(-100, 100);
        //     let vy = randInt(-500, 0);
        //     world.addBody(new Body(x, y, color, 25, vx, vy, 1.0));
        // }

        let rows = 40, coloumns = 15;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < coloumns; j++) {
                let color = p.color(randInt(), randInt(), randInt());
                world.addBody(new Body(500 + i * 25, 200 + j * 25, color, 5, 0, 0, 0.01));
            }
        }

    
        for (let i = 0; i < world.bodies.length - 1; i++) {
            if ((i + 1) % coloumns !== 0) world.addStick(new Stick(world.bodies[i], world.bodies[i + 1]));
            if (i + coloumns < rows * coloumns) world.addStick(new Stick(world.bodies[i], world.bodies[i + coloumns]));
        }

        world.addBody(new Body(350, 100, "red", 25, 0, 0, 1.0, true));
        world.addBody(new Body(1550, 100, "red", 25, 0, 0, 1.0, true));

        world.addStick(new Stick(world.bodies[0], world.bodies[rows * coloumns]));
        world.addStick(new Stick(world.bodies[rows * coloumns + 1], world.bodies[rows * coloumns - coloumns]));
    }

    p.draw = () => {
        const dt = p.deltaTime / 1000.0;

        world.update(dt);

        p.background(0);

        p.stroke("white");
        p.fill("white");
        for (let stick of world.sticks) {
            p.line(stick.bodyA.pos.x, stick.bodyA.pos.y, stick.bodyB.pos.x, stick.bodyB.pos.y);
        }
        p.noStroke();
        for (let body of world.bodies) {
            p.fill(body.color);
            p.circle(body.pos.x, body.pos.y, body.circumference);
        }

    }
});