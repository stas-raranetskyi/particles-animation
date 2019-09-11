export const loop = (function(){
    return requestAnimationFrame ||
        webkitRequestAnimationFrame ||
        mozRequestAnimationFrame ||
        oRequestAnimationFrame ||
        msRequestAnimationFrame
})();

export class Vector{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    set(x, y){
        this.x = x;
        this.y = y;
    }

    get(){
        return {x: thix.x, y: this.y};
    }
}

export const createVector = (x, y) => {
    return new Vector(x, y);
}

export const random = (min = 0, max = 1)  => {
    return Math.random() * (max - min) + min;
};

export const line = (ctx, x1, y1, x2, y2, width = 0.5, color = '#ffffff') => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export const circle = (ctx, x, y, r, color = '#ffffff') => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

export const dist = (v1, v2) => {
    try{
        var a = v1.x - v2.x;
        var b = v1.y - v2.y;
        return Math.sqrt(a * a + b * b);
    }
    catch{
        return 0;
    }
}

export const getWindowSize = () => {
    return {
        w: window.innerWidth,
        h: window.innerHeight
    }
}

let timerDelay = null;
export const delay = (cb, timeout = 300) => {
    if(timerDelay){
        clearTimeout(timerDelay);
    }
    timerDelay = setTimeout(() => {
        if(typeof cb === 'function'){
            cb();
        }
    }, timeout);
};
