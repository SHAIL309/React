import styles from "../Styles/HomePage.module.css";
import { motion } from "framer-motion";
const Message = ({ message }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: -40 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.9, delay: 0.9 }}
      className={styles.message}
    >
      {message}
    </motion.div>
  );
};
export default Message;
