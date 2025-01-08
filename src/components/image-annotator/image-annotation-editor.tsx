import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AssetRecordType,
  DefaultColorStyle,
  DefaultFontStyle,
  DefaultSizeStyle,
  DefaultToolbar,
  Editor,
  FileHelpers,
  MediaHelpers,
  TLGeoShape,
  TLImageShape,
  TLShapeId,
  TLUnknownShape,
  Tldraw,
  TldrawUiMenuItem,
  createShapeId,
  debounce,
  exportToBlob,
  uniqueId,
  useIsToolSelected,
  useTools,
} from 'tldraw'
import './tldraw-reset.css'
import { TopPanel } from './top-panel'
import type { Annotation, AnnotatorImage, ImageAnnotationEditorProps } from './types'
export function ImageAnnotationEditor({
  images,
  onDone,
  onAnnotationCreated,
  onAnnotationChange,
  onAnnotationDeleted,
}: ImageAnnotationEditorProps) {
  if (images.length === 0) return <div>Please provided at least one image</div>
  const [imageShapeId, setImageShapeId] = useState<TLShapeId | null>(null)
  const [editor, setEditor] = useState(null as Editor | null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [image, setImage] = useState<AnnotatorImage | null>(null)
  const hasRegisteredEventHandlers = useRef(false)
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set())
  const [deletedNumbers, setDeletedNumbers] = useState<number[]>([])

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

  useEffect(() => {
    ;(async () => {
      const base64Image = await getImage(images[currentImageIndex].src)
      setImage({ ...base64Image, id: images[currentImageIndex].id || uniqueId() })
    })()
  }, [currentImageIndex])

  function onMount(editor: Editor) {
    setEditor(editor)
    // editor.setCurrentTool('geo', { type: 'rectangle' })
    editor.setStyleForNextShapes(DefaultColorStyle, 'red')
    editor.setStyleForNextShapes(DefaultSizeStyle, 's')
    editor.setStyleForNextShapes(DefaultFontStyle, 'mono')
  }

  const getRectangleAnnotations = useCallback(() => {
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
  }, [editor])

  useEffect(() => {
    if (!editor || !imageShapeId || !image) return

    images[currentImageIndex].annotations.forEach(annotation => {
      const shapeId = annotation.id || createShapeId()
      editor.createShape({
        id: shapeId as TLShapeId,
        type: 'geo',
        x: annotation.x,
        y: annotation.y,
        rotation: annotation.rotation,
        props: {
          geo: 'rectangle',
          w: annotation.width,
          h: annotation.height,
          text: annotation.label || '',
          color: annotation.metadata?.color || 'default',
        },
      })
    })
  }, [editor, imageShapeId, image])

  const handleOnDone = useCallback(async () => {
    if (!editor || !image) return
    const currentAnnotations = getRectangleAnnotations()

    if (imageShapeId) {
      const blob = await exportToBlob({
        editor,
        ids: Array.from(editor.getCurrentPageShapeIds()),
        format: 'png',
        opts: {
          background: true,
          bounds: editor.getShapePageBounds(imageShapeId)!,
          padding: 0,
          scale: 1,
        },
      })

      onDone?.({ blob, annotations: currentAnnotations, image: { id: image.id, src: images[currentImageIndex].src } })
    }
  }, [onDone, editor, imageShapeId, getRectangleAnnotations])

  const CustomDoneButton = useCallback(() => {
    return (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg z-[300] font-bold pointer-events-auto hover:bg-blue-600 m-2"
        onClick={async () => {
          await handleOnDone()
        }}
      >
        Done
      </button>
    )
  }, [getRectangleAnnotations, handleOnDone])

  const generateShortId = (): string => {
    // If there are deleted numbers, use the smallest one first
    if (deletedNumbers.length > 0) {
      const nextNumber = Math.min(...deletedNumbers)
      setDeletedNumbers(prev => prev.filter(n => n !== nextNumber))
      usedNumbers.add(nextNumber)
      return nextNumber.toString()
    }

    // Find the next available number
    let nextNumber = 1
    while (usedNumbers.has(nextNumber) && nextNumber <= 999) {
      nextNumber++
    }

    if (nextNumber > 999) {
      console.warn('Exceeded maximum number of annotations (999)')
      return '999'
    }

    usedNumbers.add(nextNumber)
    return nextNumber.toString()
  }
  // Modify the useEffect block that monitors shape changes
  useEffect(() => {
    if (!editor) return

    const newUsedNumbers = new Set<number>()

    images[currentImageIndex].annotations.forEach(annotation => {
      if (annotation.label) {
        const num = parseInt(annotation.label)
        if (!isNaN(num)) {
          newUsedNumbers.add(num)
        }
      }
    })

    let creatingShapeId: TLShapeId | null = null

    const handlePointerUp = () => {
      if (creatingShapeId) {
        const shape = editor.getShape(creatingShapeId) as TLGeoShape
        if (shape && shape.type === 'geo' && shape.props.geo === 'rectangle') {
          const newId = generateShortId()

          editor.updateShape({
            id: shape.id,
            type: 'geo',
            props: {
              ...shape.props,
              labelColor: 'red',
              text: newId,
            },
          })

          const annotation: Annotation = {
            id: shape.id,
            x: shape.x,
            y: shape.y,
            width: shape.props.w,
            height: shape.props.h,
            rotation: shape.rotation || 0,
            label: newId,
            timestamp: Date.now(),
            metadata: {
              color: shape.props.color,
              createdBy: 'user',
              modifiedAt: Date.now(),
              version: 1,
              tags: [],
              isVerified: false,
            },
          }

          onAnnotationCreated?.({
            image: {
              id: image?.id as string,
            },
            annotation,
          })
        }
        creatingShapeId = null
      }
    }

    const handleShapeCreated = (shape: TLUnknownShape) => {
      const internalShape = shape as TLGeoShape
      if (internalShape.type === 'geo' && internalShape.props.geo === 'rectangle') {
        creatingShapeId = internalShape.id
      }
    }
    const handleShapeChange = async (
      eventType: 'change' | 'created' | 'delete',
      options?: { prev: TLUnknownShape; next?: TLUnknownShape },
    ) => {
      const { prev } = options || {}
      const shape = prev as TLGeoShape
      if (!prev || prev.id === creatingShapeId) return

      // Add automatic text for newly created rectangles
      if (eventType === 'created' && shape.type === 'geo' && shape.props.geo === 'rectangle') {
        const readableId = generateShortId()
        editor.updateShape({
          id: shape.id,
          type: 'geo',
          props: {
            ...shape.props,
            text: readableId,
          },
        })
      }
      const annotation: Annotation = {
        id: shape.id,
        x: shape.x,
        y: shape.y,
        width: shape.props.w,
        height: shape.props.h,
        rotation: shape.rotation,
        label: shape.props.text,
        timestamp: Date.now(),
        metadata: {
          color: shape.props.color,
          createdBy: 'user',
          modifiedAt: Date.now(),
          version: 1,
          tags: [],
          isVerified: false,
        },
      }
      if (eventType === 'created') {
        onAnnotationCreated?.({
          image: {
            id: image?.id as string,
          },
          annotation,
        })
      } else if (eventType === 'change') {
        onAnnotationChange?.({
          image: {
            id: image?.id as string,
          },
          annotation,
        })
      } else if (eventType === 'delete') {
        const deletedNumber = parseInt(shape.props.text)
        if (!isNaN(deletedNumber)) {
          setDeletedNumbers(prev => [...prev, deletedNumber].sort((a, b) => a - b))
          usedNumbers.delete(deletedNumber)
        }
        onAnnotationDeleted?.({
          image: {
            id: image?.id as string,
          },
          annotation,
        })
      }

      await handleOnDone()
    }

    const debouncedHandler = debounce(handleShapeChange, 100)

    if (!hasRegisteredEventHandlers.current && editor && imageShapeId) {
      editor.sideEffects.registerAfterCreateHandler('shape', handleShapeCreated)

      editor.sideEffects.registerAfterChangeHandler('shape', (prev, next) => debouncedHandler('change', { prev, next }))

      editor.on('event', e => {
        if (e.name === 'pointer_up') {
          handlePointerUp()
        }
      })

      editor.sideEffects.registerAfterDeleteHandler('shape', prev => handleShapeChange('delete', { prev }))
      hasRegisteredEventHandlers.current = true
      return () => {
        hasRegisteredEventHandlers.current = false
        editor.off('event')
      }
    }

    setUsedNumbers(newUsedNumbers)
    setDeletedNumbers([])
  }, [editor, imageShapeId, getRectangleAnnotations, handleOnDone])

  useEffect(() => {
    if (!editor || !image) return

    // Create the asset and image shape
    const assetId = AssetRecordType.createId()
    editor.createAssets([
      {
        id: assetId,
        typeName: 'asset',
        type: 'image',
        meta: {},
        props: {
          w: image.width,
          h: image.height,
          mimeType: image.type,
          src: image.src,
          name: 'image',
          isAnimated: false,
        },
      },
    ])

    const shapeId = createShapeId()
    editor.createShape<TLImageShape>({
      id: shapeId,
      type: 'image',
      x: 0,
      y: 0,
      isLocked: true,
      props: {
        w: image.width,
        h: image.height,
        assetId,
      },
    })

    // Make sure the shape is at the bottom of the page
    function makeSureShapeIsAtBottom() {
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

    makeSureShapeIsAtBottom()

    const removeOnCreate = editor.sideEffects.registerAfterCreateHandler('shape', makeSureShapeIsAtBottom)

    const removeOnChange = editor.sideEffects.registerAfterChangeHandler('shape', makeSureShapeIsAtBottom)

    // The shape should always be locked
    const cleanupKeepShapeLocked = editor.sideEffects.registerBeforeChangeHandler('shape', (prev, next) => {
      if (next.id !== shapeId) return next
      if (next.isLocked) return next
      return { ...prev, isLocked: true }
    })

    // Reset the history
    editor.clearHistory()
    setImageShapeId(shapeId)

    return () => {
      removeOnChange()
      removeOnCreate()
      cleanupKeepShapeLocked()
    }
  }, [image?.src, editor])

  useEffect(() => {
    if (!editor || !image || !imageShapeId) return

    editor.setCameraOptions({
      constraints: {
        initialZoom: 'fit-max-100',
        baseZoom: 'default',
        bounds: { w: image.width, h: image.height, x: 0, y: 0 },
        padding: { x: 16, y: 16 },
        origin: { x: 0.5, y: 0.5 },
        behavior: 'free',
      },
      zoomSteps: [0.5, 1, 2, 4, 8],
      zoomSpeed: 1,
      panSpeed: 1,
      isLocked: false,
    })
    editor.setCamera(editor.getCamera(), { reset: true })
  }, [editor, imageShapeId, image])

  // const handleUiEvent = useCallback<TLUiEventHandler>((name, data) => {}, [])

  const prevImage = () => {
    editor?.run(
      () => {
        editor?.deleteShapes(Array.from(editor.getCurrentPageShapeIds()))
      },
      { ignoreShapeLock: true },
    )

    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    editor?.run(
      () => {
        editor?.deleteShapes(Array.from(editor.getCurrentPageShapeIds()))
      },
      { ignoreShapeLock: true },
    )
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="absolute inset-0">
      <Tldraw
        // forceMobile
        onMount={onMount}
        // onUiEvent={handleUiEvent}
        // overrides={uiOverrides}

        components={{
          Toolbar: props => {
            const tools = useTools()
            const isCardSelected = useIsToolSelected(tools['select'])
            const isRectangleSelected = useIsToolSelected(tools['rectangle'])
            const isTextSelected = useIsToolSelected(tools['text'])
            const isEraserSelected = useIsToolSelected(tools['eraser'])
            const isHandSelected = useIsToolSelected(tools['hand'])
            return (
              <DefaultToolbar {...props}>
                <TldrawUiMenuItem {...tools['select']} isSelected={isCardSelected} />
                <TldrawUiMenuItem {...tools['hand']} isSelected={isHandSelected} />
                <TldrawUiMenuItem {...tools['eraser']} isSelected={isEraserSelected} />
                <TldrawUiMenuItem {...tools['text']} isSelected={isTextSelected} />
                <TldrawUiMenuItem {...tools['rectangle']} isSelected={isRectangleSelected} />
              </DefaultToolbar>
            )
          },
          PageMenu: null,
          ActionsMenu: null,
          StylePanel: null,
          TopPanel: useCallback(() => {
            if (!imageShapeId || images.length <= 1) return null
            return (
              <TopPanel
                onPrevious={prevImage}
                onNext={nextImage}
                currentIndex={currentImageIndex + 1}
                totalCount={images.length}
              />
            )
          }, [imageShapeId, onDone]),
          SharePanel: useCallback(() => {
            return <CustomDoneButton />
          }, [imageShapeId, CustomDoneButton]),
        }}
      />
    </div>
  )
}
