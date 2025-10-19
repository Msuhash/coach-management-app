import React from "react";
import { FaFilter } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useUI} from '../../store/uiStore.js'

import { RiArrowDropDownLine } from "react-icons/ri";

const FilterCoach = () => {

  const { search, category, status, setSearch, setCategory, setStatus } = useUI();

  return (
    <div className="sm:max-w-7xl m-auto p-5">
    <div className="flex flex-col rounded-2xl p-5 border border-cyan-500">
      <div className="flex justify-between items-center text-cyan-500 pb-5">
        <p>Coaches Directory</p>
        <div className="flex justify-center items-center gap-4">
          <span>
            <FaFilter />
          </span>
          <p>Coaches</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
        <input
          className="flex-1 text-white border border-cyan-500 focus:border-cyan-500 outline-none p-3 rounded-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by name, email or category..."
        />
        <span className="border border-cyan-500 text-cyan-500 p-3 px-8 rounded-2xl">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                title="Category"
                aria-label="Open category menu"
                className="text-cyan-500 rounded-full sm:rounded-2xl flex items-center gap-2 outline-none cursor-pointer"
              >
                <span className="inline-flex sm:hidden items-center">
                  <RiArrowDropDownLine size={16} />
                </span>

                <span className="hidden sm:inline-flex items-center gap-2">
                  <span>{category || "All Category" }</span>
                  <RiArrowDropDownLine size={18} />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-cyan-500 text-cyan-500 bg-black'>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setCategory("Fitness")}>Fitness</DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setCategory("Cricket")}>Cricket</DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setCategory("Yoga")}>Yoga</DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setCategory("")}>All Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>

        <span className="border border-cyan-500 text-cyan-500 p-3 px-8 rounded-2xl">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                title="Status"
                aria-label="Open status menu"
                className="text-cyan-500 sm:rounded-2xl flex items-center gap-2 outline-none cursor-pointer"
              >
                <span className="inline-flex sm:hidden items-center">
                  <RiArrowDropDownLine size={16} />
                </span>

                <span className="hidden sm:inline-flex items-center gap-2">
                  <span>{status || "All Status"}</span>
                  <RiArrowDropDownLine size={18} />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-cyan-500 text-cyan-500 bg-black'>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setStatus("Active")}>Active</DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setStatus("Inactive")}>Inactive</DropdownMenuItem>
              <DropdownMenuItem className="p-2 rounded-md data-[highlighted]:bg-cyan-700 data-[highlighted]:text-black cursor-pointer" onClick={() => setStatus("")}>All Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </div>
    </div>
  );
};

export default FilterCoach;
