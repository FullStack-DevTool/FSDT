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
  {
    title: 'Table',
    logo: (
      <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 1H11.5C11.6326 1 11.7598 1.05268 11.8536 1.14645C11.9473 1.24021 12 1.36739 12 1.5V4H7V1ZM6 4V1H1.5C1.36739 1 1.24021 1.05268 1.14645 1.14645C1.05268 1.24021 1 1.36739 1 1.5V4H6ZM1 5V8H6V5H1ZM7 5H12V8H7V5ZM7 9H12V11.5C12 11.6326 11.9473 11.7598 11.8536 11.8536C11.7598 11.9473 11.6326 12 11.5 12H7V9ZM1 11.5V9H6V12H1.5C1.36739 12 1.24021 11.9473 1.14645 11.8536C1.05268 11.7598 1 11.6326 1 11.5ZM0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H11.5C11.8978 0 12.2794 0.158035 12.5607 0.43934C12.842 0.720644 13 1.10218 13 1.5V11.5C13 11.8978 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8978 13 11.5 13H1.5C1.10218 13 0.720644 12.842 0.43934 12.5607C0.158035 12.2794 0 11.8978 0 11.5V1.5Z"
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
