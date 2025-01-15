'use client'

import { clsx } from 'clsx'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import './styles.css'

export interface LoadingProps {
  /** Text displayed during the loading state */
  loadingText?: string
  /** Additional className for the main container */
  className?: string
  /** Content to display after loading completes. Can be a string or React nodes */
  content?: string
  /** React nodes to display after loading completes */
  children?: React.ReactNode
  /** Controls the loading state */
  isLoading?: boolean
  /** Interval (in ms) between progress updates. Default: 100 */
  progressInterval?: number
  /** Amount to increment progress by each interval. Default: 2 */
  progressIncrement?: number
  /** Delay (in ms) before expanding the container to show content. Default: 300 */
  expandDelay?: number
  /** Maximum progress value for auto-progress. Default: 90 */
  maxAutoProgress?: number
  /** Enable/disable automatic progress animation. Default: true */
  autoProgress?: boolean
  /** Additional className for the content container */
  contentClassName?: string
  /** Additional className for the loading spinner */
  loadingSpinnerClassName?: string
  /** Additional className for the progress bar */
  progressBarClassName?: string
}

const defaultProps = {
  progressInterval: 100,
  progressIncrement: 2,
  expandDelay: 300,
  maxAutoProgress: 90,
  loadingText: 'Loading...',
  autoProgress: true,
}

export default function Loading({
  loadingText = defaultProps.loadingText,
  className = '',
  content = '',
  children,
  isLoading = false,
  progressInterval = defaultProps.progressInterval,
  progressIncrement = defaultProps.progressIncrement,
  expandDelay = defaultProps.expandDelay,
  maxAutoProgress = defaultProps.maxAutoProgress,
  autoProgress = defaultProps.autoProgress,
  contentClassName = '',
  loadingSpinnerClassName = '',
  progressBarClassName = '',
}: LoadingProps) {
  const [state, setState] = useState({
    progress: 0,
    showContent: false,
    expanded: false,
  })
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  // Reset state when loading starts
  useEffect(() => {
    if (isLoading) {
      setState({
        progress: 0,
        showContent: false,
        expanded: false,
      })
    } else if (content || children) {
      setState(prev => ({ ...prev, showContent: true }))
      setTimeout(() => {
        setState(prev => ({ ...prev, expanded: true }))
      }, expandDelay)
    }
  }, [isLoading, content, children, expandDelay])

  // Update progress animation with configurable values
  useEffect(() => {
    if (!autoProgress || !isLoading) return

    const intervalId = setInterval(() => {
      setState(prev => ({
        ...prev,
        progress: prev.progress >= maxAutoProgress ? maxAutoProgress : prev.progress + progressIncrement,
      }))
    }, progressInterval)

    return () => clearInterval(intervalId)
  }, [isLoading, autoProgress, maxAutoProgress, progressIncrement, progressInterval])

  // Complete progress when loading finishes
  useEffect(() => {
    if (!isLoading && state.progress < 100) {
      setState(prev => ({ ...prev, progress: 100 }))
    }
  }, [isLoading])

  // Update content height when content becomes visible
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + 32)
    }
  }, [state.showContent])

  const renderLoadingState = () => (
    <>
      <div className="flex items-center">
        <span className="text-[14px] font-medium text-[#181b25] whitespace-nowrap">{loadingText}</span>
      </div>
      <motion.div
        className={clsx(
          'h-4 w-4 border-2 border-[#9672e4] border-t-transparent rounded-full ml-3',
          loadingSpinnerClassName,
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div
        className={clsx(
          'absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#9672e4] to-[#e0daff] transition-all duration-100',
          progressBarClassName,
        )}
        style={{ width: `${state.progress}%` }}
      />
    </>
  )

  const renderContent = () => {
    if (children) {
      return (
        <div
          ref={contentRef}
          className={clsx(
            'w-full transition-all duration-500 ease-in-out',
            state.expanded ? 'opacity-100' : 'opacity-0',
            contentClassName,
          )}
        >
          {children}
        </div>
      )
    }

    if (content) {
      return (
        <div
          ref={contentRef}
          className={clsx(
            'w-full transition-all duration-500 ease-in-out',
            state.expanded ? 'opacity-100' : 'opacity-0',
            contentClassName,
          )}
        >
          <div className="prose prose-gray max-w-none py-4">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-[#181b25] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="transition-all duration-500 ease-out transform">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={clsx(
            'relative bg-white overflow-hidden',
            'transition-all duration-500 ease-in-out',
            !state.showContent ? 'rounded-2xl border border-[#e5e7eb]' : 'rounded-[16px] border border-[#e5e7eb]',
            state.expanded ? 'transform-none' : 'scale-95 opacity-90',
            'shadow-sm',
            state.showContent && 'animate-expand-width',
            className,
          )}
          style={{
            height: state.expanded ? contentHeight || 'auto' : '40px',
          }}
        >
          <div
            className={clsx(
              'px-6 flex items-center h-full justify-between',
              'transition-all duration-500 ease-in-out',
              state.showContent && 'animate-slide-content',
              state.showContent && 'py-4',
            )}
          >
            {!state.showContent ? renderLoadingState() : renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
