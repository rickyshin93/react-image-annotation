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

Don't forget import styles `import 'tldraw/tldraw.css';`

## Basic Usage

```tsx
import { ImageAnnotationEditor } from '@your-package/image-annotator'
function App() {
  const images = [
    {
      id: '1',
      src: 'https://example.com/image1.jpg',
      annotations: [], // Initial annotations if any
    },
  ]
  const handleDone = ({ annotations, image }) => {
    console.log('Annotations:', annotations)
    console.log('Image:', image)
  }
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <ImageAnnotationEditor
        images={images}
        onDone={handleDone}
        tools={{
          eraser: { enabled: true },
          text: { enabled: true },
        }}
      />
    </div>
  )
}
```

## Advanced Usage

### Multiple Images with Initial Annotations

```tsx
import { ImageAnnotationEditor } from '@your-package/image-annotator'
function AdvancedExample() {
  const images = [
    {
      id: '1',
      src: 'https://example.com/image1.jpg',
      annotations: [
        {
          id: 'anno1',
          x: 100,
          y: 100,
          width: 200,
          height: 150,
          rotation: 0,
          label: '1',
          timestamp: Date.now(),
          metadata: {
            color: 'red',
            createdBy: 'user1',
          },
        },
      ],
    },
    {
      id: '2',
      src: 'https://example.com/image2.jpg',
      annotations: [],
    },
  ]
  const handleAnnotationCreated = ({ image, annotation }) => {
    console.log('New annotation created on image ${image.id}:', annotation)
  }
  const handleAnnotationChange = ({ image, annotation }) => {
    console.log('Annotation changed on image ${image.id}:', annotation)
  }
  const handleAnnotationDeleted = ({ image, annotation }) => {
    console.log('Annotation deleted from image ${image.id}:', annotation)
  }
  return (
    <div style={{ width: '100%', height: '800px', position: 'relative' }}>
      <ImageAnnotationEditor
        images={images}
        tools={{
          eraser: { enabled: true },
          text: { enabled: true },
        }}
        onAnnotationCreated={handleAnnotationCreated}
        onAnnotationChange={handleAnnotationChange}
        onAnnotationDeleted={handleAnnotationDeleted}
        onDone={({ annotations, image }) => {
          console.log('Final annotations:', annotations)
        }}
      />
    </div>
  )
}
```

## Features

- Rectangle annotations with auto-incrementing numeric labels
- Support for multiple images
- Image navigation controls
- Customizable toolbar with rectangle, text, eraser, and hand tools
- Annotation event callbacks
- Support for both URL and base64 image sources

## Notes

- The component requires a parent container with relative positioning and explicit dimensions
- The editor automatically fits images to the viewport while maintaining aspect ratio
- Annotations are automatically saved when changes occur
- The component supports up to 999 numbered annotations per image

## License

- Same as [tldraw](https://tldraw.dev/)

Keep working on for this project now >>>
