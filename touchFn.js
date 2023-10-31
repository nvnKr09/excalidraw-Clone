
const touch_StartDrawing = (e)=>{
  e.preventDefault();
  isDrawing = true;
  const touch = e.type === "touchstart" ? e.touches[0] : e;
  prevMouseX = touch.clientX - canvas.getBoundingClientRect().left;
  prevMouseY = touch.clientY - canvas.getBoundingClientRect().top;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = brushWidth; // passing brushSize as line width
  ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
  ctx.fillStyle = selectedColor; // passing selectedColor as fill style
  
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
};

const touch_drawing = (e)=>{
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.type === "touchmove" ? e.touches[0] : e;
    const x = touch.clientX - canvas.getBoundingClientRect().left;
    const y = touch.clientY - canvas.getBoundingClientRect().top;
    e.offsetX = x;
    e.offsetY = y;
    
    // arrow-draw vars
  endX = e.offsetX;
  endY = e.offsetY;
  ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

  // According to buttons
  if (selectedTool === "pencil") {
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with color
  } else if (selectedTool === "eraser") {
    ctx.strokeStyle = bgSelectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "square") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else if (selectedTool === "line") {
    drawLine(e);
  } else if (selectedTool === "diamond") {
    drawDiamond(e);
  } else if (selectedTool === "arrow") {
    drawArrow(ctx, prevMouseX, prevMouseY, endX, endY);
  }
};

const touch_endDrawing = ()=>{
    isDrawing = false;
};


// Add touch event listeners to the canvas
canvas.addEventListener("pointerdown", touch_StartDrawing);
canvas.addEventListener("pointermove", touch_drawing);
canvas.addEventListener("pointerup", touch_endDrawing);
canvas.addEventListener("touchstart", touch_StartDrawing);
canvas.addEventListener("touchmove", touch_drawing);
canvas.addEventListener("touchend", touch_endDrawing);

