import React, { useState } from 'react'
import { useCoaches, useDeleteCoach, useEditCoach, usePatchCoach } from '../../query/hooks'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AiFillDelete } from "react-icons/ai";
import { FaFilePen } from "react-icons/fa6";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Toggle } from "@/components/ui/toggle"
import UpdateCoach from '../modals/UpdateCoach';
import { useQueryClient, useMutation } from 'react-query';
import { getCoach, removeCoach, editCoach } from '../../query/services';
import ViewCoachDetails from '../modals/ViewCoachDetails';
import DialogBox from '../delete/DialogBox';
import{useUI} from '../../store/uiStore.js'
import {toast} from 'react-toastify'
import { FourSquare } from 'react-loading-indicators';



const CoachTable = () => {

    const {data: coaches, isLoading, error} = useCoaches()
    const [coach, setCoach] = useState(null)
    const qc = useQueryClient()
    const [selectedCoachId, setSelectedCoachId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false); // delete dialog open
    const [deletingId, setDeletingId] = useState(null); // id to delete
    const { search, category, status } = useUI();
    const [mutatingId, setMutatingId] = useState(null);
    


    const patchMutation = usePatchCoach()
    const updateCoachMutation = useEditCoach()
    const deleteMutation = useDeleteCoach()

  const handleToggleStatus = (c) => {
    const newStatus = c.status === "active" ? "inactive" : "active";

    setMutatingId(c.id);
    patchMutation.mutate(
      { id: c.id, payload: { status: newStatus } },
      {
        onSettled: () => setMutatingId(null),
      }
    );
  };

  if(isLoading){
        return (
          <div className='flex justify-center items-center'>
            <FourSquare color="#00fffc" size="medium" text="Please Wait..." textColor="#00fffc" />
          </div>
        )
      }

  if (error) {
    toast.error(error.message)
  }

  const filteredCoaches = coaches?.filter(c => {
  const matchesSearch =
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase());

  const matchesCategory = !category || c.category === category;
  const matchesStatus = !status || c.status.toLowerCase() === status.toLowerCase();

  return matchesSearch && matchesCategory && matchesStatus;
}) || [];



  const openConfirm = (id) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setDeletingId(null);
    setConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      if (selectedCoachId === deletingId) {
        setSelectedCoachId(null);
      }
      closeConfirm();
    } catch (err) {
      console.error(err);
    }
  };

    const handleUpdateCoach = async(data)=>{
      try{
        await updateCoachMutation.mutateAsync({ id: coach.id, payload: data })
        toast.success("Coach Successfully Updated")

      }
      catch(error){
        toast.error("Failed to Update Coach")

      }
    }

    const Avatar = ({ name }) => {
      const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-medium">
      {initials}
    </div>
  );
};

  return (
    <div className='sm:max-w-7xl text-cyan-500 m-auto p-5'>
      <div className="border border-cyan-500 rounded-2xl overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border border-cyan-500 bg-cyan-500 hover:bg-cyan-800">
            <TableHead className="text-black font-semibold p-5">Name</TableHead>
            <TableHead className="text-black font-semibold">Email</TableHead>
            <TableHead className="text-black font-semibold">Category</TableHead>
            <TableHead className="text-black font-semibold">Status</TableHead>
            <TableHead className="text-black font-semibold">Rating</TableHead>
            <TableHead className="text-black text-left font-semibold pl-7">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCoaches.map((c)=>(
            <TableRow key={c.id} className="border border-cyan-500 hover:bg-gray-700 transition-colors" >
              <TableCell className="p-5">
                <div className='flex items-center gap-2'>
                  <Avatar name={c.name} />
                  <button className='cursor-pointer' onClick={()=>setSelectedCoachId(c.id)} onMouseEnter={()=>qc.prefetchQuery(["coach",c.id], ()=>getCoach(c.id))}>{c.name}</button>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <MdOutlineMarkEmailRead size={25}/>
                  {c.email}
                </div>
              </TableCell>
              <TableCell>
                <div className='inline-block bg-cyan-500 text-black rounded-2xl p-2 px-4'>
                  {c.category}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <div className={`${c.status === "active" ? "bg-green-500 inline-block text-black rounded-2xl p-2 px-4" : "bg-red-500 inline-block text-black rounded-2xl p-2 px-4"}`}>
                  {c.status}
                </div>
                <div>
                    <Toggle
                      pressed={c.status === "active"}
                      onPressedChange={() => handleToggleStatus(c)}
                       className="data-[state=on]:bg-green-500 data-[state=off]:bg-red-500 text-black cursor-pointer"
                      aria-label={`Toggle status for ${c.name}`}
                    >
                      {c.status === "active" ? "On" : "Off"}
                    </Toggle>
                  </div>
                </div>
                
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2 text-amber-500'>
                  <FaStar size={25}/>
                  {c.rating}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex justify-center items-center gap-2'>
                  <button onClick={()=>setCoach(c)} className='hover:text-cyan-700 cursor-pointer'><FaFilePen size={25}/></button>
                  <button className='text-red-500 hover:text-red-700 cursor-pointer' onClick={() => openConfirm(c.id)}><AiFillDelete size={25}/></button>
                </div>
              </TableCell>
          </TableRow>
          ))}
          
        </TableBody>
      </Table>

      {
        coach && (
          <UpdateCoach coach={coach} onClose={()=>setCoach(null)} onSubmit={handleUpdateCoach}/>
        )
      }

      {
        selectedCoachId && (
          <ViewCoachDetails
            id={selectedCoachId}
            open={Boolean(selectedCoachId)}
            onClose={() => setSelectedCoachId(null)}
      />
        )
      }

      <DialogBox
        open={confirmOpen}
        title="Delete coach"
        description={`Are you sure you want to delete ${coaches.find((x) => x.id === deletingId)?.name ?? "this coach"}? This action cannot be undone.`}
        isLoading={deleteMutation.isLoading}
        onClose={closeConfirm}
        onConfirm={handleConfirmDelete}
      />
      </div>
    </div>
  );
}

export default CoachTable
