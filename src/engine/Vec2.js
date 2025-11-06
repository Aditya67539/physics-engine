export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    
    clone() {
        return new Vec2(this.x, this.y);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    neg() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    div(s) {
        if (s === 0) return;
        this.x /= s;
        this.y /= s;
        return this;
    }

    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }

    static sub(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }

    static scale(v, s) {
        return new Vec2(v.x * s, v.y * s);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    normalize() {
        let len = this.length();
        this.x /= len;
        this.y /= len;
        return this;
    }

    distanceSq(v) {
        let dx = v.x - this.x;
        let dy = v.y - this.y;
        return dx * dx + dy * dy;
    }

    distance(v) {
        return Math.sqrt(this.distanceSq(v));
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    projectOn(v) {
        const scalar = this.dot(v) / v.lengthSq();
        this.x = v.x * scalar;
        this.y = v.y * scalar;
        return this;
    }

    isZero() {
        return this.x === 0 && this.y === 0;
    }

    equals(v, epsilon=1e-6) {
        return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon;
    }

    toString() {
        return `Vec2(${this.x.toFixed(2), this.y.toFixed(2)})`;
    }
}