import type { LucideIcon } from "lucide-react"
import {
  WifiOff,
  FileQuestion,
  ServerCrash,
  ShieldAlert,
  Clock,
  Lock,
  CircleAlert,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import type { ErrorVariant } from "@/heroes/api/api-error"

type ErrorPreset = {
  icon: LucideIcon
  title: string
  description: string
  /** Tailwind classes for the icon badge background + icon color */
  tone: string
}

const PRESETS: Record<ErrorVariant, ErrorPreset> = {
  network: {
    icon: WifiOff,
    title: "Network error",
    description:
      "We couldn't reach the server. Check your internet connection and try again.",
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  "not-found": {
    icon: FileQuestion,
    title: "Not found",
    description: "The page or resource you're looking for doesn't exist.",
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  server: {
    icon: ServerCrash,
    title: "Something went wrong",
    description:
      "Our servers ran into a problem. Please try again in a few moments.",
    tone: "bg-destructive/10 text-destructive",
  },
  forbidden: {
    icon: ShieldAlert,
    title: "Access denied",
    description: "You don't have permission to view this resource.",
    tone: "bg-destructive/10 text-destructive",
  },
  unauthorized: {
    icon: Lock,
    title: "Sign in required",
    description: "You need to be signed in to access this content.",
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  timeout: {
    icon: Clock,
    title: "Request timed out",
    description: "The request took too long to complete. Please try again.",
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  generic: {
    icon: CircleAlert,
    title: "An error occurred",
    description: "Something unexpected happened. Please try again.",
    tone: "bg-muted text-muted-foreground",
  },
}

export interface ErrorStateProps {
  /** Which preset error to render. Defaults to "generic". */
  variant?: ErrorVariant
  /** Override the preset title. */
  title?: string
  /** Override the preset description. */
  description?: string
  /** Optional error code shown above the title (e.g. 404, 500). */
  code?: string | number
  /** Label for the primary retry action. Button is hidden if onRetry is omitted. */
  retryLabel?: string
  /** Called when the retry button is clicked. */
  onRetry?: () => void
  /** Optional secondary action rendered next to retry. */
  secondaryAction?: React.ReactNode
  /** Render a compact inline layout instead of the centered full block. */
  compact?: boolean
  className?: string
}

export function ErrorState({
  variant = "generic",
  title,
  description,
  code,
  retryLabel = "Try again",
  onRetry,
  secondaryAction,
  compact = false,
  className,
}: ErrorStateProps) {
  const preset = PRESETS[variant]
  const Icon = preset.icon
  const resolvedTitle = title ?? preset.title
  const resolvedDescription = description ?? preset.description

  if (compact) {
    return (
      <div
        role="alert"
        className={cn(
          "flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground",
          className,
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full",
            preset.tone,
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium leading-6">{resolvedTitle}</p>
          <p className="text-sm text-muted-foreground">{resolvedDescription}</p>
        </div>
        {onRetry ? (
          <Button size="sm" variant="ghost" onClick={onRetry} className="shrink-0">
            <RefreshCw className="size-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{retryLabel}</span>
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-12 text-center",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-16 items-center justify-center rounded-2xl",
          preset.tone,
        )}
      >
        <Icon className="size-8" aria-hidden="true" />
      </span>

      {code != null ? (
        <span className="text-sm font-mono font-medium tracking-widest text-muted-foreground">
          {code}
        </span>
      ) : null}

      <div className="max-w-md space-y-1.5">
        <h2 className="text-balance text-xl font-semibold leading-7">
          {resolvedTitle}
        </h2>
        <p className="text-pretty text-sm leading-6 text-muted-foreground">
          {resolvedDescription}
        </p>
      </div>

      {(onRetry || secondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {onRetry ? (
            <Button onClick={onRetry}>
              <RefreshCw className="size-4" aria-hidden="true" />
              {retryLabel}
            </Button>
          ) : null}
          {secondaryAction}
        </div>
      )}
    </div>
  )
}