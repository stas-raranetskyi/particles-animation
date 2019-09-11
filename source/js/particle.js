import { circle, createVector, random, dist} from './helpers';

export default class Particle {
    constructor(x, y, color = 'rgba(255, 40, 40, 1)', radius = 3, speed = 0.4) {
        this.pos = createVector(x, y);
        this.direction = createVector(random(-speed, speed), random(-speed, speed));
        this.color = color;
        this.radius = radius;
    }

    move(w, h) {
        this.pos.x + this.direction.x > w && this.direction.x > 0 || this.pos.x + this.direction.x < 0 && this.direction.x < 0? this.direction.x *= -1 : this.direction.x;
        this.pos.y + this.direction.y > h && this.direction.y > 0 || this.pos.y + this.direction.y < 0 && this.direction.y < 0? this.direction.y *= -1 : this.direction.y;
        this.pos.x += this.direction.x ;
        this.pos.y += this.direction.y;
    }

    draw(cxt) {
        circle(cxt, this.pos.x, this.pos.y, this.radius);
    }
}
