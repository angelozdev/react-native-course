import styles from "./input.module.css";

interface WithError {
  error?: string;
}

export default function withError<Props extends object>(
  InputComponent: React.ComponentType<Props>
) {
  function InputWithError({ error, ...rest }: WithError & Props) {
    return (
      <div>
        <InputComponent {...(rest as Props)} />
        {error && <p className={styles.error_message}>{error}</p>}
      </div>
    );
  }

  return InputWithError;
}
