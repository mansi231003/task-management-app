import { useState } from "react";

export default function EditTaskForm({ task, onCancel, onSave }) {

    const [editTitle, setEditTitle] = useState(task.title);
    const [editPriority, setEditPriority] = useState(task.priority);
    const [editDueDate, setEditDueDate] = useState(task.dueDate ? task.dueDate.substring(0, 10) : "");
    const handleSubmit = (e) => {
        e.preventDefault();

        onSave(task._id, {
            title: editTitle,
            priority: editPriority,
            dueDate: editDueDate
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex w-full flex-wrap gap-3">
                <input className="flex-1 border rounded-lg px-4 py-2" value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} />
                <select className="flex-1 border rounded-lg px-4 py-2"
                    value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <input className="border flex-1 rounded-lg px-4 py-2"
                    type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg" type="submit">
                    Save
                </button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={onCancel}>
                    Cancel
                </button>
            </form>

        </>
    )
}