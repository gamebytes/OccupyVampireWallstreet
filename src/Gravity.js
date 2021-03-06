function Gravity(parent, amount)
{
  this.parent = parent;
  this.gravity = amount || 1;
  this.yVel = 0;
}

Gravity.prototype.update = function(dt)
{
  if (this.parent.components.velocity)
    this.parent.components.velocity.y -= this.gravity * dt;
  else
  {
    this.yVel += this.gravity * dt;
    this.parent.position.y -= this.yVel * dt;
  }
}