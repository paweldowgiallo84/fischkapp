import styles from "./AppLayout.module.css";

export const AppLayout = (props: any) => (
  <div className={styles.layout}>{props.children}</div>
);
