import React from 'react'

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  disabled,
  onIntersectDisabled
}) {
  React.useEffect(() => {
    if (disabled) {
      onIntersectDisabled && onIntersectDisabled()

      return
    }

    const observer = new IntersectionObserver(entries => entries.forEach(entry => onIntersect(entry)), {
      root: root && root.current,
      rootMargin,
      threshold
    })

    const el = target && target.current
    if (!el) return

    observer.observe(el)

    return () => {
      if (!el || disabled) return
      observer.unobserve(el)
    }
  }, [target, onIntersectDisabled, onIntersect, disabled, root, rootMargin, threshold])
}
