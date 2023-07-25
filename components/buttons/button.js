// import styles from './button.module.css'
const Button = ({className,  onClick, name, disabled, type }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
export default Button;
