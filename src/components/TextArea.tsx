interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
}: Props) {
  return (
    <textarea
      className={`input-box ${className}`}
      id={name}
      name={name}
      rows={3}
      placeholder={placeholder}
      autoComplete="off"
      spellCheck={false}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default TextArea;
