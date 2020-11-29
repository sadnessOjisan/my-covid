import Konva from "konva";
import COVID from "./img/covid.png";
import sunglass from "./img/sunglass.png";
import eye from "./img/eye.png";
import mouthLips from "./img/mouth-lips.png";
import nose from "./img/nose.png";
import hanage from "./img/hanage.png";
import poo from "./img/poo.png";
import redkinoko from "./img/redkinoko.png";
import { Image as KonvaImage } from "konva/types/shapes/Image";
import { Transformer } from "konva/types/shapes/Transformer";

declare const window: any;
declare const firebase: any;

const width = window.innerWidth / 2;
const height = window.innerHeight / 2;

var db = firebase.firestore();

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
  drawBorder: true,
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

function downloadURI(uri: string, name: string) {
  let link: HTMLAnchorElement | null = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link = null;
}

window.del = function del(): void {
  const selectedImage = selectedImages[0];
  if (!selectedImage) {
    alert("画像を選択してください。");
    return;
  }
  const name = selectedImage.name();
  selectedImage.destroy();
  const shapes = stage.find(`.${name}`);
  shapes.each((shape) => {
    shape.destroy();
  });
  images.shift();
  layer.draw();
};

window.add = function add(imageName: string): void {
  const imageObject = new Image();
  imageObject.onload = function () {
    drawImage(imageObject);
  };
  const fileName = records.find((record) => imageName === record.id)?.fileName;
  imageObject.src = fileName;
};

function init() {
  // covidの配置
  const imageObject = new Image();
  imageObject.onload = function () {
    const loadedImage: KonvaImage = new Konva.Image({
      image: imageObject,
      x: stage.width() / 2 - 200 / 2,
      y: stage.height() / 2 - 200 / 2,
      width: 200,
      height: 200,
    });
    layer.add(loadedImage);
    stage.add(layer);
    layer.draw();
  };
  imageObject.src = COVID;
}

window.exportImage = function exportImage(): void {
  stage.find("Transformer").each((d) => d.destroy());
  stage.toImage({
    callback(img) {
      console.log(img.src);
      db.collection("images").add({
        title: "Ada",
        data: img.src,
      });
      // var storageRef = firebase.storage().ref();
      // storageRef
      //   .child("mountains.png")
      //   .putString(img.src, "base64", {
      //     contentType: "image/png",
      //   })
      //   .then(function (snapshot: any) {
      //     console.log(snapshot);
      //   });
      downloadURI(img.src, "stage.png");
    },
    pixelRatio: 3,
  });
};

init();

const records = [
  { id: "sunglass", fileName: sunglass },
  { id: "eye", fileName: eye },
  { id: "mouth-lips", fileName: mouthLips },
  { id: "nose", fileName: nose },
  { id: "hanage", fileName: hanage },
  { id: "poo", fileName: poo },
  { id: "redkinoko", fileName: redkinoko },
];

records.forEach((record) => {
  console.log("record.id", record.id);
  const el = document.getElementById(record.id);
  el?.setAttribute("src", record.fileName);
});
