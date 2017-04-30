
function ready() {
  const statusPanel = document.querySelector('#status');
  const canvas = document.getElementById('playground');
  const ctx = canvas.getContext('2d');

  let raf;

  const ball = {
    x: 100,
    y: 100,
    vx: 7,
    vy: 0.5,
    ay: 0.5,
    fadey: 0.8,
    radius: 15,
    color: 'blue',
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();                                  
      ctx.fillStyle = this.color;
      ctx.fill();
     
    },
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy + ball.radius > canvas.height ||
            ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
      ball.vy *= ball.fadey;
      ball.vx *= ball.fadey;

      if (Math.abs(ball.vy) < 0.001) {
          ball.vy = 0;
        }

      statusPanel.innerHTML = `vy = ${Math.abs(ball.vy)}`;
    } else {
      ball.vy += ball.ay;
    }

    if (ball.x + ball.vx + ball.radius > canvas.width ||
            ball.x + ball.vx - ball.radius < 0) {
      ball.vx *= ball.fadey;
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
