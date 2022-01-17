import { ButtonHTMLAttributes } from "react"

export interface ButtonLoadingProps extends ButtonHTMLAttributes<HTMLWebViewElement> {
  isLoading: boolean
}

export default function ButtonLoading(props: ButtonLoadingProps) {
  const { className, type, children, isLoading, disabled, ...rest } = props
  return (
    <button
      className={className}
      type={type || "button"}
      disabled={isLoading || disabled} {...rest}>
      {isLoading && (
        <div className="me-1">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
        </div>
      )}
      {children}
    </button>
  )
}
