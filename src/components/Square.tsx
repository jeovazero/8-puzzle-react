import { animated, config, interpolate, Spring } from 'react-spring'
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
) => (
  <Spring config={config.gentle} native to={delta}>
    {({ x, y }) => (
      <animated.div
        className={className}
        data-is-transparent={isTransparent ? '' : undefined}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x * shift}px,${y * shift}px, 0)`,
          ),
        }}
      >
        <span>{children || '-'}</span>
      </animated.div>
    )}
  </Spring>
)

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
