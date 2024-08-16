export interface Toast {
  id: string;
  type: "error" | "warning" | "info" | "success";
  message: string;
}
