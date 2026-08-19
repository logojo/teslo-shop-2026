import type { ErrorVariant } from "@/heroes/api/api-error";
import { ErrorState } from "./ErrorStates"

interface Props {
    error: ErrorVariant;
    onRetry?: () => void | Promise<unknown>;
}

export  const CompactErrorPage = ({ error, onRetry } : Props) => {
  

  return (
    <section className="space-y-3 mb-3">
        <ErrorState
            variant={error}
            compact
            onRetry={onRetry}
        />
    </section>
  )
}
