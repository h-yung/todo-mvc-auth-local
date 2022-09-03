const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
  timestamps: { createdAt: true, updatedAt: true } //added but will the updatedAt show for completion time?
  // should we prevent >1 click on completed within same minute?
})

module.exports = mongoose.model('Todo', TodoSchema)
