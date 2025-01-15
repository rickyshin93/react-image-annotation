import { Editor, FileHelpers, MediaHelpers, TLGeoShape, TLShapeId } from 'tldraw'
import { Annotation } from './types'

const getImage = async (src: string) => {
  let blob: Blob

  // Check if the src is a base64 string
  if (src.startsWith('data:')) {
    // Convert base64 to Blob
    const base64Data = src.split(',')[1] // Extract the base64 data part
    const mimeType = src.split(',')[0].split(':')[1].split(';')[0] // Extract the MIME type
    const byteString = atob(base64Data) // Decode the base64 string
    const arrayBuffer = new ArrayBuffer(byteString.length) // Create an ArrayBuffer
    const uint8Array = new Uint8Array(arrayBuffer) // Create a Uint8Array view of the ArrayBuffer

    // Populate the Uint8Array with the decoded data
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i)
    }

    // Create a Blob from the ArrayBuffer
    blob = new Blob([arrayBuffer], { type: mimeType })
  } else {
    // Fetch the image from the URL
    blob = await fetch(src).then(res => res.blob())
  }

  // Convert Blob to Data URL
  const dataUrl = await FileHelpers.blobToDataUrl(blob)

  // Get image dimensions
  const { w: width, h: height } = await MediaHelpers.getImageSize(blob)

  return { src: dataUrl, width, height, type: blob.type }
}

function makeSureShapeIsAtBottom(editor: Editor, shapeId: TLShapeId) {
  if (!editor) return

  const shape = editor.getShape(shapeId)
  if (!shape) return

  const pageId = editor.getCurrentPageId()

  // The shape should always be the child of the current page
  if (shape.parentId !== pageId) {
    editor.moveShapesToPage([shape], pageId)
  }

  // The shape should always be at the bottom of the page's children
  const siblings = editor.getSortedChildIdsForParent(pageId)
  const currentBottomShape = editor.getShape(siblings[0])!
  if (currentBottomShape.id !== shapeId) {
    editor.sendToBack([shape])
  }
}

const getRectangleAnnotations = (editor: Editor) => {
  if (!editor) return []

  const annotations: Annotation[] = []
  const shapes = editor.getCurrentPageShapes() as TLGeoShape[]

  shapes.forEach((shape: TLGeoShape) => {
    if (shape.type === 'geo' && shape.props.geo === 'rectangle') {
      // Get the original shape properties
      const originalBounds = {
        x: shape.x,
        y: shape.y,
        width: shape.props.w,
        height: shape.props.h,
      }

      // Create annotation with all properties
      const annotation: Annotation = {
        id: shape.id,
        x: originalBounds.x,
        y: originalBounds.y,
        width: originalBounds.width,
        height: originalBounds.height,
        rotation: shape.rotation || 0, // Get the rotation directly from the shape
        type: 'rectangle',
        label: shape.props.text || '',
        timestamp: Date.now(),
        metadata: {
          color: shape.props.color || 'default',
          createdBy: 'user',
          modifiedAt: Date.now(),
          version: 1,
          tags: [],
          isVerified: false,
        },
      }

      annotations.push(annotation)
    }
  })

  return annotations
}

export { getImage, getRectangleAnnotations, makeSureShapeIsAtBottom }
