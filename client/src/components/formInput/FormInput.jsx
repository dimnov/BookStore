import { useState } from "react";

export default function FormInput(props) {
  const [blur, setBlur] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleBlur = () => {
    setBlur(true);
  };

  return (
    <div>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleBlur}
        focused={blur.toString()}
      />
      <span className="error">{errorMessage}</span>
    </div>
  );
}
