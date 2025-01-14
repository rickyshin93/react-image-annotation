import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Button } from '../src/Button'
import Loading from '../src/components/loading/index'
import '../src/styles/base.css'
const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {
  args: {
    loadingText: 'Loading...',
    className: 'w-[400px]',
    isLoading: true,
  },
}

export const CustomConfiguration: Story = {
  args: {
    loadingText: 'Processing...',
    progressInterval: 50,
    progressIncrement: 5,
    maxAutoProgress: 95,
    className: 'w-[400px]',
    loadingSpinnerClassName: 'border-purple-500',
    progressBarClassName: 'bg-gradient-to-r from-purple-500 to-purple-300',
    isLoading: true,
  },
}

const FetchExample = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')

  const handleFetch = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setData(
        'Data successfully fetched! This is an example of how the component expands to show content after loading completes.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleFetch} primary>
        {isLoading ? 'Fetching...' : 'Fetch Data'}
      </Button>
      <div className="m-2" />
      <Loading loadingText="Fetching data..." isLoading={isLoading} content={data} className="w-[400px]" />
    </div>
  )
}

export const WithFetch: Story = {
  render: () => <FetchExample />,
}

const AutoCompleteExample = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
          setResults(`Found results for "${query}": \n\nExample Result 1\n\nExample Result 2\n\nExample Result 3`)
          setIsLoading(false)
        }, 1500)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type to search..."
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
      />
      <Loading
        loadingText="Searching..."
        isLoading={isLoading}
        content={results}
        className="w-[400px]"
        progressInterval={50}
      />
    </div>
  )
}

export const WithAutoComplete: Story = {
  render: () => <AutoCompleteExample />,
}

export const SlowProgress: Story = {
  args: {
    loadingText: 'Uploading large file...',
    className: 'w-[400px]',
    progressInterval: 200,
    progressIncrement: 1,
    maxAutoProgress: 95,
    isLoading: true,
  },
}

export const CustomStyling: Story = {
  args: {
    loadingText: 'Processing...',
    className: 'w-[400px] bg-gradient-to-r from-purple-50 to-pink-50',
    loadingSpinnerClassName: 'border-pink-500',
    progressBarClassName: 'bg-gradient-to-r from-purple-500 to-pink-500',
    isLoading: true,
  },
}

// Dark theme example with proper contrast
export const DarkTheme: Story = {
  decorators: [
    Story => (
      <div className="bg-slate-800 p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    loadingText: 'Loading...',
    className: 'w-[400px] bg-slate-700',
    loadingSpinnerClassName: 'border-purple-400',
    progressBarClassName: 'bg-gradient-to-r from-purple-400 to-purple-200',
    contentClassName: 'text-slate-200',
    isLoading: true,
  },
}

// Add new examples for children usage
const ComplexContent = () => (
  <div className="p-4 space-y-4">
    <h3 className="text-xl font-semibold text-purple-700">Custom Content</h3>
    <div className="flex gap-4">
      <div className="bg-purple-100 p-4 rounded-lg flex-1">
        <h4 className="font-medium mb-2">Section 1</h4>
        <p>This is a custom React component inside Loading.</p>
      </div>
      <div className="bg-pink-100 p-4 rounded-lg flex-1">
        <h4 className="font-medium mb-2">Section 2</h4>
        <p>You can put any React nodes here.</p>
      </div>
    </div>
  </div>
)

export const WithChildren: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }, [])

    return (
      <Loading isLoading={isLoading} className="w-[600px]">
        <ComplexContent />
      </Loading>
    )
  },
}

export const WithNestedComponents: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }, [])

    return (
      <Loading isLoading={isLoading} className="w-[400px]">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-200" />
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-gray-600">Software Engineer</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-purple-100 rounded w-full" />
            <div className="h-2 bg-purple-100 rounded w-3/4" />
            <div className="h-2 bg-purple-100 rounded w-1/2" />
          </div>
        </div>
      </Loading>
    )
  },
}
