import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ServerActionResult } from "@/actions/actions.utils";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";

type useSubmitCallback<T> = (data: T) => Promise<ServerActionResult<unknown>>;

interface useSubmitOptions {
  type?: string;
  reset?: () => void;
  successMessage: string;
  errorMessage: (error: string) => string;
}

interface useSubmitEvents {
  onSuccess?: () => void;
  onError?: (e: string) => void;
  onEnd?: () => void;
}

interface useSubmitReturn<T extends FieldValues> {
  isPending: boolean;
  submitHandler: SubmitHandler<T>;
}

export function useSubmit<T extends FieldValues>(
  callback: useSubmitCallback<T>,
  { type, reset, successMessage, errorMessage }: useSubmitOptions,
  { onSuccess, onError, onEnd }: useSubmitEvents,
): useSubmitReturn<T> {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();

  const submitHandler: SubmitHandler<T> = async (data: T) => {
    setIsPending(true);
    const result = await callback(data);
    setIsPending(false);

    if (!result.success) {
      toast.add({
        type: "error",
        message: errorMessage(result.error),
      });

      onError && onError(result.error);
    } else {
      type &&
        router.push(
          `${pathname}/?${new URLSearchParams({ [type]: nanoid(4) }).toString()}`,
        );

      toast.add({ type: "success", message: successMessage });

      reset && reset();
      onSuccess && onSuccess();
    }

    router.refresh();
    onEnd && onEnd();
  };

  return {
    isPending,
    submitHandler,
  };
}