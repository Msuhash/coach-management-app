import React,{useState} from "react";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { Button } from "../ui/button";
import { MdNotificationAdd } from "react-icons/md";
import CreateCoach from "../modals/CreateCoach";
import { useAddCoach } from "../../query/hooks";
import {toast} from 'react-toastify'


const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCoachMutation = useAddCoach();

  const handleAddCoach = async (data) => {
    try {
      await addCoachMutation.mutateAsync(data);
      toast.success("Coach added successfully!");
    } catch (err) {
      toast.error("Failed to add coach.");
    }
  };
  return (
    <div className="flex justify-between items-center p-4 sm:p-5 bg-black border-b border-b-cyan-500 flex-wrap">
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <PiFinnTheHumanFill className="text-cyan-500" size={28} />
        <span className="text-cyan-500 font-bold text-lg sm:text-xl">
          CoachHub
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <Button variant="cyan" size="sm" className="sm:text-base cursor-pointer" onClick={()=>setIsModalOpen(true)}>
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">+ Add Coach</span>
        </Button>
        <MdNotificationAdd className="text-cyan-500 cursor-pointer" size={26} />
      </div>

      {isModalOpen && (
        <CreateCoach onClose={()=> setIsModalOpen(false)} onSubmit={handleAddCoach}/>
      )}
    </div>
  );
};

export default Navbar;
