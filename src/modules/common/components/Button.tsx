import React, { MouseEventHandler } from "react"
import { FormattedMessage } from "react-intl"

interface Props {
  className: string
  tagName: string
  type: "button" | "submit" | "reset" | undefined
  isLoading: boolean
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = (props: Props) => {
  const { className, tagName, type, isLoading, onClick } = props

  return (
    <div className="col-md-auto">
      <button
        className={className}
        type={type}
        style={{ minWidth: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
        <FormattedMessage id={tagName} />
      </button>
    </div>
  )
}

export default Button
