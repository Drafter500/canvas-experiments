
function ready() {
  const statusPanel = document.querySelector('#status');
  const canvas = document.getElementById('playground');
  const ctx = canvas.getContext('2d');

  let raf;

  function getSpeedAfterBounce(speedParameter, speedAbsorption) {
    return speedParameter * (-1) * speedAbsorption;
  }

  class Ball {
    constructor(radius, color) {
      this.radius = radius;
      this.color = color;
      this.x = 100;
      this.y = 100;
      this.vx = 5;
      this.vy = 0;
    }

    setSpeed(vx, vy) {
      this.vx = vx;
      this.vy = vy;
    }

    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }

    bounceX(speedAbsorption) {
      this.vx = getSpeedAfterBounce(this.vx, speedAbsorption);
    }

    bounceY(speedAbsorption) {
      this.vy = getSpeedAfterBounce(this.vy, speedAbsorption);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const ball = new Ball(20, 'red');
  const env = {
    ay: 0.5,
    fadey: 0.8,
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy + ball.radius > canvas.height ||
            ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
      ball.vy *= env.fadey;
      ball.vx *= env.fadey;

      if (Math.abs(ball.vy) < 0.001) {
        ball.vy = 0;
      }

      statusPanel.innerHTML = `vy = ${Math.abs(ball.vy)}`;
    } else {
      ball.vy += env.ay;
    }

    if (ball.x + ball.vx + ball.radius > canvas.width ||
            ball.x + ball.vx - ball.radius < 0) {
      ball.vx *= env.fadey;
      ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
  }

  canvas.addEventListener('mouseover', (e) => {
    raf = window.requestAnimationFrame(draw);
  });

  canvas.addEventListener('mouseout', (e) => {
    window.cancelAnimationFrame(raf);
  });

  ball.draw();
}
document.addEventListener('DOMContentLoaded', ready);
