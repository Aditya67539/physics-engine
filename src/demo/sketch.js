import p5 from "https://cdn.jsdelivr.net/npm/p5@1.9.0/+esm";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../engine/settings.js";
import { World } from "../engine/World.js";
import { Body } from "../engine/Body.js";

new p5((p) => {
    let world;

    p.setup = () => {
        p.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

        world = new World();
        world.addBody(new Body(600, 200));
        world.addBody(new Body(1200, 200, 25, -100, 0));
    }

    p.draw = () => {
        const dt = p.deltaTime / 1000.0;

        world.update(dt);

        p.background(0);

        p.noStroke();
        p.fill("red");
        for (let body of world.bodies) {
            p.circle(body.pos.x, body.pos.y, body.circumference);
        }
    }
});