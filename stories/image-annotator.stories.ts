import type { Meta, StoryObj } from '@storybook/react'
import 'tldraw/tldraw.css'
import { ImageAnnotationEditor } from '../src/components/image-annotator/image-annotation-editor'

const meta = {
  title: 'Components/ImageAnnotator',
  component: ImageAnnotationEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Image Annotation Editor

A powerful React component for annotating images with shapes, text, and custom tools.

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

## Installation

\`\`\`bash
npm install @your-package/image-annotator
\`\`\`

\`\`\`bash
yarn add @your-package/image-annotator
\`\`\`

\`\`\`bash
pnpm add @your-package/image-annotator
\`\`\`

## Basic Usage

\`\`\`tsx
import { ImageAnnotationEditor } from '@your-package/image-annotator'

function App() {
  return (
    <ImageAnnotationEditor
      images={[
        {
          id: 'image1',
          src: 'path/to/image.jpg',
          annotations: []
        }
      ]}
      onDone={(data) => console.log('Annotations:', data)}
    />
  )
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    images: {
      description: 'Array of images with their annotations',
      control: 'object',
    },
    tools: {
      description: 'Configuration for annotation tools',
      control: 'object',
    },
    outputTriggerOn: {
      description: 'Configure when to trigger output callbacks',
      control: 'object',
    },
    initialImageIndex: {
      description: 'Initial image to display (zero-based index)',
      control: 'number',
    },
    onAnnotationCreated: {
      description: 'Callback when a new annotation is created',
      control: false,
    },
    onAnnotationChange: {
      description: 'Callback when an annotation is modified',
      control: false,
    },
    onAnnotationDeleted: {
      description: 'Callback when an annotation is deleted',
      control: false,
    },
    onImageChange: {
      description: 'Callback when switching between images',
      control: false,
    },
    onDone: {
      description: 'Callback when annotation is complete',
      control: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageAnnotationEditor>

export default meta
type Story = StoryObj<typeof meta>

const sampleImages = [
  {
    id: 'image0',
    src: 'https://fastly.picsum.photos/id/930/900/600.jpg?hmac=-VvyG-XjlLRggW6xtMd4UHBwxXJ-O8g7EVRpKm9DW0s',
    annotations: [
      {
        id: 'shape:s-MMqyY_DlysR5i_Dr-cw',
        x: 570.6616220075775,
        y: 234.7749303606369,
        width: 198.69671630859375,
        height: 131.31036376953125,
        rotation: 5.3756140961425345,
        type: 'rectangle',
        label: '5',
        timestamp: 1736937539724,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1736937539724,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:1-yh2opbFbOpEprcNPdKS',
        x: 83.45930325359515,
        y: 193.02561725714776,
        width: 124.84748947006867,
        height: 123.61206136850944,
        rotation: 5.3756140961425345,
        type: 'rectangle',
        label: '1',
        timestamp: 1736937539724,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1736937539724,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:Hp9GrZ00ldwLN0CpWkcXY',
        x: 154.38957623531536,
        y: 305.0142249484778,
        width: 248.734083670453,
        height: 229.15347678557805,
        rotation: 0,
        type: 'rectangle',
        label: '2',
        timestamp: 1736937539724,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1736937539724,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:sw4HvspZ2ScsJ68k6Ejm7',
        x: 451.2897707321237,
        y: 142.1256360707238,
        width: 129.70425985164417,
        height: 108.62586997703193,
        rotation: 5.3930673886624785,
        type: 'rectangle',
        label: '3',
        timestamp: 1736937539724,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1736937539724,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:cPtiRk5d-0bboKDQSoMO9',
        x: 586.2918704226382,
        y: 368.4326594858195,
        width: 278.90842602679845,
        height: 142.37716236564358,
        rotation: 0.29670597283903605,
        type: 'rectangle',
        label: '4',
        timestamp: 1736937539724,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1736937539724,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:5NSqVehqe8IlFmYaW7PsP',
        x: 308.8582223671702,
        y: 260.60060508073525,
        width: 154.5696085710519,
        height: 182.23682110566017,
        rotation: 0,
        type: 'rectangle',
        label: '6',
        timestamp: 1736937539724,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1736937539724,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
    ],
  },
  {
    id: 'image1',
    src: 'https://fastly.picsum.photos/id/106/900/600.jpg?hmac=xA_tP1jGHJrWhLPmViP6lnLck6pqCmDXQP8Q9H1IPgs',
    annotations: [],
  },
  {
    id: 'image2',
    src: 'https://fastly.picsum.photos/id/574/800/601.jpg?hmac=DZb2oYbpWGCSpPwqhs4_H0Uvk2VoizaQWddhQIVhRFE',
    annotations: [],
  },
  {
    id: 'image3',
    src: 'https://fastly.picsum.photos/id/372/800/600.jpg?hmac=911lXwSe0NWznaFWKm3nVrZV7y1IypKxlpDUIVpKxVs',
    annotations: [],
  },
  {
    id: 'image4',
    src: 'https://fastly.picsum.photos/id/1057/800/600.jpg?hmac=YmA5NCeEgXc1TOldOXFtXzaMW1NWH-IG92zNgLmTcDQ',
    annotations: [],
  },
  {
    id: 'image5',
    src: 'https://fastly.picsum.photos/id/705/900/600.jpg?hmac=bzZzT6Zhu_ybVXbEhA8WipVgd9fxGXYNmZgaApMKHBY',
    annotations: [],
  },
]

const imagesWithAnnotations = [
  {
    id: 'image1',
    src: 'https://fastly.picsum.photos/id/727/800/602.jpg?hmac=TXud4Hami5cc6oxCzbuVUHoTIeP-nNVcU8A1VtS11XE',
    annotations: [
      {
        id: 'shape:1',
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        rotation: 0,
        label: '1',
        timestamp: Date.now(),
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: Date.now(),
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
    ],
  },
]

export const Basic: Story = {
  args: {
    images: sampleImages,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic Example

This is the most basic usage of the Image Annotator component. It shows:
- Loading multiple images
- Basic annotation capabilities
- Default tool configuration
        `,
      },
    },
  },
}

