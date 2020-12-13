# my-covid

俺の恋人

## dev

開発用 URL: https://my-covid-dev.web.app

```
npm i

npm run dev
```

## 画像追加手順

### 1. フォルダに画像を追加

my-covid/src/img/ に画像を追加

### 2. my-covid/src/index.ts で画像を import

```ts
...
import ju from "./img/ju.png";
import taion36 from "./img/taion36.png";
import taion38 from "./img/taion38.png";
```

### 3. my-covid/src/index.html にボタン要素追加

クリックしたら画像が追加されるようにしたいためです。id と onClick の引数名を一致させておいてください。class 名は`imageButton`です。

```html
...
<input id="ju" type="image" onclick="add('ju')" class="imageButton" />
<input id="taion36" type="image" onclick="add('taion36')" class="imageButton" />
<input id="taion38" type="image" onclick="add('taion38')" class="imageButton" />
```

追加したら id 名を覚えておいてください。

### 4. my-covid/src/index.ts で records に追加

先ほど追加要素の id と import した画像要素の名前を組にして record に追加してください。

```ts
const records = [
  ...{ id: "ju", fileName: ju },
  { id: "taion36", fileName: taion36 },
  { id: "taion38", fileName: taion38 },
]
```

追加すると後続の処理が諸々の初期化をしてくれます。
