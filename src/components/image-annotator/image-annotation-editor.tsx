import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AssetRecordType,
  DefaultColorStyle,
  DefaultFontStyle,
  DefaultSizeStyle,
  DefaultToolbar,
  Editor,
  TLGeoShape,
  TLImageShape,
  TLShapeId,
  TLUnknownShape,
  Tldraw,
  TldrawUiMenuItem,
  createShapeId,
  debounce,
  uniqueId,
  useIsToolSelected,
  useTools,
} from 'tldraw'
import { CustomDoneButton } from './_components/custom-done-button'
import { TopPanel } from './_components/top-panel'
import './tldraw-reset.css'
import type { Annotation, AnnotatorImage, ImageAnnotationEditorProps } from './types'
import { getImage, getRectangleAnnotations, makeSureShapeIsAtBottom } from './utils'

export function ImageAnnotationEditor({
  images,
  tools,
  initialImageIndex = 0,
  onDone,
  onAnnotationCreated,
  onAnnotationChange,
  onAnnotationDeleted,
  onImageChange,
}: ImageAnnotationEditorProps) {
  if (images.length === 0) return <div>Please provided at least one image</div>
  const { eraser, text } = tools || {}
  const [imageShapeId, setImageShapeId] = useState<TLShapeId | null>(null)
  const [editor, setEditor] = useState(null as Editor | null)
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex < images.length ? initialImageIndex : 0)
  const [image, setImage] = useState<AnnotatorImage | null>(null)
  const hasRegisteredEventHandlers = useRef(false)
  const [usedNumbers, setUsedNumbers] = useState<Set<number>>(new Set())
  const [deletedNumbers, setDeletedNumbers] = useState<number[]>([])

  useEffect(() => {
    ;(async () => {
      const base64Image = await getImage(images[currentImageIndex].src)
      setImage({
        ...base64Image,
        id: images[currentImageIndex].id || uniqueId(),
      })

      // Update usedNumbers based on current image annotations
      const newUsedNumbers = new Set<number>()
      images[currentImageIndex].annotations.forEach(annotation => {
        if (annotation.label) {
          const num = parseInt(annotation.label)
          if (!isNaN(num)) {
            newUsedNumbers.add(num)
          }
        }
      })
      setUsedNumbers(newUsedNumbers)
      setDeletedNumbers([]) // Reset deleted numbers when changing images
    })()
  }, [currentImageIndex, images])

  function onMount(editor: Editor) {
    setEditor(editor)
    // editor.setCurrentTool('geo', { type: 'rectangle' })
    editor.setStyleForNextShapes(DefaultColorStyle, 'red')
    editor.setStyleForNextShapes(DefaultSizeStyle, 's')
    editor.setStyleForNextShapes(DefaultFontStyle, 'mono')
  }

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
    const currentAnnotations = getRectangleAnnotations(editor)

    onDone?.({
      annotations: currentAnnotations,
      image: {
        id: image.id,
        src: images[currentImageIndex].src,
      },
    })
  }, [onDone, editor, image, images, currentImageIndex])

  const generateShortId = (): string => {
    // If there are deleted numbers, use the smallest one first
    if (deletedNumbers.length > 0) {
      const nextNumber = Math.min(...deletedNumbers)
      setDeletedNumbers(prev => prev.filter(n => n !== nextNumber))
      setUsedNumbers(prev => {
        const newSet = new Set(prev)
        newSet.add(nextNumber)
        return newSet
      })
      return nextNumber.toString()
    }

    // Find the next available number by checking all numbers from 1 up
    let nextNumber = 1
    while (usedNumbers.has(nextNumber)) {
      nextNumber++
    }

    if (nextNumber > 999) {
      console.warn('Exceeded maximum number of annotations (999)')
      return '999'
    }

    setUsedNumbers(prev => {
      const newSet = new Set(prev)
      newSet.add(nextNumber)
      return newSet
    })
    return nextNumber.toString()
  }
  // Modify the useEffect block that monitors shape changes
  useEffect(() => {
    if (!editor) return

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

      if (eventType === 'delete') {
        const deletedNumber = parseInt(shape.props.text)
        if (!isNaN(deletedNumber)) {
          setDeletedNumbers(prev => [...prev, deletedNumber].sort((a, b) => a - b))
          setUsedNumbers(prev => {
            const newSet = new Set(prev)
            newSet.delete(deletedNumber)
            return newSet
          })
        }
        onAnnotationDeleted?.({
          image: {
            id: image?.id as string,
          },
          annotation,
        })
        debouncedDeleteHandler()
      } else {
        if (eventType === 'change') {
          onAnnotationChange?.({
            image: {
              id: image?.id as string,
            },
            annotation,
          })
        }
        handleOnDone()
      }
    }

    const debouncedDeleteHandler = debounce(() => {
      handleOnDone()
    }, 50)

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
        debouncedDeleteHandler.cancel()
        debouncedHandler.cancel()
      }
    }
  }, [editor, imageShapeId, getRectangleAnnotations, handleOnDone, generateShortId])

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
          name: `image-${assetId}`,
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

    const removeOnCreate = editor.sideEffects.registerAfterCreateHandler('shape', () =>
      makeSureShapeIsAtBottom(editor, shapeId),
    )

    const removeOnChange = editor.sideEffects.registerAfterChangeHandler('shape', () =>
      makeSureShapeIsAtBottom(editor, shapeId),
    )

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
  }, [editor, image?.id])

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
    setImageShapeId(null) // Reset imageShapeId before changing image
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    editor?.run(
      () => {
        editor?.deleteShapes(Array.from(editor.getCurrentPageShapeIds()))
      },
      { ignoreShapeLock: true },
    )
    setImageShapeId(null) // Reset imageShapeId before changing image
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    onImageChange?.({
      index: currentImageIndex,
      image: {
        id: images[currentImageIndex].id || '',
        src: images[currentImageIndex].src,
      },
    })
  }, [currentImageIndex])

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
                {eraser?.enabled && <TldrawUiMenuItem {...tools['eraser']} isSelected={isEraserSelected} />}
                {text?.enabled && <TldrawUiMenuItem {...tools['text']} isSelected={isTextSelected} />}
                <TldrawUiMenuItem {...tools['rectangle']} isSelected={isRectangleSelected} />
              </DefaultToolbar>
            )
          },
          PageMenu: null,
          ActionsMenu: null,
          StylePanel: null,
          TopPanel: useCallback(() => {
            // if (!imageShapeId || images.length <= 1) return null
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
            return <CustomDoneButton onClick={handleOnDone} />
          }, [imageShapeId, CustomDoneButton]),
        }}
      />
    </div>
  )
}
