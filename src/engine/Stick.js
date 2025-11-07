export class Stick {
    constructor(bodyA, bodyB, length=null, stiffness=0.8) {
        this.bodyA = bodyA;
        this.bodyB = bodyB;
        this.length = length ?? this.bodyA.pos.clone().sub(this.bodyB.pos).length();
        this.stiffness = stiffness;
    }

    update() {
        let diff = this.bodyB.pos.clone().sub(this.bodyA.pos);
        let dist = diff.length();
        let diffFactor = (this.length - dist) / dist;

        let correction = diff.mult(0.5 * diffFactor * this.stiffness);

        if (!this.bodyA.isStatic) {
            this.bodyA.pos.sub(correction);
        } 
        if (!this.bodyB.isStatic) {
            this.bodyB.pos.add(correction);
        }
    }
}