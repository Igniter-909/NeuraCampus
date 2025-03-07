import mongoose from 'mongoose';

const invitationTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  variables: [String],
  type: {
    type: String,
    enum: ['semester-progression', 'year-progression', 'custom'],
    default: 'custom'
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College'
  }
}, {
  timestamps: true
});

// Pre-save middleware to update timestamps
invitationTemplateSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Ensure only one default template per type
invitationTemplateSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { type: this.type, _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

// Add indexes for efficient querying
invitationTemplateSchema.index({ collegeId: 1 });
invitationTemplateSchema.index({ type: 1 });
invitationTemplateSchema.index({ isDefault: 1 });

export const InvitationTemplate = mongoose.model('InvitationTemplate', invitationTemplateSchema); 