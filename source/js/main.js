import Particle from './particle';
import { loop, line, getWindowSize, random, dist, delay } from './helpers';

class ParticlesAnimation{

    constructor(settings = {}){
        this.userSettings = settings;
        this.defaultSettings = {
            id: 'canvas-particles-animation',
            backgroundColor: '#000000',
            particlesCount: 150,
            maxLengthParticle: 120,
            colorParticle: '#ffffff',
            radiusParticle: 3,
            speedParticle: 1,
            colorLineRGB: '255, 255, 255',
            breakpoints: [],
            ...this.userSettings
        }
        this.settings = {
            ...this.defaultSettings
        };
        this.breakpoints = this.settings.breakpoints;
        this.canvas = document.getElementById(this.settings.id);
    }

    draw(){
        this.context.clearRect(0, 0, this.width, this.height);
        for(let i = 0; i < this.settings.particlesCount; i++){
            const particle = this.particles[i];
            particle.move(this.width, this.height);
            particle.draw(this.context);
        }
        for(let i = 0; i < this.settings.particlesCount; i++){
            for(let j = i; j < this.settings.particlesCount; j++){
                const x1 = this.particles[i].pos.x;
                const y1 = this.particles[i].pos.y;
                const x2 = this.particles[j].pos.x;
                const y2 = this.particles[j].pos.y;
                const distance = dist(this.particles[i].pos, this.particles[j].pos);
                if(distance <= this.settings.maxLengthParticle){
                    const opacity = 1 - distance / this.settings.maxLengthParticle;
                    line(this.context, x1, y1, x2, y2, 1, `rgba(${this.settings.colorLineRGB}, ${opacity})`);
                }
            }
        }
    };

    step(){
        loop(this.step.bind(this));
		this.draw();
    };

    resize(){
        const windowSize = getWindowSize();
        if(this.fullWidth){
            this.width = windowSize.w;
            this.canvas.width = this.width;
        }
        if(this.fullHeight){
            this.height = windowSize.h;
            this.canvas.height = this.height;
        }
        if(this.breakpoints.length){
            for(const i in this.breakpoints){
                const breakpoint = this.breakpoints[i];
                let reInit = false;
                if(breakpoint.width && breakpoint.settings && windowSize.w <= breakpoint.width ||
                    breakpoint.height && breakpoint.settings && windowSize.h <= breakpoint.height){
                    this.settings = {
                        ...this.settings,
                        ...breakpoint.settings
                    }
                    if(breakpoint.particlesCount && this.settings.particlesCount != breakpoints.particlesCount){
                        reInit = true;
                    }
                }
                else{
                    if(this.settings.particlesCount != this.defaultSettings.particlesCount){
                        reInit = true;
                    }
                    this.settings = {
                        ...this.defaultSettings
                    }
                }
                if(reInit){
                    this.init();
                }
            }
        }
    }

    onResize(){
        window.onresize = () => {
            delay(this.resize.bind(this), 500);
        }
    }

    init(){
        if(!this.canvas){
            return;
        }
        this.context = this.canvas.getContext('2d');
        this.width = this.settings.width || getWindowSize().w;
        this.height = this.settings.height || getWindowSize().h;
        this.canvas.style.backgroundColor = this.settings.backgroundColor;
        this.fullWidth = !this.settings.width;
        this.fullHeight = !this.settings.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.particles = [];
        for(let i = 0; i < this.settings.particlesCount; i++){
            const x = random(0, this.width);
            const y = random(0, this.height);
            this.particles.push(new Particle(x, y, this.settings.colorParticle, this.settings.radiusParticle, this.settings.speedParticle));
        }
    }

    run(){
        this.onResize();
        this.resize();
        this.init();
        this.step();
    }
}

new ParticlesAnimation().run();

export default ParticlesAnimation;

