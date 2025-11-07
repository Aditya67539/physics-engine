import Vec2 from "./Vec2.js";

export class Body {
    constructor(x, y, color, radius=25, vel_x=0, vel_y=0, mass=1.0, isStatic=false) {
        this.pos = new Vec2(x, y);
        this.prev_pos = new Vec2(x - vel_x * (1/60), y - vel_y * (1/60)); // for verlet integration
        this.acc = new Vec2(0, 0);
        this.radius = radius;
        this.color = color;
        this.circumference = this.radius * 2;
        this.mass = mass;
        this.isStatic = isStatic;
    }

    getVelocity(dt) {
        return this.pos.clone().sub(this.prev_pos).div(dt);
    }

    setVelocity(vel, dt) {
        this.prev_pos = this.pos.clone().sub(vel.mult(dt));
    }

    applyForce(force) {
        this.acc.add(force.div(this.mass));
    }

    update(dt) {
        if (this.isStatic) return;

        let vel = this.pos.clone().sub(this.prev_pos);
        this.prev_pos.copy(this.pos);
        this.pos.add(vel).add(this.acc.clone().mult(dt ** 2));
        this.acc.set(0, 0);
    }
}   