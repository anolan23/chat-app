interface Props {
  htmlFor: string;
  labelText: string;
  children: React.ReactNode;
}

function InputGroup({ htmlFor, labelText, children }: Props) {
  return (
    <div className="input-group">
      <label htmlFor={htmlFor} className="input-group__label">
        {labelText}
      </label>
      {children}
    </div>
  );
}

export default InputGroup;
