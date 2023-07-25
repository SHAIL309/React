import styles from "./textArea.module.css";
const Textarea = ({
  label,
  placeholder,
  disabled,
  handleChange,
  value,
  required,
  id,
  name,
  className
}) => {
  return (
    <div>
      {label && (
        <div className={styles.textareaLabel}>
          {label}
          {required && <span className={styles.inputrequired}>*</span>}
        </div>
      )}
      <textarea
        name={name}
        id={id}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        className={className||styles.textarea}
        value={value}
        onChange={handleChange}
        required={required}
        
      />
    </div>
  );
};

export default Textarea;
