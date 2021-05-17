import styled from 'styled-components'

type TitleProps = {
    className?: string
    img: string
    children: React.ReactNode
}

const Title = ({ className, img, children }: TitleProps) => (
  <div className={className}>
    {img && <img src={img} />}
    <span>{children}</span>
  </div>
)

const StyledTitle = styled(Title)`
  width: 300px;
  img {
    width: 100%;
  }
  span {
    width: 100%;
    display: block;
    height: 2em;
    margin: 10px 0 5px;
    color: white;
    font-family: var(--fontFamily);
  }
  text-align: center;
  margin: 20px 0 10px;

  @media (max-width: 480px) {
    width: 200px;
    margin: 20px auto 10px;
  }
`

export default StyledTitle
