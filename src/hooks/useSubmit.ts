import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ServerActionResult } from "@/actions/actions.utils";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";

type useSubmitCallback<T> = (data: T) => Promise<ServerActionResult<unknown>>;

interface useSubmitEvents {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface useSubmitOptions {
  type?: string;
  reset?: () => void;
  successMessage: string;
  errorMessage: (error: string) => string;
  events?: useSubmitEvents;
}

interface useSubmitReturn<T extends FieldValues> {
  isPending: boolean;
  isError: boolean;
  submitHandler: SubmitHandler<T>;
}

export function useSubmit<T extends FieldValues>(
  callback: useSubmitCallback<T>,
  { type, reset, successMessage, errorMessage, events }: useSubmitOptions,
): useSubmitReturn<T> {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();

  const submitHandler: SubmitHandler<T> = async (data: T) => {
    events?.onStart && events.onStart();
    type &&
      router.replace(
        `${pathname}/?${new URLSearchParams({
          [type]: nanoid(4),
        }).toString()}`,
      );

    setIsPending(true);

    const result = await callback(data);
    setIsPending(false);

    if (!result.success) {
      toast.add({
        type: "error",
        message: errorMessage(result.error),
      });

      setIsError(true);
      events?.onError && events.onError(result.error);
    } else {
      toast.add({ type: "success", message: successMessage });

      reset && reset();
      events?.onSuccess && events?.onSuccess();
    }

    type && router.refresh();
    events?.onEnd && events?.onEnd();
  };

  return {
    isPending,
    isError,
    submitHandler,
  };
}
