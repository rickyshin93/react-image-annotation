import { Editor, FileHelpers, MediaHelpers, TLGeoShape, TLShapeId, uniqueId } from 'tldraw'
import { Annotation, AnnotatorImage, LoadImageParams } from './types'

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

const IMAGE_LOAD_TIMEOUT = 30000 // 30 seconds

const loadImageWithTimeout = async (src: string) => {
  // Validate URL or base64 image data
  try {
    if (src.startsWith('data:image/')) {
      // Validate base64 image format
      const [header, content] = src.split(',')
      if (!header.includes('base64') || !content) {
        throw new Error('Invalid base64 image format')
      }
    } else {
      // Validate regular URL
      new URL(src)
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid base64 image format') {
      throw error
    }
    throw new Error('Invalid image URL')
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Image load timed out')), IMAGE_LOAD_TIMEOUT)
  })

  try {
    const result = await Promise.race([getImage(src), timeoutPromise])
    return result
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Image load timed out') {
        throw new Error(`Failed to load image within ${IMAGE_LOAD_TIMEOUT / 1000} seconds`)
      }
      // Handle network errors or invalid image errors
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Network error: Unable to load image')
      }
      if (error.message.includes('base64')) {
        throw new Error('Invalid base64 image data')
      }
    }
    throw new Error('Failed to load image')
  }
}

const loadImageForIndex = async ({
  imageIndex,
  images,
  setIsLoading,
  setImageLoadError,
  setImage,
  setUsedNumbers,
  setDeletedNumbers,
  onImageLoadError,
}: LoadImageParams) => {
  try {
    setIsLoading(true)
    setImageLoadError(null)
    const base64Image = (await loadImageWithTimeout(images[imageIndex].src)) as AnnotatorImage
    setImage({
      ...base64Image,
      id: images[imageIndex].id || uniqueId(),
    })

    // Update usedNumbers based on current image annotations
    const newUsedNumbers = new Set<number>()
    images[imageIndex].annotations.forEach(annotation => {
      if (annotation.label) {
        const num = parseInt(annotation.label)
        if (!isNaN(num)) {
          newUsedNumbers.add(num)
        }
      }
    })
    setUsedNumbers(newUsedNumbers)
    setDeletedNumbers([]) // Reset deleted numbers when changing images
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Failed to load image')
    console.error('Failed to load image:', err)
    setImageLoadError(err)
    onImageLoadError?.(err, {
      id: images[imageIndex].id || '',
      src: images[imageIndex].src,
      index: imageIndex,
    })
  } finally {
    setIsLoading(false)
  }
}

export { getImage, getRectangleAnnotations, loadImageForIndex, loadImageWithTimeout, makeSureShapeIsAtBottom }
