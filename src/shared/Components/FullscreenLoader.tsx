import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface FullscreenLoaderProps {
  open?: boolean
  message?: string
  className?: string
}

export function FullscreenLoader({
  open = true,
  message = "Cargando...",
  className,
}: FullscreenLoaderProps) {
  if (!open) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={cn(
        "fixed inset-0 z-50 flex min-h-dvh items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2
          aria-hidden="true"
          className="size- animate-spin text-primary"
        />

        <span className="text-sm font-medium text-muted-foreground">
          {message}
        </span>
      </div>
    </div>
  )
}
