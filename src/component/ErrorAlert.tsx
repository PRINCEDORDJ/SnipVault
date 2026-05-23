import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { useError } from "../context/ErrorContext";

const ErrorAlert = () => {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div
      className="fixed right-5  bottom-6  z-50 max-w-md rounded-2xl border border-red-300 bg-red-50 p-4 shadow-[0_0_24px_rgba(239,68,68,0.2)] dark:border-red-800 dark:bg-red-950/40 dark:shadow-[0_0_24px_rgba(239,68,68,0.15)] sm:bottom-8 sm-right-5"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex gap-3">
        <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400" />
        <div className="flex-1">
          <p className="text-sm font-bold text-red-800 dark:text-red-200">
            Error
          </p>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        </div>
        <button
          type="button"
          onClick={clearError}
          className="flex-shrink-0 text-red-500 transition hover:text-red-700 dark:hover:text-red-300"
          aria-label="Close error"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
