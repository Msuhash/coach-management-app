import React from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const DialogBox = ({
  open,
  title = "Confirm delete",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isLoading = false,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm?.();
      toast.success("Coach Successfully Deleted")
    } catch (err) {
      toast.error("Error while Deletion Process")
      
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >

      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

     
      <div className="relative z-10 w-full max-w-md mx-4 bg-black border border-cyan-500 rounded-lg shadow-lg">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 id="delete-modal-title" className="text-lg font-semibold text-cyan-500">
                {title}
              </h2>
              <p id="delete-modal-desc" className="mt-1 text-sm text-cyan-500">
                {description}
              </p>
            </div>

            <button
              type="button"
              className="p-2 rounded-md text-white hover:bg-cyan-600"
              onClick={onClose}
              aria-label="Close delete dialog"
            >
              <IoClose size={18} />
            </button>
          </div>

       
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-cyan-500 hover:bg-gray-700"
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
