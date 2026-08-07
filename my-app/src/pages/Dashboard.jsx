import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import { FileCheck } from "lucide-react";
import { getTasks, updateStatus, deleteTask, editTask } from "../services/task";
import TaskCard from "../components/TaskCard";
import EditTaskForm from "../components/EditTaskForm";
import TaskForm from "../components/TaskForm";
import TaskStats from "../components/TaskStats";
import SearchFilter from "../components/SearchFilter";
import { isOverdue } from "../utils/isOverdue";

export default function Dashboard() {
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([]);

    const [editId, setEditId] = useState(null)

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");

    const getAllTasks = async () => {
        try {
            const response = await getTasks()
            setTasks(response.data)

        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token")
                navigate("/")
            } else {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getAllTasks()
    }, [])

    const changeStatus = async (id, status) => {
        try {
            await updateStatus(id, status)
            getAllTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTask(id)
            getAllTasks();
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (id, data) => {

        try {
            await editTask(id, data)
            setEditId(null)
            getAllTasks()


        } catch (error) {
            console.log(error)
        }
    }

    const filteredTasks = [...tasks]
        .filter((task) => {
            const matchesSearch = task.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" ||
                filter === task.status ||
                (
                    filter === "Overdue" &&
                    isOverdue(task.dueDate) &&
                    task.status !== "Completed"
                );
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (sortBy === "Newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }

            if (sortBy === "Oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }

            if (sortBy === "Due Date") {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }

            if (sortBy === "Priority") {
                const order = {
                    High: 3,
                    Medium: 2,
                    Low: 1,
                };

                return order[b.priority] - order[a.priority];
            }

            return 0;
        });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-200 to-slate-300 py-8">
                <div className="max-w-6xl mx-auto px-4 space-y-6">
                    <h1 className="sm:text-4xl text-3xl font-bold flex justify-center items-center text-slate-800 text-center"><FileCheck className="w-8 h-8 text-slate-800" /> Task Dashboard</h1>
                    {filteredTasks.length === 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                            <h2 className="text-2xl font-semibold text-gray-600">
                                No tasks found 📭
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Add a new task or change your search/filter.
                            </p>
                        </div>
                    )}

                    <TaskStats tasks={tasks} />
                    <TaskForm
                        onTaskCreated={(newTask) => {
                            setTasks((prev) => [newTask, ...prev])
                        }}
                    />

                    <SearchFilter
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    {filteredTasks.map(task => (
                        <div className="bg-white rounded-xl shadow-lg p-5 flex flex-wrap items-center justify-between gap-4" key={task._id}>
                            {
                                editId === task._id ? (
                                    <EditTaskForm task={task}
                                        onSave={handleEdit}
                                        onCancel={() => { setEditId(null) }} />
                                ) : (
                                    <TaskCard task={task} onDelete={handleDelete} onStatusChange={changeStatus}
                                        onStartEdit={() => { setEditId(task._id) }} />
                                )}
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}