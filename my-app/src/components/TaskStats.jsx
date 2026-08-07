import { isOverdue } from "../utils/isOverDue";
export default function TaskStats({tasks}){

      const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === "Completed").length;
    const pendingTasks = tasks.filter(task => task.status === "Todo").length;
    const overdueTasks = tasks.filter(
        task => isOverdue(task.dueDate) && task.status !== "Completed"
    ).length;

    return(
                   <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                            <h2 className="text-lg font-semibold">Total</h2>
                            <p className="text-2xl">{totalTasks}</p>
                        </div>
                        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                            <h2 className="text-lg font-semibold">Completed</h2>
                            <p className="text-2xl">{completedTasks}</p>
                        </div>
                        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                            <h2 className="text-lg font-semibold">Pending</h2>
                            <p className="text-2xl">{pendingTasks}</p>
                        </div>
                        <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
                            <h2 className="text-lg font-semibold">Overdue</h2>
                            <p className="text-2xl">{overdueTasks}</p>
                        </div>
                    </div>
    )
}