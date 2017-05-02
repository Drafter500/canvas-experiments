import Ball from './ball';

function ready() {
  const statusPanel = document.querySelector('#status');
  const canvas = document.getElementById('playground');
  const ctx = canvas.getContext('2d');

  let raf;


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
      ball.draw(ctx);
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y + ball.vy + ball.radius > canvas.height ||
              ball.y + ball.vy < 0) {
        ball.bounceY(env.absorptionCoefficient);

        // statusPanel.innerHTML = `vy = ${Math.abs(ball.vy)}`;
      } else {
        ball.accelerateY(env.ay);
      }

      if (ball.x + ball.vx + ball.radius > canvas.width ||
              ball.x + ball.vx - ball.radius < 0) {
        ball.bounceX(env.absorptionCoefficient);
      }
    }

    raf = window.requestAnimationFrame(draw);
  }

  canvas.addEventListener('mouseover', (e) => {
    raf = window.requestAnimationFrame(draw);
  });

  canvas.addEventListener('mouseout', (e) => {
    window.cancelAnimationFrame(raf);
  });
}

document.addEventListener('DOMContentLoaded', ready);
