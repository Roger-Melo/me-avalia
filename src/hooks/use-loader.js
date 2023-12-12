import { useState } from 'react'

const useLoader = () => {
  const [isFetchingData, setIsFetchingData] = useState(false)
  return [isFetchingData, setIsFetchingData]
}

export { useLoader }