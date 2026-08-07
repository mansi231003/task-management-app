import { useState } from "react";
import { createTask } from "../services/task";

export default function TaskForm({ onTaskCreated }) {
     const [title, setTitle] = useState("")
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Todo");
        const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            return
        }
        try {
         const {data}= await createTask({ title, priority, dueDate, status })
            setTitle("");
            setPriority("Medium");
            setStatus("Todo")
            onTaskCreated(data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
             <form onSubmit={addTask} className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap gap-4">
                        <input className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={title} placeholder="Enter task" onChange={(e) => setTitle(e.target.value)} />
                        <select className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <select
                            className="flex-1 border focus:ring-2 focus:ring-blue-500 rounded-lg px-4 py-2"
                            value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Todo</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <input className=" border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition" type="submit">Add Task</button>

                    </form>
            {/* <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow">
                <input className="border rounded-lg px-4 py-2 w-full"
                    placeholder="Enter task" value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <select className="border rounded-lg px-4 py-2 w-full mt-3"
                    value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg">
                    Add Task
                </button>
            </form> */}
        </>
    )
}