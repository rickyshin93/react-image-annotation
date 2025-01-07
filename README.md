# React Image annotation project based on [tldraw](https://tldraw.dev/)

An image annotation tool for ai project that manual annotation for images, easy to use!

> Big Thanks to [tldraw](https://tldraw.dev/) !

## install

npm

```bash
npm install @rockshin/react-image-annotation tldraw
```

pnpm

```bash
pnpm add @rockshin/react-image-annotation tldraw
```

## Easy to use:

Don't forget import styles `import 'tldraw/tldraw.css';
`

```tsx
import { ImageAnnotationEditor } from '@rockshin/react-image-annotation'
import 'tldraw/tldraw.css'
const App = () => {
  return (
    <div className="content">
      <div>
        <ImageAnnotationEditor
          images={[
            {
              src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              annotations: [],
            },
          ]}
          onDone={annotations => {
            console.log(annotations)
          }}
        />
      </div>
    </div>
  )
}

export default App
```

## Features

- support next and prev image handler

==Keep working on for this project now >>>==
