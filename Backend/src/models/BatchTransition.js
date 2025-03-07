import mongoose from 'mongoose';

const batchTransitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  sourceBatches: [{
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: true
    },
    name: String,
    department: String,
    semester: Number,
    section: String
  }],
  destinationBatches: [{
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: true
    },
    name: String,
    department: String,
    semester: Number,
    section: String
  }],
  students: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    email: String,
    rollNumber: String,
    sourceBatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch'
    },
    destinationBatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'completed'],
      default: 'pending'
    },
    invitationSent: {
      type: Boolean,
      default: false
    },
    invitationSentAt: Date,
    responseAt: Date
  }],
  transitionType: {
    type: String,
    enum: ['semester-progression', 'year-progression', 'custom'],
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  requiresAcceptance: {
    type: Boolean,
    default: true
  },
  autoTransition: {
    type: Boolean,
    default: false
  },
  deadline: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  }
}, {
  timestamps: true
});

// Add indexes for efficient querying
batchTransitionSchema.index({ status: 1 });
batchTransitionSchema.index({ collegeId: 1 });
batchTransitionSchema.index({ scheduledDate: 1 });
batchTransitionSchema.index({ 'students.studentId': 1 });

export const BatchTransition = mongoose.model('BatchTransition', batchTransitionSchema); 