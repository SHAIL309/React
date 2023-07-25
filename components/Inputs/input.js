import styles from "./input.module.css";

const Input = ({
  type,
  value,
  handleChange,
  placeholder,
  id,
  name,
  required,
  label,
  disabled,
  readOnly,
  className,
}) => {
  return (
    <div>
      {label && (
        <div className={styles.inputLabel}>
          {label}
          {required && <span className={styles.inputrequired}>*</span>}
        </div>
      )}

      <input
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
        className={className || styles.input}
        label={label}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
};
export default Input;
