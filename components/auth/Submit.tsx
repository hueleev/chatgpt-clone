import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function Submit({ children, ...others }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" {...others} disabled={pending}>
      {children}
    </Button>
  );
}
