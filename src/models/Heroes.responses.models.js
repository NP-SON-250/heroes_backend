import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
        examId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'exams',
          required: true
        },
        userId: { type: String, ref: "users" },
        correctOptionId:[ {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'options',
        }],
        responses: [
          {
            questionId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'questions',
              required: true
            },
            selectedOptionId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'options',
              required: true
            },
            
          }
        ],
        submittedAt: {
          type: Date,
          default: Date.now
        }
      })

      const responsesModel = mongoose.model('responses', responseSchema);
      export default responsesModel;