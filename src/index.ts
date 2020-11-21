import Konva from "konva";
import Test from "./img/test.png";
import A from "./img/a.png";
import { Image as KonvaImage } from "konva/types/shapes/Image";
import { Transformer } from "konva/types/shapes/Transformer";

const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const images: KonvaImage[] = [];
const selectedImages: Transformer[] = [];
const layer = new Konva.Layer();

function drawImage(imageObj: HTMLImageElement) {
  const id = Math.random().toString(32).substring(2);
  const loadedImage: KonvaImage = new Konva.Image({
    image: imageObj,
    x: stage.width() / 2 - 200 / 2,
    y: stage.height() / 2 - 137 / 2,
    width: 200,
    height: 137,
    draggable: true,
    name: id,
  });

  // add cursor styling
  loadedImage.on("mouseover", function () {
    document.body.style.cursor = "pointer";
  });
  loadedImage.on("mouseout", function () {
    document.body.style.cursor = "default";
  });
  loadedImage.on("click", () => {
    const tr1 = new Konva.Transformer({
      nodes: [loadedImage],
      name: id,
    });
    // クリックされたものだけを選択状態にする
    const oldImage = selectedImages.shift();
    if (oldImage) {
      oldImage.destroy();
    }
    selectedImages.push(tr1);
    layer.draw();
    layer.add(tr1);
  });

  layer.add(loadedImage);
  stage.add(layer);
  images.push(loadedImage);
}

window.del = function del(): void {
  const selectedImage = selectedImages[0];
  if (!selectedImage) {
    alert("画像を選択してください。");
    return;
  }
  const name = selectedImage.name();
  console.log("name", name);
  selectedImage.destroy();
  var shapes = stage.find(`.${name}`);
  shapes.each((shape) => {
    shape.destroy();
  });
  images.shift();
  layer.draw();
};

window.add = function add(imageName: string): void {
  const imageObject = new Image();
  if (imageName === "a") {
    imageObject.onload = function () {
      drawImage(imageObject);
    };
    imageObject.src = A;
  } else {
    const imageObject = new Image();
    imageObject.onload = function () {
      drawImage(imageObject);
    };
    imageObject.src = Test;
  }
};
