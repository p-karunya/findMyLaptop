"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Link, Search } from "lucide-react"
import { useRouter } from "next/navigation"


const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="w-1/2 flex items-center">
        <Search size={64} color="#3e9392" strokeWidth={2} className={cn("px-2", className)} />
        <input
          type={type}
          className={cn(
        "flex h-12 w-full rounded-md border border-[#3e9392] bg-transparent px-3 py-1 shadow-sm text-[#3e9392] file:border-0 file:bg-slate-800 file:text-3xl file:font-medium file:text-slate-800 placeholder:text-[#3e9392] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3e9392] disabled:cursor-not-allowed disabled:opacity-80 md:text-xl",
        className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
