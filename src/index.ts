import Konva from "konva";
import COVID from "./img/covid.png";
import spike from "./img/spike.png";
import sunglass from "./img/sunglass.png";
import eye from "./img/eye.png";
import mouthLips from "./img/mouth-lips.png";
import nose from "./img/nose.png";
import hanage from "./img/hanage.png";
import poo from "./img/poo.png";
import redkinoko from "./img/redkinoko.png";
import hamburgerUpper from "./img/hamburgerUpper.png";
import hamburgerBottom from "./img/hamburgerBottom.png";
import thinking from "./img/thinking.png";
import syamiko from "./img/syamiko.png";
import syamisippo from "./img/syamisippo.png";
import react from "./img/react.png";
import vue from "./img/vue.png";
import angular from "./img/angular.png";
import jq from "./img/jq.png";
import jquery from "./img/jquery.png";
import leftarm from "./img/leftarm.png";
import rightarm from "./img/rightarm.png";
import ribon from "./img/ribon.png";
import syringe from "./img/syringe.png";
import headphone from "./img/headphone.png";
import books from "./img/books.png";
import dish_cup from "./img/dish_cup.png";
import fork from "./img/fork.png";
import houchou from "./img/houchou.png";
import ju from "./img/ju.png";
import taion36 from "./img/taion36.png";
import taion38 from "./img/taion38.png";
import { Image as KonvaImage } from "konva/types/shapes/Image";
import { Transformer } from "konva/types/shapes/Transformer";

declare const window: any;
declare const firebase: any;

const width = window.innerWidth / 2;
const height = window.innerHeight / 2;

const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
  drawBorder: true,
});

const images: KonvaImage[] = [];
const selectedImages: Transformer[] = [];
const layer = new Konva.Layer();
document.addEventListener("click", (e: MouseEvent) => {
  // canvas, 追加ボタン以外をクリックしたときはフォーカス外す
  // @ts-ignore
  if (!e.target.closest(".container") && !e.target.closest(".imageButton")) {
    console.log("focus外す");
    selectedImages.forEach((transform) => transform.destroy());
    selectedImages.length = 0;
    layer.draw();
    console.log("selectedImages", selectedImages);
  } else {
    console.log("focus当てる");
    console.log("selectedImages", selectedImages);
  }
});

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
    const tr = new Konva.Transformer({
      nodes: [loadedImage],
      name: id,
    });
    // クリックされたものだけを選択状態にする
    const oldImage = selectedImages.shift();
    if (oldImage) {
      oldImage.destroy();
    }
    selectedImages.push(tr);
    layer.draw();
    layer.add(tr);
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
  selectedImage.destroy();
  const shapes = stage.find(`.${name}`);
  shapes.each((shape) => {
    shape.destroy();
  });
  images.shift();
  layer.draw();
};

// 選択された画像をcanvasに追加する
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
  const inputEl = document.getElementById("titleInput") as HTMLInputElement;
  const buttonEl = document.getElementById("submitbutton") as HTMLInputElement;
  buttonEl.textContent = "送信中";
  const title = inputEl.value;
  stage.find("Transformer").each((d) => d.destroy());
  stage.toImage({
    callback(img) {
      var db = firebase.firestore();
      db.collection("images")
        .add({
          title: title,
          data: img.src,
        })
        .then((docRef: any) => {
          console.log(docRef.id);
          inputEl.value = "";
          buttonEl.textContent = "作成する";
          window.location.href = `/share.html?id=${docRef.id}`;
        });
    },
    pixelRatio: 3,
  });
};

init();

const records = [
  { id: "spike", fileName: spike },
  { id: "sunglass", fileName: sunglass },
  { id: "eye", fileName: eye },
  { id: "mouth-lips", fileName: mouthLips },
  { id: "nose", fileName: nose },
  { id: "hanage", fileName: hanage },
  { id: "poo", fileName: poo },
  { id: "redkinoko", fileName: redkinoko },
  { id: "hamburgerUpper", fileName: hamburgerUpper },
  { id: "hamburgerBottom", fileName: hamburgerBottom },
  { id: "syamiko", fileName: syamiko },
  { id: "thinking", fileName: thinking },
  { id: "syamisippo", fileName: syamisippo },
  { id: "react", fileName: react },
  { id: "vue", fileName: vue },
  { id: "angular", fileName: angular },
  { id: "jq", fileName: jq },
  { id: "jquery", fileName: jquery },
  { id: "leftarm", fileName: leftarm },
  { id: "rightarm", fileName: rightarm },
  { id: "ribon", fileName: ribon },
  { id: "syringe", fileName: syringe },
  { id: "headphone", fileName: headphone },
  { id: "books", fileName: books },
  { id: "dish_cup", fileName: dish_cup },
  { id: "fork", fileName: fork },
  { id: "houchou", fileName: houchou },
  { id: "ju", fileName: ju },
  { id: "taion36", fileName: taion36 },
  { id: "taion38", fileName: taion38 },
];

records.forEach((record) => {
  const el = document.getElementById(record.id);
  el?.setAttribute("src", record.fileName);
});
