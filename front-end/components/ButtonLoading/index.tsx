import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

export interface ButtonLoadingProps
  extends ButtonHTMLAttributes<HTMLWebViewElement> {
  isLoading: boolean
  forwardRef?: React.ForwardedRef<HTMLButtonElement>
}

export default function ButtonLoading(props: ButtonLoadingProps) {
  const { className, type, children, isLoading, disabled, forwardRef, ...rest } = props
  return (
    <button
      className={classNames("d-flex justify-content-center", className)}
      type={type || "button"}
      disabled={isLoading || disabled}
      ref={forwardRef}
      {...rest}>
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
