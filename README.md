## 참고 템플릿 사이트

```
https://ko.wix.com/website/templates

https://www.wix.com/demone2/online-grocery-store

https://d.cafe24.com/sample?productCode=PTMD778258&frame=P

리액트 이미지 확대 기능
https://velog.io/@eenaree/react-image-zoom-in
```

# version

node 20.10.0
</br>
react 18.2.0
</br>

## 폴더 구조 설계

```
my-react-app/
  ├── public/
  │   ├── index.html
  │   ├── favicon.ico
  │   └── images/
  │       └── image.jpg...
  │
  ├── src/
  │   ├── components/
  │   │   ├── Header/
  │   │   │   ├── Header.js
  │   │   │   └── Header.css
  │   │   │
  │   │   ├── Home/
  │   │   │   ├── Banner/
  │   │   │   │   ├── Banner.js
  │   │   │   │   └── Banner.css
  │   │   │   │
  │   │   │   ├── Product/
  │   │   │   │   ├── Card/
  │   │   │   │   │   ├── Card.js
  │   │   │   │   │   └── Card.css
  │   │   │   │   │
  │   │   │   │   └── ProductDetail/
  │   │   │   │       ├── ProductDetail.js
  │   │   │   │       └── ProductDetail.css
  │   │   │   │
  │   │   │   └── ...
  │   │   │
  │   │   └── ...
  │   │
  │   ├── pages/
  │   │   ├── SignInPage/
  │   │   │   ├── SignInPage.js
  │   │   │   └── SignInPage.css
  │   │   │
  │   │   ├── SignInPage/
  │   │   │   ├── SignUpPage.js
  │   │   │   └── SignUpPage.css
  │   │   │
  │   │   ├── HomePage/
  │   │   │   ├── HomePage.js
  │   │   │   └── HomePage.css
  │   │   │
  │   │   ├── ProductDetailPage/
  │   │   │   ├── ProductDetailPage.js
  │   │   │   └── ProductDetailPage.css
  │   │   └── ...
  │   │
  │   ├── utils/
  │   │
  │   ├── api/
  │   │   ├── auth/
  │   │   │   ├── HomePage.js
  │   │   │   └── HomePage.css
  │   │   │
  │   │   ├── product/
  │   │   │   ├── product_api.js
  │   │   │   └── product_pagination_api.js
  │   │   │
  │   │   ├── custom_hook/
  │   │   │   └── useData_api.js
  │   │   └── ...
  │   │
  │   ├── store/
  │   │   └── atoms/
  │   │       ├── index.js
  │   │       ├── stockAtom.js
  │   │       └── userAtom.js
  │   │
  │   ├── index.js
  │   ├── index.css
  |   ├── App.js
  |   └── App.css
  │
  ├── .env
  ├── .gitignore
  ├── package.json
  └── README.md
```

<br />
<br />
<br />

## 라이브러리

## router

### `react router dom`

```
npm install react-router-dom@6

[index.js]

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
```

## icon

### `react icon`

```
https://react-icons.github.io/react-icons/

npm install react-icons --save

[사용하고자 하는 js]

import { 아이콘 이름 } from "react-icons/명시하는대로"
```

## loading

### `react lazyload`

```
웹페이지를 불러올 때, 바로 필요하지 않은(보여지지않는) 이미지들의 로딩 시점을 뒤로 미루는 것이다. 사용자가 스크롤 등을 통해 이미지가 보여지는 시점이 되면 그 때 로딩을 한다.
스크롤될 때 필요한 이미지만 로드

npm install react-lazyload

import LazyLoad from "react-lazyload";


<LazyLoad key={product.id} height={200} once> </LazyLoad>

'height' : 이미지가 로드되기 전에 사용할 공간 지정
'once' : 이미지가 한 번 로드되면 다시 로드하지 않음
```

## skeleton UI

### `react-loading-skeleton`

```
데이터가 전부 로드되기 전까지 UI 뼈대만 보여줌

npm install react-loading-skeleton
```

## react-spinners

### `react-spinners`

```
로딩 시 스피너

npm install react-loading-skeleton
```

## 상태관리

### `recoil`

```
npm install recoil

1. App.js
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
}

2. 상태관리 할 변수 파일 작성
나는 index.js에서 모든 파일을 관리하기 위해 따로 두었음

import { atom } from "recoil";

export const navState = atom({
    key: "navState",
    default: "",
});

3. set
import { navState } from "../../store/atoms/index";

const [nav, setNav] = useRecoilState(navState);

4. get

import { navState } from "../../store/atoms/index";
const nav = useRecoilValue(navState);
```

###

<br />
<br />
<br />
<br />
<br />

### `init'

```
npx create-react-app my-app
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
