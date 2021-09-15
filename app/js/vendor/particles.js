window.addEventListener('DOMContentLoaded', ()=>{
  if(document.body.clientWidth > 420){
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = document.body.clientWidth;
    let h = canvas.height = document.body.clientHeight;
  
    let particlesArr = []
    let properties = {
      bgColor: '#010001',
      particlesColor: 'rgba(31,142,250,0.5)',
      particlesLife: 60,
      radius: 3,
      count: 80,
      speed: 0.9,
      lineLength: 260,
    }
  
    document.querySelector('body').appendChild(canvas);
  
    window.addEventListener('resize', () => {
      w = canvas.width = document.body.clientWidth;
      h = canvas.height = document.body.clientHeight;
    })
  
  
    class Particles {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.partSpeedX = Math.random() * (properties.speed * 2) - properties.speed;
        this.partSpeedY = Math.random() * (properties.speed * 2) - properties.speed;
        this.life = Math.random() * properties.particlesLife;
      }
      position() {
        this.x + this.partSpeedX > w && this.partSpeedX > 0 || this.x + this.partSpeedX < 0 && this.partSpeedX < 0 ? this.partSpeedX *= -1 : this.partSpeedX;
        this.y + this.partSpeedY > w && this.partSpeedY > 0 || this.y + this.partSpeedY < 0 && this.partSpeedY < 0 ? this.partSpeedY *= -1 : this.partSpeedY;
        this.x += this.partSpeedX;
        this.y += this.partSpeedY;
      }
      reDraw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = properties.particlesColor;
        ctx.fill();
      }
      rePartLife() {
        if (this.life < 1) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.partSpeedX = Math.random() * (properties.speed * 2) - properties.speed;
          this.partSpeedY = Math.random() * (properties.speed * 2) - properties.speed;
          this.life = Math.random() * properties.particlesLife* 60;
        }
        this.life--;
      }
    }
  
    function drawLine() {
      let x1, y1, x2, y2, length, opacity;
  
      for (let i in particlesArr) {
        for (let j in particlesArr) {
          x1 = particlesArr[i].x;
          y1 = particlesArr[i].y;
          x2 = particlesArr[j].x;
          y2 = particlesArr[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 0.5 - length / properties.lineLength;
            ctx.lineWidth = '0.5';
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }
  
    function reDrawBg() {
      ctx.fillStyle = properties.bgColor;
      ctx.fillRect(0, 0, w, h)
    }
  
    function reDrawParticles() {
      for (let i in particlesArr) {
        particlesArr[i].rePartLife();
        particlesArr[i].position();
        particlesArr[i].reDraw();
      }
    }
  
    function loop() {
      reDrawBg();
      reDrawParticles();
      drawLine();
      requestAnimationFrame(loop);
    }
  
    function init() {
      for (let i = 0; i < properties.count; i++) {
        particlesArr.push(new Particles)
      }
      loop();
    }
  
    init()
  
  }

})
    