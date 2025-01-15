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
import { ImageAnnotationEditor } from '@rockshin/react-image-annotation'
import 'tldraw/tldraw.css'

function App() {
  const images = [
    {
      id: '1',
      src: 'https://example.com/image1.jpg',
      annotations: [], // Initial annotations (optional)
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
import { ImageAnnotationEditor } from '@rockshin/react-image-annotation'

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
            modifiedAt: Date.now(),
            version: 1,
            tags: [],
            isVerified: false,
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

  return (
    <div style={{ width: '100%', height: '800px', position: 'relative' }}>
      <ImageAnnotationEditor
        images={images}
        initialImageIndex={0}
        tools={{
          eraser: { enabled: true },
          text: { enabled: true },
        }}
        outputTriggerOn={{
          created: true, // Trigger onDone when annotation is created
          changed: true, // Trigger onDone when annotation is modified
          deleted: true, // Trigger onDone when annotation is deleted
        }}
        onAnnotationCreated={({ image, annotation }) => {
          console.log('New annotation:', annotation)
        }}
        onAnnotationChange={({ image, annotation }) => {
          console.log('Modified annotation:', annotation)
        }}
        onAnnotationDeleted={({ image, annotation }) => {
          console.log('Deleted annotation:', annotation)
        }}
        onImageChange={({ index, image }) => {
          console.log('Current image:', index, image)
        }}
        onImageLoadError={error => {
          console.error('Image load error:', error)
        }}
        onDone={({ annotations, image }) => {
          console.log('Final annotations:', annotations)
        }}
      />
    </div>
  )
}
```

## Features

- 🎯 Auto-incrementing numbered annotations (1-999)
- 🖼️ Multi-image support with navigation
- 🔄 Automatic reuse of deleted annotation numbers
- 🎨 Customizable toolbar with:
  - Rectangle tool
  - Text tool (optional)
  - Eraser tool (optional)
  - Hand tool for navigation
- 📊 Comprehensive event callbacks
- 🖼️ Support for both URL and base64 image sources
- 🔄 Automatic image fitting with aspect ratio preservation
- ⚡ Real-time annotation updates
- 🔒 Locked base image to prevent accidental movement

## Important Notes

1. Container Requirements:

   - Parent container must have `position: relative`
   - Explicit dimensions (width/height) are required

2. Image Handling:

   - Images automatically fit to viewport
   - Original aspect ratio is maintained
   - Base image is locked to prevent accidental movement

3. Annotation Limits:

   - Supports up to 999 numbered annotations per image
   - Numbers are automatically reused when annotations are deleted

4. Error Handling:
   - Built-in error handling for image loading
   - Retry mechanism for failed image loads
   - Navigation options during error states

## License

- Same as [tldraw](https://tldraw.dev/)

Keep working on for this project now >>>

🚧 Project under active development. Contributions welcome!
