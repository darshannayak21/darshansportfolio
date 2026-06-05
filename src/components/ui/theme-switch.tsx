import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const ThemeSwitch = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { theme, setTheme } = useTheme();
  const checked = theme === "dark";

  const handleCheckedChange = useCallback(
    (isChecked: boolean) => {
      setTheme(isChecked ? "dark" : "light");
    },
    [setTheme],
  );

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        "h-7 w-16 md:h-8 md:w-[72px]",
        className
      )}
      {...props}
    >
      <Switch
        checked={checked}
        onCheckedChange={handleCheckedChange}
        className={cn(
          "peer absolute inset-0 h-full w-full rounded-full bg-white/10 dark:bg-white/10 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "[&>span]:h-5 [&>span]:w-5 md:[&>span]:h-6 md:[&>span]:w-6 [&>span]:rounded-full [&>span]:bg-white dark:[&>span]:bg-white [&>span]:shadow [&>span]:z-10",
          "data-[state=unchecked]:[&>span]:translate-x-1",
          "data-[state=checked]:[&>span]:translate-x-[40px] md:data-[state=checked]:[&>span]:translate-x-[44px]"
        )}
      />

      <span
        className={cn(
          "pointer-events-none absolute left-[6px] inset-y-0 z-0",
          "flex items-center justify-center"
        )}
      >
        <SunIcon
          size={14}
          className={cn(
            "transition-all duration-200 ease-out md:w-[16px] md:h-[16px]",
            !checked ? "text-yellow-500 scale-110" : "text-white/40"
          )}
        />
      </span>

      <span
        className={cn(
          "pointer-events-none absolute right-[6px] inset-y-0 z-0",
          "flex items-center justify-center"
        )}
      >
        <MoonIcon
          size={14}
          className={cn(
            "transition-all duration-200 ease-out md:w-[16px] md:h-[16px]",
            checked ? "text-white scale-110" : "text-black/40"
          )}
        />
      </span>
    </div>
  );
};

export default ThemeSwitch;
