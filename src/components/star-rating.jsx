import { useState } from 'react'

const containerStyle = { display: 'flex', gap: '1rem', alignItems: 'center' }
const starContainerStyle = { display: 'flex', margin: 0, padding: 0, listStyle: 'none' }

const Star = ({ onRate, filled, onMouseIn, onMouseOut, color, size, index }) => {
  const starStyle = { width: `${size}px`, height: `${size}px`, display: 'block', cursor: 'pointer' }

  return (
    <li
      data-cy={`star-${index}`}
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onMouseIn}
      onMouseLeave={onMouseOut}
    >
      {filled
        ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} stroke={color}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
        : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )
      }
    </li>
  )
}

const StarRating = ({ maxRating = 5, color = 'gray', size = 48, className = '', initialRating = 0, onRating }) => {
  const [rating, setRating] = useState(initialRating)
  const [tempRating, setTempRating] = useState(0)

  const handleMouseOut = () => setTempRating(0)
  const handleMouseIn = index => setTempRating(index + 1)
  const handleRating = index => {
    const newRating = rating === index + 1 ? 0 : index + 1
    setTempRating(newRating)
    setRating(newRating)
    onRating?.(newRating)
  }
  const isRatingGreaterThanIndex = index => (tempRating || rating) > index

  const textStyle = { margin: 0, color, fontSize: `${size / 1.5}px` }

  return (
    <div style={containerStyle} className={className}>
      <ul style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) =>
          <Star
            index={i}
            size={size}
            color={color}
            onRate={() => handleRating(i)}
            key={i}
            filled={isRatingGreaterThanIndex(i)}
            onMouseIn={() => handleMouseIn(i)}
            onMouseOut={handleMouseOut}
          />)}
      </ul>
      <p style={textStyle}>{tempRating || rating}</p>
    </div>
  )
}

export { StarRating }