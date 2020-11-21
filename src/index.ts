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
  const loadedImage: KonvaImage = new Konva.Image({
    image: imageObj,
    x: stage.width() / 2 - 200 / 2,
    y: stage.height() / 2 - 137 / 2,
    width: 200,
    height: 137,
    draggable: true,
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
    });
    selectedImages.push(tr1);

    // クリックされたものだけを選択状態にする
    selectedImages
      .filter((image) => image !== tr1)
      .forEach((image) => image.destroy());
    layer.draw();
    layer.add(tr1);
  });

  layer.add(loadedImage);
  stage.add(layer);
  images.push(loadedImage);
}

window.del = function del(): void {
  images[0].remove();
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
