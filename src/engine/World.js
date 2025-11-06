import Vec2 from "./Vec2.js";
import { Body } from "./Body.js";

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
    }
}