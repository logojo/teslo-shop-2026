import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from '@tanstack/react-pacer/debouncer'
import { Input } from "@/components/ui/input"

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string
  onChange: (value: string) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
   const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const debouncedOnChange = useDebouncedCallback(onChange, { wait: debounce })

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        debouncedOnChange(e.target.value)
      }}
    />
  )
}
