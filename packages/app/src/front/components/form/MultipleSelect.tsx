import styled from '@emotion/styled'
import { CSSProperties, Fragment, ReactElement, useEffect, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'

export type MultipleSelectOption = {
  logo?: ReactElement
  label: string
  value: string
}

type MultipleSelectProps = {
  label: string
  options: MultipleSelectOption[]
  values: string[]
  valuesAsLabel?: boolean
  onChange: (value: string) => void
  style?: CSSProperties
}

const BtnContainer = styled.button`
  background: none;
  padding: ${(props) => props.theme.margin.small};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.margin.small};
  border: none;
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: ${(props) => props.theme.fontSize.small};
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.hoverButton}};
  }
`

const PopperContainer = styled.div`
  padding-top: ${(props) => props.theme.margin.small};
  display: flex;
  flex-direction: column;
`

const PopperModal = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.12);
`

const SelectOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.margin.large};
  padding: ${(props) => props.theme.margin.small} ${(props) => props.theme.margin.medium};
  transition: 0.3s;
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: ${(props) => (props.isSelected ? props.theme.colors.selectedButton : 'transparent')};
  &:hover {
    cursor: pointer;
    ${(props) =>
      props.isSelected
        ? ''
        : `
       background-color: ${props.theme.colors.hoverButton}};
    `}
  }
`

const EmptyText = styled.p`
  font-size: ${(props) => props.theme.fontSize.small};
  padding: ${(props) => props.theme.margin.small} ${(props) => props.theme.margin.medium};
  color: ${(props) => props.theme.colors.secondaryText};
`

export function MultipleSelect({
  label,
  values,
  valuesAsLabel = false,
  options,
  onChange,
  style,
}: MultipleSelectProps) {
  const [isActive, setIsActive] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  const valuesAsLabelToDisplay = useMemo(() => {
    return values.map((value) => {
      const option = options.find((option) => option.value === value)
      return option?.logo || value
    })
  }, [values, options])

  // Handle click outside of the popper and the button to close the popper
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        referenceElement &&
        !referenceElement.contains(event.target) &&
        popperElement &&
        !popperElement.contains(event.target)
      ) {
        setIsActive(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [referenceElement, popperElement])

  return (
    <>
      <BtnContainer style={style} ref={setReferenceElement} onClick={() => setIsActive((prev) => !prev)}>
        {valuesAsLabel && values.length
          ? valuesAsLabelToDisplay.map((v, index) => <Fragment key={index}>{v}</Fragment>)
          : label}
      </BtnContainer>
      {isActive && (
        <PopperContainer ref={setPopperElement} style={{ ...styles.popper, zIndex: 10 }} {...attributes.popper}>
          <PopperModal>
            {options.length === 0 && <EmptyText>No option available</EmptyText>}
            {options.map((option) => (
              <SelectOption
                key={option.value}
                isSelected={values.includes(option.value)}
                onClick={() => onChange(option.value)}
              >
                {option.logo}
                {option.label}
              </SelectOption>
            ))}
          </PopperModal>
        </PopperContainer>
      )}
    </>
  )
}
