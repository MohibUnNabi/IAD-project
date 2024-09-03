import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({

    Todo: { type: String, required: true },
    completed: { type: Boolean, required: false },
})

const TodoModel = mongoose.model("Todo", TodoSchema)

export default TodoModel