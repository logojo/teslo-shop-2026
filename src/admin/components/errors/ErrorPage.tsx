import { Button } from "@/components/ui/button"
import { ErrorState, } from "./ErrorStates";
import type { ErrorVariant } from "@/heroes/api/api-error";
import { useNavigate } from "react-router";


const VARIANTS: { value: ErrorVariant; label: string; code?: string }[] = [
  { value: "network", label: "Network" },
  { value: "not-found", label: "Not found", code: "404" },
  { value: "server", label: "Server", code: "500" },
  { value: "forbidden", label: "Forbidden", code: "403" },
  { value: "unauthorized", label: "Unauthorized", code: "401" },
  { value: "timeout", label: "Timeout", code: "408" },
  { value: "generic", label: "Generic" },
]

interface Props {
    error: ErrorVariant;
    onRetry?: () => void | Promise<unknown>;
}

export default function ErrorPage({ error, onRetry } : Props) {
  const current = VARIANTS.find((v) => v.value === error)
  const navigate = useNavigate()

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
    
      <section className="rounded-xl border border-border bg-card">
        <ErrorState
          variant={error}
          code={current?.code}
          onRetry={onRetry}
          secondaryAction={
            <Button variant="outline" onClick={() => navigate("/")}>
              Go home
            </Button>
          }
        />
      </section>
    </main>
  )
}
