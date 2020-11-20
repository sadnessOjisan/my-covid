import Konva from "konva";
import Test from "./img/test.png";
import A from "./img/a.png";
import { Image as KonvaImage } from "konva/types/shapes/Image";

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const objs: KonvaImage[] = [];
const layer = new Konva.Layer();

function drawImage(imageObj: HTMLImageElement) {
  const darthVaderImg: KonvaImage = new Konva.Image({
    image: imageObj,
    x: stage.width() / 2 - 200 / 2,
    y: stage.height() / 2 - 137 / 2,
    width: 200,
    height: 137,
    draggable: true,
  });

  // add cursor styling
  darthVaderImg.on("mouseover", function () {
    document.body.style.cursor = "pointer";
  });
  darthVaderImg.on("mouseout", function () {
    document.body.style.cursor = "default";
  });

  layer.add(darthVaderImg);
  stage.add(layer);
  objs.push(darthVaderImg);
}

const testImage = new Image();
testImage.onload = function () {
  drawImage(testImage);
};
testImage.src = Test;

const aImage = new Image();
aImage.onload = function () {
  drawImage(aImage);
};
aImage.src = A;

window.del = function del(): void {
  objs[0].remove();
  layer.draw();
};
