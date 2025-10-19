import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useCoach } from "../../query/hooks.js";
import { useQueryClient, useMutation } from "react-query";
import { removeCoach, editCoach } from "../../query/services.js"; // implement updateCoach/removeCoach
import UpdateCoach from './UpdateCoach.jsx'; // your update modal component
import DialogBox from "../delete/DialogBox.jsx"; // optional reusable delete modal
import { toast } from "react-toastify";

const ViewCoachDetails = ({ id, open, onClose }) => {
  const qc = useQueryClient();
  const { data: coach, isLoading, isError } = useCoach(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // delete mutation
  const deleteMutation = useMutation(() => removeCoach(id), {
    onSuccess: () => {
      qc.invalidateQueries("coaches");
      qc.invalidateQueries(["coach", id]);
      onClose(); // close modal after delete
      toast.success("Coach deleted successfully");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete coach");
  },
  });

  // update mutation (used if you prefer updating here instead of letting UpdateCoach call API)
  const updateMutation = useMutation((payload) => editCoach(id, payload), {
    onSuccess: (data) => {
      qc.invalidateQueries("coaches");
      qc.invalidateQueries(["coach", data.id]);
      setIsEditOpen(false);
      toast.success("Successfully Updated")
    },
    onError: (err)=>{
      toast.error("Failed to Update COach")
    }
  });

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  if(isLoading){
        return (
          <div className='flex justify-center items-center pt-56'>
            <FourSquare color="#00fffc" size="medium" text="Please Wait..." textColor="#00fffc" />
          </div>
        )
      }

    if(isError){
      toast.error("Failed to load Stats Component")
    }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coach-detail-title"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* panel */}
      <div className="relative z-10 w-full max-w-3xl mx-4 bg-black text-cyan-500 rounded-xl shadow-xl">
          <div className="p-6 border border-cyan-500 rounded-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-black text-2xl">
                  {coach.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <h2 id="coach-detail-title" className="text-xl sm:text-2xl font-semibold text-cyan-500">
                    {coach.name}
                  </h2>
                  <p className="text-sm text-cyan-500">{coach.email}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="inline-block bg-cyan-500 px-3 py-1 rounded text-black">
                      {coach.category}
                    </span>
                    <span className="inline-block px-3 py-1 rounded bg-amber-500 text-black">
                      {coach.rating} ★
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded ${
                        coach.status === "active" ? "bg-green-500 text-black" : "bg-red-500"
                      }`}
                    >
                      {coach.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close coach details"
                onClick={onClose}
                className="p-2 rounded-md text-cyan-500 hover:bg-slate-900"
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-cyan-500">About</h3>
              <p className="text-cyan-200 mt-2">{coach.bio ?? "No bio available."}</p>
            </div>

            <div className="mt-6 flex gap-2 justify-end">
              <button
                onClick={() => setIsEditOpen(true)}
                className="px-4 py-2 rounded bg-cyan-500 text-black hover:bg-gray-700"
              >
                Edit
              </button>

              <button
                onClick={() => setConfirmOpen(true)}
                className="px-4 py-2 rounded border border-red-500 text-red-500 hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
      </div>

      {isEditOpen && coach && (
        <UpdateCoach
          coach={coach}
          onClose={() => setIsEditOpen(false)}
          onSubmit={async (updated) => {
            await updateMutation.mutateAsync(updated);
          }}
        />
      )}

      <DialogBox
        open={confirmOpen}
        title="Delete coach"
        description={`Are you sure you want to delete ${coach?.name ?? "this coach"}? This action cannot be undone.`}
        isLoading={deleteMutation.isLoading}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
};

export default ViewCoachDetails;
