"use client";

import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  KeyboardEvent,
  useEffect,
} from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import styles from "./activationForm.module.scss";
import { Col, Row } from "@w01f-o/react-grid-layout";
import Field from "@/components/shared/UI/Field/Field";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/UI/Button/Button";
import { useSubmit } from "@/hooks/useSubmit";
import { activateAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import SendCodeAgain from "@/components/features/Auth/ActivationForm/SendCodeAgain/SendCodeAgain";

interface ActivateFormProps {
  dict: RootDictionary;
}

interface FormState {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
}

const ActivationForm: FC<ActivateFormProps> = ({ dict }) => {
  const {
    handleSubmit,
    register,
    setFocus,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormState>();
  const router = useRouter();

  const { isPending, submitHandler } = useSubmit<FormState>(
    (data) => {
      const code: number = +Object.values(data).join("");

      return activateAction({ code });
    },
    {
      successMessage: dict.activation.success,
      errorMessage: (error) =>
        dict.errors[JSON.parse(error).type as keyof RootDictionary["errors"]] ??
        dict.activation.error,
      events: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    },
  );

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    currentInput: keyof FormState,
    nextInput: keyof FormState | null,
  ): void => {
    const value = e.target.value;

    if (value.length === 0) {
      setValue(currentInput, "");
    }

    if (!!value.length) {
      const newValue = `${value.length > 1 ? value.split("").shift() : value}`;

      clearErrors();
      setValue(currentInput, newValue);

      nextInput && setFocus(nextInput);
    }
  };

  const keyDownHandler = (
    e: KeyboardEvent<HTMLInputElement>,
    prevInput: keyof FormState | null,
  ): void => {
    const key = e.key || e.code;

    if (key === "e" || key === "-") {
      e.preventDefault();
    }

    if (
      prevInput &&
      key === "Backspace" &&
      !(e.target as HTMLInputElement).value
    ) {
      setFocus(prevInput);
    }
  };

  const pasteHandler = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const code = e.clipboardData?.getData("Text").split("");
    const setResult = (action: "error" | "value"): void => {
      const inputsList: (keyof FormState)[] = [
        "input1",
        "input2",
        "input3",
        "input4",
      ];

      action === "value"
        ? inputsList.forEach((input) => {
            setValue(input, code?.shift() || "");
          })
        : inputsList.forEach((input) => {
            setError(input, { type: "custom", message: "Invalid code" });
          });
    };

    if (code?.length === 4 && code.every((char) => !isNaN(+char))) {
      setFocus("input4");
      setResult("value");
    } else {
      setResult("error");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (errors.input1 || errors.input2 || errors.input3 || errors.input4) {
        clearErrors();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [clearErrors, errors.input1, errors.input2, errors.input3, errors.input4]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h5>{dict.activation.title}</h5>
        <p>{dict.activation.description}</p>
        <Row className={styles.fieldsRow}>
          <Col xs={3}>
            <Field
              type="number"
              {...register("input1", {
                required: true,
                maxLength: 1,
              })}
              min={0}
              max={9}
              isValid={watch("input1")?.length === 1}
              aria-invalid={errors.input1 ? "true" : "false"}
              onKeyDown={(e) => keyDownHandler(e, null)}
              onChange={(e) => changeHandler(e, "input1", "input2")}
              onPaste={pasteHandler}
              single
              autoFocus
            />
          </Col>
          <Col xs={3}>
            <Field
              type="number"
              {...register("input2", {
                required: true,
                maxLength: 1,
              })}
              min={0}
              max={9}
              isValid={watch("input2")?.length === 1}
              aria-invalid={errors.input2 ? "true" : "false"}
              onChange={(e) => changeHandler(e, "input2", "input3")}
              onKeyDown={(e) => keyDownHandler(e, "input1")}
              onPaste={pasteHandler}
              single
            />
          </Col>
          <Col xs={3}>
            <Field
              type="number"
              {...register("input3", {
                required: true,
                maxLength: 1,
              })}
              min={0}
              max={9}
              isValid={watch("input3")?.length === 1}
              aria-invalid={errors.input3 ? "true" : "false"}
              onChange={(e) => changeHandler(e, "input3", "input4")}
              onKeyDown={(e) => keyDownHandler(e, "input2")}
              onPaste={pasteHandler}
              single
            />
          </Col>
          <Col xs={3}>
            <Field
              type="number"
              {...register("input4", {
                required: true,
                maxLength: 1,
              })}
              min={0}
              max={9}
              isValid={watch("input4")?.length === 1}
              aria-invalid={errors.input4 ? "true" : "false"}
              onKeyDown={(e) => keyDownHandler(e, "input3")}
              onChange={(e) => changeHandler(e, "input4", null)}
              onPaste={pasteHandler}
              single
            />
          </Col>
        </Row>
        <Button role={"primary"} isPending={isPending}>
          {dict.activation.partial}
        </Button>
      </form>
      <SendCodeAgain dict={dict} />
    </>
  );
};

export default ActivationForm;