export const WithPreExistingAnnotations: Story = {
  args: {
    images: imagesWithAnnotations,
  },
}

export const WithCustomTools: Story = {
  args: {
    images: sampleImages,
    tools: {
      eraser: { enabled: true },
      text: { enabled: true },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Custom Tools Example

Demonstrates how to configure custom tools:
\`\`\`tsx
<ImageAnnotationEditor
  tools={{
    eraser: { enabled: true },
    text: { enabled: true }
  }}
/>
\`\`\`
        `,
      },
    },
  },
}

export const WithCallbacks: Story = {
  args: {
    images: sampleImages,
    outputTriggerOn: {
      created: true,
      changed: true,
      deleted: true,
      navigated: false,
    },
    onAnnotationCreated: annotation => {
      console.log('Annotation created:', annotation)
    },
    onAnnotationChange: annotation => {
      console.log('Annotation changed:', annotation)
    },
    onAnnotationDeleted: annotation => {
      console.log('Annotation deleted:', annotation)
    },
    onImageChange: data => {
      console.log('Image changed:', data)
    },
    onDone: data => {
      console.log('Done clicked:', data)
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Callback Events Example

Shows how to handle various events:
\`\`\`tsx
<ImageAnnotationEditor
  outputTriggerOn={{
    created: true,
    changed: true,
    deleted: true,
    navigated: false
  }}
  onAnnotationCreated={(annotation) => {
    console.log('New annotation:', annotation)
  }}
  onDone={(data) => {
    console.log('Final annotations:', data)
  }}
/>
\`\`\`
        `,
      },
    },
  },
}

export const WithAutoTriggers: Story = {
  args: {
    images: sampleImages,
    outputTriggerOn: {
      created: true,
      changed: true,
      deleted: true,
      navigated: true,
    },
    onDone: data => {
      console.log('Auto-triggered on change:', data)
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Auto-Trigger Example

Demonstrates automatic triggering of onDone for all possible events:
\`\`\`tsx
<ImageAnnotationEditor
  outputTriggerOn={{
    created: true,
    changed: true,
    deleted: true,
    navigated: true
  }}
  onDone={(data) => {
    console.log('Auto-triggered:', data)
  }}
/>
\`\`\`
        `,
      },
    },
  },
}

export const WithMultipleImages: Story = {
  args: {
    images: Array(5)
      .fill(null)
      .map((_, i) => ({
        id: `image${i + 1}`,
        src: `https://picsum.photos/800/${600 + i}`,
        annotations: [],
      })),
    initialImageIndex: 0,
  },
}

export const WithLargeImage: Story = {
  args: {
    images: [
      {
        id: 'large-image',
        src: 'https://picsum.photos/2000/1500',
        annotations: [],
      },
    ],
  },
}

export const WithSmallImage: Story = {
  args: {
    images: [
      {
        id: 'small-image',
        src: 'https://picsum.photos/400/300',
        annotations: [],
      },
    ],
  },
}

export const WithMixedSizeImages: Story = {
  args: {
    images: [
      {
        id: 'small',
        src: 'https://picsum.photos/400/300',
        annotations: [],
      },
      {
        id: 'medium',
        src: 'https://picsum.photos/800/600',
        annotations: [],
      },
      {
        id: 'large',
        src: 'https://picsum.photos/1600/1200',
        annotations: [],
      },
    ],
  },
}

export const WithFailedImageLoad: Story = {
  args: {
    initialImageIndex: 1,
    images: [
      {
        id: 'valid-image',
        src: 'https://picsum.photos/800/600',
        annotations: [],
      },
      {
        id: 'failed-image',
        // Using an invalid URL to simulate a failed image load
        src: 'https://invalid-image-url.jpg',
        annotations: [],
      },
      {
        id: 'valid-image',
        src: 'https://picsum.photos/800/600',
        annotations: [],
      },
    ],
  },
}
