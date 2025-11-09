import Vec2 from "./Vec2.js";
import { Body } from "./Body.js";
import { RESTITUTION, SCREEN_HEIGHT, SCREEN_WIDTH } from "./settings.js";

export class World {
    constructor(gravity=new Vec2(0, 981.4)) {
        this.gravity = gravity;
        this.bodies = [];
        this.sticks = [];
    }

    addBody(body) {
        this.bodies.push(body);
    }

    addStick(stick) {
        this.sticks.push(stick);
    }

    update(dt) {
        for (let i = 0; i < 40; i++) {
            for (let stick of this.sticks) {
                stick.update();
            }
        }
        // for (let i = 0; i < this.bodies.length; i++) {
        //     for (let j = i + 1; j < this.bodies.length; j++) {
        //         this.applyGravity(this.bodies[i], this.bodies[j]);
        //     }
        // }
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                this.bodyCollision(this.bodies[i], this.bodies[j], dt);
            }
        }
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

    bodyCollision(bodyA, bodyB, dt) {
        let minDist = bodyA.radius + bodyB.radius;
        let diff = bodyB.pos.clone().sub(bodyA.pos);
        let dist = diff.length();

        if (dist < minDist) {
            let normal = diff.clone().normalize();
            // Avoid overlap
            let overlap = minDist - dist;
            let correction = normal.clone().mult(overlap / (bodyA.mass + bodyB.mass));
            if (!bodyA.isStatic) bodyA.pos.sub(correction.clone().mult(bodyB.mass));
            if (!bodyB.isStatic) bodyB.pos.add(correction.clone().mult(bodyA.mass));


            // Collision resolution
            let e = RESTITUTION;
            let velA = bodyA.getVelocity(dt);
            let velB = bodyB.getVelocity(dt);
            let relVel = velA.clone().sub(velB);
            let relVelAlongNormal = relVel.dot(normal);

            let impulseMag = (-(1 + e) * relVelAlongNormal) / (1/bodyA.mass + 1/bodyB.mass);
            if (impulseMag > 0) return;
            let impulse = normal.clone().mult(impulseMag);

            let deltaA = impulse.clone().div(bodyA.mass);
            let deltaB = impulse.clone().div(bodyB.mass);

            bodyA.setVelocity(velA.clone().add(deltaA), dt);
            bodyB.setVelocity(velB.clone().sub(deltaB), dt);
        }
    }

    applyGravity(bodyA, bodyB) {
        const G = 1e8;

        let diff = bodyB.pos.clone().sub(bodyA.pos);
        let rSq = diff.clone().lengthSq();

        let normal = diff.clone().normalize();

        let forceMag = G * bodyA.mass * bodyB.mass / rSq;
        let force = normal.clone().mult(forceMag);

        bodyA.applyForce(force);
        bodyB.applyForce(force.clone().mult(-1));
    }
}