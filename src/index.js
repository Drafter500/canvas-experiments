
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

    accelerateY(acceleration) {
      this.vy += acceleration;
    }

    bounceX(absorptionCoefficient) {
      this.vx = getSpeedAfterBounce(this.vx, absorptionCoefficient);
    }

    bounceY(absorptionCoefficient) {
      this.vy = getSpeedAfterBounce(this.vy, absorptionCoefficient);
      this.vx *= absorptionCoefficient;

      if (Math.abs(this.vy) < 0.01) {
        this.vy = 0;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const ball1 = new Ball(20, 'red');
  const ball2 = new Ball(20, 'green');
  const ball3 = new Ball(20, 'blue');

  ball2.setSpeed(-5, 0);
  ball2.setPosition(250, 80);

  ball3.setSpeed(8, 0);
  ball3.setPosition(50, 120);

  const balls = [ball1, ball2, ball3];

  const env = {
    ay: 0.5,
    absorptionCoefficient: 0.8,
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const ball of balls) {
      ball.draw();
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y + ball.vy + ball.radius > canvas.height ||
              ball.y + ball.vy < 0) {
        ball.bounceY(env.absorptionCoefficient);

        //statusPanel.innerHTML = `vy = ${Math.abs(ball.vy)}`;
      } else {
        ball.accelerateY(env.ay);
      }

      if (ball.x + ball.vx + ball.radius > canvas.width ||
              ball.x + ball.vx - ball.radius < 0) {
        ball.bounceX(env.absorptionCoefficient);
      }
    };

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
