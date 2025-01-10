import 'tldraw/tldraw.css'
import { ImageAnnotationEditor } from './image-annotation-editor'

export const images = [
  { src: 'https://i.ibb.co/7NmFhm2/6997872.jpg', annotations: [] },
  {
    src: 'https://i.ibb.co/XYsNZGw/111.png',
    annotations: [
      {
        id: 'shape:DjVrIbLltAvqCQRJtwi99',
        x: 40.31037227460412,
        y: 55.333731752339574,
        width: 67.67293597687107,
        height: 78.52623315264769,
        rotation: 0,
        type: 'rectangle',
        label: '1',
        timestamp: 1735818846623,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735818846623,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:l6C4N1DUTiqknXg0dj566',
        x: 150.7265168829477,
        y: 57.25219847537676,
        width: 50.998579025268555,
        height: 122.63237088453803,
        rotation: 0,
        type: 'rectangle',
        label: '2',
        timestamp: 1735818846623,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735818846623,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:19ZzC65l04w-E7sC-NSZT',
        x: 462.1223990482489,
        y: 65.51137512928088,
        width: 80.76723982476341,
        height: 56.296875,
        rotation: 0,
        type: 'rectangle',
        label: '3',
        timestamp: 1735818846623,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735818846623,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:y-Bv3XIMmJPZQcCiCwFAn',
        x: 79.98861095309606,
        y: 200.81713041939398,
        width: 162.6705623580383,
        height: 109.92717583370379,
        rotation: 0,
        type: 'rectangle',
        label: '4',
        timestamp: 1735818846623,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735818846623,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:a7GaFQvPm4Keb8-okOg6x',
        x: 431.96096354013116,
        y: 138.71541100277278,
        width: 104.90706876915101,
        height: 139.409662632155,
        rotation: 0.6981317007977318,
        type: 'rectangle',
        label: '5',
        timestamp: 1735818846623,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735818846623,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
    ],
  },
  { src: 'https://i.ibb.co/TbpC4xN/zz.png', annotations: [] },
  {
    src: 'https://i.ibb.co/nL8ZLsL/screenshot-20241231-002805.png',
    annotations: [
      {
        id: 'shape:KA8bRdDabQ5bBTaX6Uq9V',
        x: 129.96859472394013,
        y: 185.80354574490903,
        width: 145.55282720241334,
        height: 149.15679892691386,
        rotation: 331,
        type: 'rectangle',
        label: '4',
        timestamp: 1735741075414,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735741075414,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:DfsHnhMPKUG6kW8d4rlVt',
        x: 321.30111573279436,
        y: 165.92964173005225,
        width: 158.18015138362688,
        height: 161.9368388845685,
        rotation: 0,
        type: 'rectangle',
        label: '1',
        timestamp: 1735741075414,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735741075414,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:i9C70oQPKN2h0qlouDPjO',
        x: 415.7858608944174,
        y: 255.16664368058545,
        width: 144.24950135656502,
        height: 117.2600931110135,
        rotation: 0,
        type: 'rectangle',
        label: '2',
        timestamp: 1735741075414,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735741075414,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
      {
        id: 'shape:YL4gX0t9w7on8I8XAUUsE',
        x: 239.87314001073207,
        y: 64.54006473962181,
        width: 200,
        height: 200,
        rotation: 0,
        type: 'rectangle',
        label: '3',
        timestamp: 1735741075414,
        metadata: {
          color: 'red',
          createdBy: 'user',
          modifiedAt: 1735741075414,
          version: 1,
          tags: [],
          isVerified: false,
        },
      },
    ],
  },
]

export default function ImageAnnotatorWrapper() {
  return (
    <div className="absolute inset-0">
      <ImageAnnotationEditor
        images={images}
        onDone={({ annotations }) => {
          console.log('Annotations:', annotations)
        }}
      />
    </div>
  )
}
