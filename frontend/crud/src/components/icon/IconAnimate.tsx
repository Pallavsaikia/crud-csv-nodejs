import React from 'react'
import './IconAnimate.css'

interface IconAnimateProps {
  src: string,
  onClick: (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}
export const IconAnimate = ({ src, onClick }: IconAnimateProps) => {
  return (
    <img className='icon' onClick={e => { onClick(e) }} src={src} />
  )
}
