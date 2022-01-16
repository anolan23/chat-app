function Input({
  icon,
  type,
  name,
  placeHolder,
  value,
  onChange,
  onBlur,
  className,
}) {
  return (
    <div className={`input-box ${className}`}>
      {icon ? (
        <span className="material-icons icon input-box__icon">{icon}</span>
      ) : null}
      <input
        className="input-box__input"
        id={name}
        type={type}
        name={name}
        placeholder={placeHolder}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default Input;
