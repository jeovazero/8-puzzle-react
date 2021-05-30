import styled from 'styled-components'

export type IconProps = {
  type: 'play' | 'reset' | 'random' | 'github-mark'
  className?: string
}

const IconBase = ({ type, className }: IconProps) => (
  <svg className={className}>
    <use href={`#${type}`} />
  </svg>
)

export const Icon = styled(IconBase)`
  width: 24px;
  height: 24px;
`

export default Icon
