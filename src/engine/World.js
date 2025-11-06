import Vec2 from "./Vec2.js";
import { Body } from "./Body.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./settings.js";

export class World {
    constructor(gravity=new Vec2(0, 981.4)) {
        this.gravity = gravity;
        this.bodies = [];
    }

    addBody(body) {
        this.bodies.push(body);
    }

    update(dt) {
        for (let body of this.bodies) {
            body.applyForce(this.gravity.clone().mult(body.mass));
        }

        for (let body of this.bodies) {
            body.update(dt);
            this.boundaryCollision(body);
        }
    }

    boundaryCollision(body) {
        let vel = body.pos.clone().sub(body.prev_pos);

        if (body.pos.x - body.radius < 0) {
            body.pos.x = body.radius;
            body.prev_pos.x = body.pos.x + vel.x;
        } else if (body.pos.x + body.radius > SCREEN_WIDTH) {
            body.pos.x = SCREEN_WIDTH - body.radius;
            body.prev_pos.x = body.pos.x + vel.x;
        }

        if (body.pos.y - body.radius < 0) {
            body.pos.y = body.radius;
            body.prev_pos.y = body.pos.y + vel.y;
        } else if (body.pos.y + body.radius > SCREEN_HEIGHT) {
            body.pos.y = SCREEN_HEIGHT - body.radius;
            body.prev_pos.y = body.pos.y + vel.y;
        }
    }
}