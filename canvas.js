const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

function drawCircle(center, r) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
  ctx.stroke();
}
function drawLine(start, end) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}
function clearPage() {
  ctx.clearRect(0, 0, c.width, c.height);
}
