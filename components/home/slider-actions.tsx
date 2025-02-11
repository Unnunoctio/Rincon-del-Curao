'use client'

import { LeftIcon } from '@/icons/ui/left-icon'
import { RightIcon } from '@/icons/ui/right-icon'
import '@/styles/globals.css'
import '@/styles/slider.css'
import { useEffect, useRef, useState } from 'react'

interface Props {
  itemsLength: number
  children: React.ReactNode
}

export const SliderActions: React.FC<Props> = ({ itemsLength, children }) => {
  const ref = useRef<HTMLUListElement | null>(null)

  const [size, setSize] = useState({ width: 0, height: 0 })
  const [scrollX, setScrollX] = useState(0)

  const [cardsMove, setCardsMove] = useState(0)
  const [points, setPoints] = useState(0)
  const [pointActive, setPointActive] = useState(0)

  const [leftBtn, setLeftBtn] = useState(false)
  const [rightBtn, setRightBtn] = useState(true)

  const SIZE_CARD = 250
  const SIZE_GAP = (8 * 4)
  const SIZE_CARD_GAP = SIZE_CARD + SIZE_GAP

  useEffect(() => {
    const element = ref.current
    if (element == null) return

    // Función para actualizar el tamaño
    const updateSize = (): void => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight
      })
    }

    // Observador de redimensionamiento
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(element)

    // Actualizar el tamaño inicial
    updateSize()

    // Limpiar el observador al desmontar el componente
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const element = ref.current
    if (element == null) return

    // Función para actualizar la posición del scroll horizontal
    const handleScroll = (): void => {
      setScrollX(element.scrollLeft)
    }

    // Añadir el listener al evento de scroll
    element.addEventListener('scroll', handleScroll)

    // Limpiar el listener al desmontar el componente
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollXTo = (x: number): void => {
    if (ref.current !== null) {
      ref.current.scrollTo({ left: x, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (ref.current === null) return

    // LEFT BUTTON
    if (scrollX <= SIZE_CARD) {
      setLeftBtn(false)
    } else {
      setLeftBtn(true)
    }

    // RIGHT BUTTON
    if (scrollX >= (ref.current.scrollWidth - ref.current.clientWidth - SIZE_GAP)) {
      setRightBtn(false)
    } else {
      setRightBtn(true)
    }

    // ACTIVE POINT
    const positionPoints = [...Array(points)].map((_, index) => SIZE_CARD_GAP * index * cardsMove)

    let prePoint = 0
    let preDiff = Infinity
    for (let i = 0; i < points; i++) {
      const pointPosition = positionPoints[i]
      const diff = Math.abs(scrollX - pointPosition)
      if (diff < preDiff) {
        prePoint = i
        preDiff = diff
      }
    }
    setPointActive(prePoint)
  }, [scrollX, cardsMove, points])

  useEffect(() => {
    if (window.innerWidth < 640) {
      setCardsMove(1)
      setPoints(itemsLength)
      return
    }

    if (ref.current !== null) {
      let newMove = 0
      if (size.width >= ((3 * SIZE_CARD_GAP) + SIZE_CARD)) {
        newMove = 4
      } else if (size.width >= ((2 * SIZE_CARD_GAP) + SIZE_CARD)) {
        newMove = 3
      } else if (size.width >= ((1 * SIZE_CARD_GAP) + SIZE_CARD)) {
        newMove = 2
      } else {
        newMove = 1
      }

      setCardsMove(newMove)
      if (newMove !== 0) setPoints(Math.ceil(itemsLength / newMove))
    }
  }, [size.width])

  const leftScroll = (): void => {
    scrollXTo(scrollX - (SIZE_CARD_GAP * cardsMove))
  }

  const rightScroll = (): void => {
    scrollXTo(scrollX + (SIZE_CARD_GAP * cardsMove))
  }

  const pointScroll = (index: number): void => {
    scrollXTo(SIZE_CARD_GAP * index * cardsMove)
  }

  return (
    <>
      <ul ref={ref} className='slider slider-cards-container'>
        {children}
      </ul>
      <button
        onClick={leftScroll}
        disabled={!leftBtn}
        className='group slider-btn slider-btn-left'
      >
        <LeftIcon className='slider-btn-icon' />
      </button>
      <button
        onClick={rightScroll}
        disabled={!rightBtn}
        className='group slider-btn slider-btn-right'
      >
        <RightIcon className='slider-btn-icon' />
      </button>
      <div className='slider-points-container'>
        {[...Array(points)].map((_, index) => (
          <button
            key={index}
            onClick={() => pointScroll(index)}
            className='group slider-point-btn'
          >
            <span className={`slider-point ${pointActive === index ? 'slider-point-active' : 'slider-point-inactive'} `} />
          </button>
        ))}
      </div>
    </>
  )
}
