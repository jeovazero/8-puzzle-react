import { animated, useSpring } from '@react-spring/web'
import styled from 'styled-components'

type SquareProps = {
  children: React.ReactNode
  className?: string
  delta: {
    x: number
    y: number
  }
  shift: number
  isTransparent?: boolean
}

const Square = (
  { children, className, delta, shift, isTransparent }: SquareProps,
) => {
    const { x, y } = useSpring({ x: delta.x * shift, y: delta.y * shift })

    return (
      <animated.div
        className={className}
        data-is-transparent={isTransparent ? '' : undefined}
        style={{ x, y }}
      >
        <span>{children || '-'}</span>
      </animated.div>
    )
}

const SquareStyled = styled(Square)`
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  margin: 5px;
  background-color: white;
  color: var(--primaryLight);
  font-weight: bolder;
  font-family: 'Viga', sans-serif;
  font-size: 3.6em;
  border-radius: 10%;
  position: relative;
  span {
    height: 90px;
    line-height: 90 px;
    display: block;
  }
  &[data-is-transparent] {
    opacity: 0;
  }
  text-align: center;
`

export default SquareStyled
