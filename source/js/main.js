import Particle from './particle';
import { loop, line, getWindowSize, random, dist } from './helpers';

class ParticlesAnimation{

    constructor(settings = {}){
        this.settings = {
            id: 'canvas-particles-animation',
            width: getWindowSize().w,
            height: getWindowSize().h,
            backgroundColor: '#000000',
            particlesCount: 120,
            maxLengthParticle: 120,
            colorParticleRGB: '255, 255, 255',
            ...settings
        };
        this.canvas = document.getElementById(this.settings.id);
        this.context = this.canvas.getContext('2d');
        this.width = this.settings.width;
        this.height = this.settings.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.backgroundColor = this.settings.backgroundColor;
        this.particlesCount = this.settings.particlesCount;
        this.maxLengthParticle = this.settings.maxLengthParticle;
        this.colorParticleRGB = this.settings.colorParticleRGB;
        this.particles = [];
    }

    draw(){
        this.context.clearRect(0, 0, this.width, this.height);
        for(let i in this.particles){
            const particle = this.particles[i];
            particle.move(this.width, this.height);
            particle.draw(this.context);
        }
        for(let i = 0; i < this.particles.length; i++){
            for(let j = i; j < this.particles.length; j++){
                const x1 = this.particles[i].pos.x;
                const y1 = this.particles[i].pos.y;
                const x2 = this.particles[j].pos.x;
                const y2 = this.particles[j].pos.y;
                const distance = dist(this.particles[i].pos, this.particles[j].pos);
                if(distance <= this.maxLengthParticle){
                    const opacity = 1 - distance / this.maxLengthParticle;
                    line(this.context, x1, y1, x2, y2, 1, `rgba(${this.colorParticleRGB}, ${opacity})`);
                }
            }
        }
    };

    step(){
        loop(this.step.bind(this));
		this.draw();
    };

    run(){
        for(let i = 0; i < this.particlesCount; i++){
            const x = random(0, this.width);
            const y = random(0, this.height);
            this.particles.push(new Particle(x, y));
        }
        this.step();
    }
}

new ParticlesAnimation().run();
