export interface AnnotatorImage {
  id: string
  src: string
  width: number
  height: number
  type: string
}

export interface IAnnotationEvent {
  image: {
    id: string
  }
  annotation: Annotation
}

export interface IOnDoneEvent {
  annotations: Annotation[]
  image: { id: string; src: string }
}

export interface IImageChangeEvent {
  index: number
  image: {
    id: string
    src: string
  }
}

export interface IImageLoadErrorEvent {
  index: number
  image: {
    id?: string
    src: string
  }
  error: string
}

export interface ImageAnnotationEditorProps {
  images: {
    id?: string
    src: string
    annotations: Annotation[]
  }[]
  initialImageIndex?: number
  tools?: {
    eraser?: {
      enabled?: boolean
    }
    text?: {
      enabled?: boolean
    }
  }
  outputTriggerOn?: {
    created?: boolean
    changed?: boolean
    deleted?: boolean
    navigated?: boolean
  }
  onDone?(result: IOnDoneEvent): void
  onAnnotationChange?(params: IAnnotationEvent): void
  onAnnotationCreated?(params: IAnnotationEvent): void
  onAnnotationDeleted?(params: IAnnotationEvent): void
  onImageChange?(params: IImageChangeEvent): void
  onImageLoadError?: (error: Error, image: { id: string; src: string; index: number }) => void
}

export interface Annotation {
  id: string // Unique identifier for the annotation
  x: number // X coordinate
  y: number // Y coordinate
  width: number // Width of rectangle
  height: number // Height of rectangle
  rotation?: number // Rotation in degrees
  label?: string // Optional label/text
  type?: string // Type of annotation (extensible for future shapes)
  confidence?: number // Optional confidence score (0-1)
  timestamp: number // When the annotation was created/modified
  metadata?: {
    // Optional metadata
    createdBy?: string // User who created the annotation
    modifiedAt?: number // Last modification timestamp
    color?: string // Color of the annotation
    notes?: string // Additional notes
    tags?: string[] // Tags for categorization
    isVerified?: boolean // Verification status
    version?: number // Version number of the annotation
  }
}

export interface LoadImageParams {
  imageIndex: number
  images: {
    id?: string
    src: string
    annotations: Annotation[]
  }[]
  setIsLoading: (loading: boolean) => void
  setImageLoadError: (error: Error | null) => void
  setImage: (image: AnnotatorImage | null) => void
  setUsedNumbers: (numbers: Set<number>) => void
  setDeletedNumbers: (numbers: number[]) => void
  onImageLoadError?: (error: Error, image: { id: string; src: string; index: number }) => void
}
