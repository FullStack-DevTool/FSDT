import styled from '@emotion/styled'
import { useViews } from '../stores/useViews'
import { LogView } from '../types/view'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const ViewButton = styled.button`
  height: 100%;
  position: relative;
  background: none;
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.margin.small};
  cursor: pointer;
  width: 70px;
  padding: 0;
  svg {
    height: 15px;
  }
`

const SelectedBar = styled.div<{ index: number }>`
  height: 5px;
  width: 100%;
  position: absolute;
  z-index: 3;
  background-color: ${(props) => props.theme.colors.primary};
  top: 0;
  left: 0;
  transform: translateX(${(props) => props.index * 100}%);
  transition: 0.5s;
`

const views = [
  {
    title: 'List',
    logo: (
      <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.91663 3.22217H9.66663V4.27772H4.91663V3.22217Z" fill="#D132F9" />
        <path d="M4.91663 5.33337H9.66663V6.38893H4.91663V5.33337Z" fill="#D132F9" />
        <path d="M4.91663 7.44446H9.66663V8.50001H4.91663V7.44446Z" fill="#D132F9" />
        <path d="M4.91663 9.55554H9.66663V10.6111H4.91663V9.55554Z" fill="#D132F9" />
        <path d="M4.91663 11.6666H9.66663V12.7222H4.91663V11.6666Z" fill="#D132F9" />
        <path d="M2.80554 3.22217H3.8611V4.27772H2.80554V3.22217Z" fill="#D132F9" />
        <path d="M2.80554 5.33337H3.8611V6.38893H2.80554V5.33337Z" fill="#D132F9" />
        <path d="M2.80554 7.44446H3.8611V8.50001H2.80554V7.44446Z" fill="#D132F9" />
        <path d="M2.80554 9.55554H3.8611V10.6111H2.80554V9.55554Z" fill="#D132F9" />
        <path d="M2.80554 11.6666H3.8611V12.7222H2.80554V11.6666Z" fill="#D132F9" />
        <path
          d="M11.7777 0.055542H1.22218C0.942231 0.055542 0.673746 0.166752 0.475791 0.364707C0.277836 0.562662 0.166626 0.831147 0.166626 1.1111V15.8889C0.166626 16.1688 0.277836 16.4373 0.475791 16.6353C0.673746 16.8332 0.942231 16.9444 1.22218 16.9444H11.7777C12.0577 16.9444 12.3262 16.8332 12.5241 16.6353C12.7221 16.4373 12.8333 16.1688 12.8333 15.8889V1.1111C12.8333 0.831147 12.7221 0.562662 12.5241 0.364707C12.3262 0.166752 12.0577 0.055542 11.7777 0.055542ZM11.7777 15.8889H1.22218V1.1111H11.7777V15.8889Z"
          fill="#D132F9"
        />
      </svg>
    ),
  },
]

export const NavListViews = () => {
  const selectedView = useViews((state) => state.view)
  const setView = useViews((state) => state.setView)

  const viewIndex = views.findIndex((view) => view.title === selectedView)

  return (
    <Container>
      {views.map((view, index) => (
        <ViewButton
          onClick={() => {
            setView(view.title as LogView)
          }}
          key={view.title}
        >
          {index === 0 && <SelectedBar index={viewIndex} />}
          {view.logo}
          {view.title}
        </ViewButton>
      ))}
    </Container>
  )
}
