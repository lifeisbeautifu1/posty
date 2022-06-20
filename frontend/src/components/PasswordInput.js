import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';

const PasswordInput = ({ placeholder, name, value, onChange }) => {
  const [isPassword, setIsPassword] = useState(true);
  const toggleIsPassword = () => setIsPassword((prevState) => !prevState);
  return (
    <div className="password-wrapper">
      <input
        type={isPassword ? 'password' : 'text'}
        className="form-control full-width"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {isPassword ? (
        <MdVisibility className="toggle-password" onClick={toggleIsPassword} />
      ) : (
        <MdVisibilityOff
          className="toggle-password"
          onClick={toggleIsPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
