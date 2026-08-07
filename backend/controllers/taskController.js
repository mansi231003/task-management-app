import Task from "../models/TaskModel.js"


// GET all tasks
export const getTasks = async (req, res) => {
    try {
             const { search,status,priority } = req.query;

        const filter = {
            user:req.user.id
        };

        if(search){
            filter.title = {
                $regex: search,
                $options:"i"
            };
        }
            // Filter status
        if (status) {
            filter.status = status;
        }

        // Filter priority
        if (priority) {
            filter.priority = priority;
        }

        const tasks = await Task.find(filter)
        .sort({
            createdAt:-1
        });
        // const tasks = await Task.find({
        //     user: req.user.id
        // })
        //     .sort({
        //         createdAt: -1
        //     });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// CREATE task
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        if (!title || !title.trim()) {

            return res.status(400).json({
                message: "Title is required"
            });

        }
        const task = await Task.create({
            title: title.trim(),
            description,
            priority,
            dueDate,
            status,
            user: req.user.id
        })

        res.status(201).json(task)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// DELETE task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        res.json({
            message: "Task deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const editTask = async (req, res) => {

    try {
         const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        const allowedUpdates = ["title","description","priority","dueDate","status"];

        allowedUpdates.forEach((field) => {
            if (req.body[field] !== undefined) {
                task[field] = req.body[field];
            }
        });

        await task.save()

        res.json(task)

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}

export const updateStatus = async (req, res) => {

    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.status = req.body.status;
        await task.save();

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}