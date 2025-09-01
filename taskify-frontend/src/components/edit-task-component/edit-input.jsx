import React from "react";
export const CEField = React.forwardRef(function CEField(
  {
    value,
    onChange,
    onBlur,
    id,
    className = "",
    placeholder = "",
    singleLine = false,
    autoFocus = false,
    ariaLabel,
  },
  _
) {
  const elRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const domText = el.textContent ?? "";
    const nextText = value ?? "";
    if (domText !== nextText) {
      el.textContent = nextText;
    }
  }, [value]);

  const handleInput = (e) => {
    onChange?.(e.currentTarget.textContent ?? "");
  };

  const handleKeyDown = (e) => {
    if (singleLine && e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      return;
    }
  };

  return (
    <div
      id={id}
      ref={elRef}
      role="textbox"
      contentEditable
      suppressContentEditableWarning
      dir="auto"
      style={{ unicodeBidi: "plaintext" }}
      className={`${className} ce-placeholder outline-none cursor-text`}
      data-placeholder={placeholder}
      onInput={handleInput}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel || placeholder || id}
      autoFocus={autoFocus ? true : undefined}
    />
  );
});
