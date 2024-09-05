import { FC, useEffect, useState } from "react";
import styles from "@/components/features/Auth/ActivationForm/activationForm.module.scss";
import { useForm } from "react-hook-form";
import { useSubmit } from "@/hooks/useSubmit";
import { sendActivationCodeAgainAction } from "@/actions/auth.actions";
import { RootDictionary } from "@/types/dictionaries.type";

interface SendCodeAgainProps {
  dict: RootDictionary;
}

const SendCodeAgain: FC<SendCodeAgainProps> = ({ dict }) => {
  const [sendCodeTimer, setSendCodeTimer] = useState<number>(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sendCodeTimer > 0) {
        setSendCodeTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sendCodeTimer]);

  const { handleSubmit } = useForm();

  const { isPending, submitHandler } = useSubmit(
    sendActivationCodeAgainAction,
    {
      successMessage: dict.activation.sendAgain.success,
      errorMessage: () => dict.activation.sendAgain.error,
    },
    {
      onEnd: () => {
        setSendCodeTimer(60);
      },
    },
  );

  return (
    <form
      className={styles.sendAgainForm}
      onSubmit={handleSubmit(submitHandler)}
    >
      <button
        className={styles.sendAgainButton}
        type="submit"
        disabled={sendCodeTimer !== 0 || isPending}
      >
        {sendCodeTimer > 0
          ? `${dict.activation.sendAgain.full} ${sendCodeTimer} ${sendCodeTimer <= 1 ? dict.activation.sendAgain.seconds.one : dict.activation.sendAgain.seconds.other}`
          : dict.activation.sendAgain.partial}
      </button>
    </form>
  );
};

export default SendCodeAgain;