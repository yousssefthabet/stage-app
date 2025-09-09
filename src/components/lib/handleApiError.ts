import { type BackEndErrorType } from "@/types/mutation-props";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const handleApiError = (
  error: unknown,
  defaultMessage = "Une erreur est survenue.",
  options?: {
    ignoreStatusCodes?: number[];
    silent?: boolean;
  },
): void => {
  const { ignoreStatusCodes = [], silent = false } = options ?? {};

  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (ignoreStatusCodes.includes(status ?? 0)) {
      return;
    }

    const responseData = error.response?.data as
      | Record<string, unknown>
      | undefined;

    // Handle different error response structures
    let errorMessage = "";

    if (responseData && typeof responseData === "object") {
      // Try to get message from different possible locations
      const message = responseData.message ?? responseData.error;

      if (
        message &&
        (typeof message === "string" || typeof message === "number")
      ) {
        errorMessage = String(message);
      }

      // Handle validation errors (422 typically returns these)
      if (status === 422 && responseData.errors) {
        handleBackendValidationErrors(
          responseData.errors as BackEndErrorType[],
        );
        return;
      }

      // Handle array of errors
      if (Array.isArray(responseData.errors)) {
        handleBackendValidationErrors(
          responseData.errors as BackEndErrorType[],
        );
        return;
      }
    }

    if (errorMessage && !silent) {
      toast.error(errorMessage);
      return;
    }

    // Handle specific status codes with better messages
    if (!silent) {
      switch (status) {
        case 400:
          toast.error("Données invalides envoyées.");
          break;
        case 401:
          toast.error("Vous devez vous connecter pour effectuer cette action.");
          break;
        case 403:
          toast.error(
            "Vous n'avez pas l'autorisation d'effectuer cette action.",
          );
          break;
        case 404:
          toast.error("Ressource non trouvée.");
          break;
        case 422:
          toast.error("Les données envoyées ne sont pas valides.");
          break;
        case 500:
          toast.error("Erreur interne du serveur.");
          break;
        default:
          toast.error(defaultMessage);
      }
    }

    return;
  }

  if (!silent) {
    toast.error(defaultMessage);
  }
};

export const handleBackendValidationErrors = (
  errors: BackEndErrorType[],
): void => {
  if (!Array.isArray(errors)) {
    toast.error("Erreurs de validation reçues du serveur.");
    return;
  }

  const errorMessages: string[] = [];

  const extractErrorMessages = (errorArray: BackEndErrorType[]): void => {
    errorArray.forEach((error) => {
      // Extract constraint messages
      if (error.constraints) {
        Object.values(error.constraints).forEach((message) => {
          if (message && !errorMessages.includes(message)) {
            errorMessages.push(message);
          }
        });
      }

      // Recursively handle nested errors
      if (error.children && error.children.length > 0) {
        extractErrorMessages(error.children);
      }
    });
  };

  extractErrorMessages(errors);

  if (errorMessages.length > 0) {
    // Show first few error messages to avoid overwhelming the user
    const messagesToShow = errorMessages.slice(0, 3);
    messagesToShow.forEach((message, index) => {
      setTimeout(() => {
        toast.error(message);
      }, index * 100); // Slight delay between toasts
    });

    if (errorMessages.length > 3) {
      setTimeout(() => {
        toast.info(`Et ${errorMessages.length - 3} autre(s) erreur(s)...`);
      }, 300);
    }
  } else {
    toast.error("Erreurs de validation reçues du serveur.");
  }
};
