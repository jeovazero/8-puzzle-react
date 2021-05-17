import styled from 'styled-components'

type HintProps = {
  className?: string
  img?: string
  children: React.ReactText
}

const Hint = ({ img, children, className }: HintProps) => (
  <div className={className}>
    <span>{children}</span>
    {img && <img src={img} />}
  </div>
)

export default styled(Hint)`
  font-family: var(--fontFamily);
  width: 100px;
  text-align: center;
  color: white;
  font-size: 1.5em;

  img {
    width: 100%;
    margin-top: 10px;
  }
`
