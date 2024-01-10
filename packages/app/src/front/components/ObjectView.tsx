import styled from '@emotion/styled'
import { Any } from '@fullstack-devtool/core'
import { useState } from 'react'
import ReactJson from 'react-json-view'

type ObjectViewProps = {
  value: Record<string, Any>
}

const MAX_KEYS_TO_SHOW_PREVIEW = 5

const CollapsedObjectViewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  flex-wrap: wrap;
`

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`

const StringValue = styled.span`
  color: rgb(203, 75, 22);
`

const BoolValue = styled.span`
  color: rgb(42, 161, 152);
`

const NumberValue = styled.span`
  color: rgb(38, 139, 210);
`

const TypedValue = ({ value }: { value: Any }) => {
  if (typeof value === 'object') {
    return (
      <div style={{ display: 'flex' }}>
        <span>{'{'}</span>
        <StringValue>...</StringValue>
        <span>{'}'}</span>
      </div>
    )
  }

  if (typeof value === 'string') {
    return <StringValue>{`"${value}"`}</StringValue>
  }

  if (typeof value === 'number') {
    return <NumberValue>{value}</NumberValue>
  }

  if (typeof value === 'boolean') {
    return <BoolValue>{value ? 'true' : 'false'}</BoolValue>
  }

  return <span>{value}</span>
}

export const ObjectView = ({ value }: ObjectViewProps) => {
  const [preview, setPreview] = useState(true)

  const keys = Object.keys(value)

  if (preview) {
    if (Array.isArray(value)) {
      return (
        <CollapsedObjectViewContainer onClick={() => setPreview(false)}>
          <span>[</span>
          {keys.slice(0, MAX_KEYS_TO_SHOW_PREVIEW).map((key, index) => (
            <FieldContainer key={key}>
              <TypedValue value={value[key as Any]} />
              {index < keys.length - 1 && <span>,</span>}
            </FieldContainer>
          ))}
          {keys.length > MAX_KEYS_TO_SHOW_PREVIEW && <span>...</span>}
          <span>]</span>
        </CollapsedObjectViewContainer>
      )
    }

    return (
      <CollapsedObjectViewContainer onClick={() => setPreview(false)}>
        <span>{'{'}</span>
        {keys.slice(0, MAX_KEYS_TO_SHOW_PREVIEW).map((key, index) => (
          <FieldContainer key={key}>
            <FieldContainer>
              <span>{key}</span>
              <span>:</span>
              <TypedValue value={value[key]} />
            </FieldContainer>
            {index < keys.length - 1 && <span>,</span>}
          </FieldContainer>
        ))}
        {keys.length > MAX_KEYS_TO_SHOW_PREVIEW && <span>...</span>}
        <span>{'}'}</span>
      </CollapsedObjectViewContainer>
    )
  }

  return (
    <ReactJson
      collapsed={1}
      src={value}
      displayObjectSize={false}
      displayDataTypes={false}
      quotesOnKeys={false}
      name={null}
      iconStyle={'square'}
    />
  )
}
