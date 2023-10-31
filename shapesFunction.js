// EventListeners
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);

// touchEvents
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", drawing);
canvas.addEventListener("touchend", stopDraw);

canvas.addEventListener("pointerdown", startDraw);
canvas.addEventListener("pointermove", drawing);
canvas.addEventListener("pointerup", stopDraw);

// rectangle function:---------------------

const drawRect = (e) => {
  if (!fillColor.checked) {
    // creating circle according to the mouse pointer
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

// circle function:---------------------

const drawCircle = (e) => {
  ctx.beginPath();

  // Get the center coordinates of the ellipse
  const centerX = (prevMouseX + e.offsetX) / 2;
  const centerY = (prevMouseY + e.offsetY) / 2;

  // Calculate the radii (half-width and half-height) of the ellipse
  const radiusX = Math.abs(e.offsetX - prevMouseX) / 2;
  const radiusY = Math.abs(e.offsetY - prevMouseY) / 2;

  // Set the rotation angle of the ellipse (0 for a normal ellipse)
  const rotation = 0;

  // Draw the ellipse
  ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
  ctx.stroke(); // Draw the outline of the ellipse
};

// Diamond function:---------------------

const drawDiamond = (e) => {
  const centerX = (e.offsetX + prevMouseX) / 2;
  const centerY = (e.offsetY + prevMouseY) / 2;

  const halfWidth = Math.abs(prevMouseX - e.offsetX) / 2;
  const halfHeight = Math.abs(prevMouseY - e.offsetY) / 2;

  ctx.beginPath();
  ctx.moveTo(centerX, centerY - halfHeight); // Top point
  ctx.lineTo(centerX + halfWidth, centerY); // Right point
  ctx.lineTo(centerX, centerY + halfHeight); // Bottom point
  ctx.lineTo(centerX - halfWidth, centerY); // Left point
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
  ctx.stroke();
};

// Line draw function:---------------------

const drawLine = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY); // Start from the previous mouse position
  ctx.lineTo(e.offsetX, e.offsetY); // Draw a line to the current mouse position
  ctx.stroke();
  ctx.closePath();
};

// Arrow draw function:---------------------

const drawArrow = (ctx, startX, startY, endX, endY) => {
  // Draw a straight line from startX, startY to endX, endY
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Calculate the arrowhead angle
  const angle = Math.atan2(endY - startY, endX - startX);

  // Define the arrowhead size (adjust according to brushWidth)
  const arrowSize = brushWidth * 3;

  // Calculate the coordinates of the arrowhead points
  const x1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
  const y1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
  const x2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
  const y2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);

  // Draw the arrowhead
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(x1, y1);
  ctx.moveTo(endX, endY);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

// stroke Range function:---------------------

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value)); // passing slider value as brushSize

// Clear canvas function:---------------------

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
  ctx.fillStyle = bgSelectedColor;
});

// save img function:---------------------

saveImg.addEventListener("click", () => {
  const link = document.createElement("a"); // creating <a> element
  link.download = `${Date.now()}.jpg`; // passing current date as link download value
  link.href = canvas.toDataURL(); // passing canvasData as link href value
  link.click(); // clicking link to download image
});

// Color Picker function:---------------------

// Add event listeners for readymade colors
readyMadeColor.forEach((colorDiv) => {
  colorDiv.addEventListener("click", () => {
    selectedColor = getComputedStyle(colorDiv).backgroundColor;
    console.log("Selected Color: " + selectedColor);
  });
});
// Add event listener for the stroke color-picker
colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
  console.log("Selected Color: " + selectedColor);
});

// Canvas background:
bgReadyMadeColor.forEach((colorDiv) => {
  colorDiv.addEventListener("click", () => {
    bgSelectedColor = getComputedStyle(colorDiv).backgroundColor;
    console.log(`bgSelected color: ${bgSelectedColor}`);

    ctx.fillStyle = getComputedStyle(colorDiv).backgroundColor;
    // Redraw the canvas to update the fillStyle
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
});
// Add event listener for the Canvas backgroung color-picker
bgColorPicker.addEventListener("input", () => {
  bgSelectedColor = bgColorPicker.value;
  console.log(`bgSelected color-picker: ${bgSelectedColor}`);

  ctx.fillStyle = bgColorPicker.value;
  // Redraw the canvas to update the fillStyle
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
