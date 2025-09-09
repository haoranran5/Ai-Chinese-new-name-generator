"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",
          "--viewport-padding": "1.5rem",
          "--width": "400px",
          "--border-radius": "0.5rem",
          "--shadow": "0 4px 12px rgba(0, 0, 0, 0.1)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "bg-background border border-border shadow-lg",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          error:
            "bg-destructive text-destructive-foreground border-destructive/30",
          success: "bg-green-100 dark:bg-green-900 border-green-500",
          info: "bg-blue-100 dark:bg-blue-900 border-blue-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
