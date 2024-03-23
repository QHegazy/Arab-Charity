import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon, Sun } from "lucide-react"

interface SidebarButtonProps extends ButtonProps{
  icon?: LucideIcon,
  
}

export function SidbarButton({icon: Icon, className, children, ...props}: SidebarButtonProps) {
  return (
    <Button
    {...props}
      className={cn("gap-2 lg:justify-start", className)}
    >
      <div>
        {Icon && <Icon size={20} />}
      </div>
      <span className="hidden lg:inline-block">
        {children}
      </span>
    </Button>
  )
}