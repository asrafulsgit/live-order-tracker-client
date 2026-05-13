import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderStatus, PROGRESS_STEPS, STATUS_LABEL } from "@/constants/data";

function OrderProgress({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5 text-sm text-destructive">
        <X className="h-4 w-4" />
        Order cancelled
      </div>
    );
  }
  

  const currentIdx = PROGRESS_STEPS.indexOf(status);

  return (
    <div className="w-full">
      <div className="flex items-center">
        {PROGRESS_STEPS.map((step, i) => {
          const done = i <= currentIdx;
          const isCurrent = i === currentIdx && status !== "completed";
          return (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors",
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground",
                    isCurrent && "ring-4 ring-primary/20",
                  )}
                >
                  {done && i < currentIdx ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={cn(
                    "whitespace-nowrap text-[10px] font-medium uppercase tracking-wide",
                    done ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {STATUS_LABEL[step]}
                </span>
              </div>
              {i < PROGRESS_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 mb-5 h-0.5 flex-1 transition-colors",
                    i < currentIdx ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderProgress;
