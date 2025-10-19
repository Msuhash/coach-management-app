import React from 'react'
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { IoClose } from "react-icons/io5";

const CreateCoach = ({onClose, onSubmit}) => {
    const schema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Enter a valid email").required("Email required"),
    category: Yup.string().oneOf(["Cricket", "Fitness","Yoga"]).required("Category required"),
    rating: Yup.number().min(0).max(5).nullable(),
    status: Yup.string().oneOf(["active", "inactive"]).required("Status required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      category: "Cricket",
      rating: 5,
      status: "active",
    },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset(); // reset form after submit
    onClose(); // close modal
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Add new coach dialog"
    >
      {/* dim background */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal panel */}
      <div className="relative z-10 w-full max-w-2xl mx-4 sm:mx-6 bg-black text-cyan-500 border border-cyan-500 rounded-xl shadow-xl">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 sm:p-8 grid grid-cols-1 gap-6"
        >
          {/* header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Add New Coach</h3>
              <p className="text-sm">Fill the details to add a new coach</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-md text-white hover:bg-gray-700"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* form fields: two-column on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm text-cyan-500 mb-1">Full Name</span>
              <input
                type="text"
                {...register("name")}
                className={`rounded-lg outline outline-cyan-500 px-3 py-2 bg-black focus:outline-cyan-500 border-none focus:ring-2 ${
                  errors.name ? "border-rose-500 focus:ring-rose-200" : "border-slate-200 focus:ring-cyan-200"
                }`}
                placeholder="Enter coach name"
              />
              {errors.name && (
                <span className="text-rose-600 text-sm mt-1">{errors.name.message}</span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-cyan-500 mb-1">Email</span>
              <input
                type="email"
                {...register("email")}
                className={`rounded-lg outline outline-cyan-500 px-3 py-2 bg-black focus:outline-cyan-500 border-none focus:ring-2 ${
                  errors.email ? "border-rose-500 focus:ring-rose-200" : "border-slate-200 focus:ring-cyan-200"
                }`}
                placeholder="coach@example.com"
              />
              {errors.email && (
                <span className="text-rose-600 text-sm mt-1">{errors.email.message}</span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-cyan-500 mb-1">Category</span>
              <select
                type="text"
                {...register("category")}
                className="rounded-lg outline outline-cyan-500 px-3 py-2 focus:outline-cyan-500 border-none bg-black focus:ring-2 focus:ring-cyan-200"
              >
                <option>Cricket</option>
                <option>Yoga</option>
                <option>Fitness</option>
              </select>
              {errors.category && (
                <span className="text-rose-600 text-sm mt-1">{errors.category.message}</span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-cyan-500 mb-1">Rating</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                {...register("rating")}
                className="rounded-lg outline outline-cyan-500 px-3 py-2 focus:outline-cyan-500 border-none focus:ring-2 focus:ring-cyan-200"
                placeholder="4.8"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-cyan-500 mb-1">Status</span>
              <select
                {...register("status")}
                className="rounded-lg outline outline-cyan-500 px-3 py-2 focus:outline-cyan-500 border-none bg-black"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <span className="text-rose-600 text-sm mt-1">{errors.status.message}</span>
              )}
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-cyan-500 text-cyan-500 hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 disabled:opacity-60"
            >Add Coach
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCoach
