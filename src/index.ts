import Konva from "konva";

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const layer = new Konva.Layer();
const rectX = stage.width() / 2 - 50;
const rectY = stage.height() / 2 - 25;

const box = new Konva.Rect({
  x: rectX,
  y: rectY,
  width: 100,
  height: 50,
  fill: "#00D2FF",
  stroke: "black",
  strokeWidth: 4,
  draggable: true,
});

// add cursor styling
box.on("mouseover", function () {
  document.body.style.cursor = "pointer";
});
box.on("mouseout", function () {
  document.body.style.cursor = "default";
});

layer.add(box);
stage.add(layer);
