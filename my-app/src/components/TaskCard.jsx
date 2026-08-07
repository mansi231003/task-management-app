import { isOverdue } from "../utils/isOverDue"

export default function TaskCard({ task, onDelete, onEdit, onStatusChange, onStartEdit }) {

    return (
        <>
            <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
            <p className={`px-3 py-2 rounded-full text-white font-medium ${task.priority === "High" ? "bg-red-500"
                : task.priority === "Medium" ? "bg-yellow-500"
                    : "bg-green-500"}`}>Priority: {task.priority}</p>
            <p className="text-gray-600">
                Due:{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
            </p>
            <p className="text-red-600 font-semibold">
                {isOverdue(task.dueDate) && task.status !== "Completed" ? "⚠️ Overdue" : ""}
            </p>
            <select className={`px-3 py-2 rounded-lg text-white font-semibold
                              ${task.status === "Completed" ? "bg-green-600" :
                    task.status === "In Progress" ? "bg-blue-600" :
                        "bg-gray-600"
                }`}
                value={task.status} onChange={(e) => onStatusChange(task._id, e.target.value)}>
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>
            <div className="flex gap-3">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    onClick={() => { onStartEdit(task) }}>
                    Edit
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition" onClick={() => onDelete(task._id)}>Delete</button>
            </div>

        </>
    )
}