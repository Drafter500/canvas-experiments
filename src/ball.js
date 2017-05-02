export default class Ball {
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

  getSpeedAfterBounce(speedParameter, speedAbsorption) {
    return speedParameter * (-1) * speedAbsorption;
  }

  bounceX(absorptionCoefficient) {
    this.vx = this.getSpeedAfterBounce(this.vx, absorptionCoefficient);
  }

  bounceY(absorptionCoefficient) {
    this.vy = this.getSpeedAfterBounce(this.vy, absorptionCoefficient);
    this.vx *= absorptionCoefficient;

    if (Math.abs(this.vy) < 0.01) {
      this.vy = 0;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
