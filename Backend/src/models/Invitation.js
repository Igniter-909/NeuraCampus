import mongoose from 'mongoose';
import crypto from 'crypto';

const invitationSchema = new mongoose.Schema({
  batchTransitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BatchTransition'
  },
  recipientType: {
    type: String,
    enum: ['batch', 'custom'],
    required: true
  },
  recipients: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    email: {
      type: String,
      required: true
    },
    name: String,
    status: {
      type: String,
      enum: ['sent', 'delivered', 'opened', 'accepted', 'declined'],
      default: 'sent'
    },
    token: {
      type: String,
      default: () => crypto.randomBytes(32).toString('hex')
    },
    acceptedAt: Date,
    declinedAt: Date
  }],
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvitationTemplate'
  },
  sentVia: {
    type: [String],
    enum: ['email', 'sms', 'in-app'],
    default: ['email']
  },
  scheduledFor: Date,
  sentAt: Date,
  expiresAt: Date,
  metadata: {
    totalRecipients: {
      type: Number,
      default: 0
    },
    delivered: {
      type: Number,
      default: 0
    },
    opened: {
      type: Number,
      default: 0
    },
    accepted: {
      type: Number,
      default: 0
    },
    declined: {
      type: Number,
      default: 0
    },
    pending: {
      type: Number,
      default: 0
    }
  },
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

// Pre-save middleware to update timestamps and metadata
invitationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Update metadata counts
  if (this.recipients && this.recipients.length > 0) {
    this.metadata.totalRecipients = this.recipients.length;
    
    // Count statuses
    const statusCounts = this.recipients.reduce((acc, recipient) => {
      acc[recipient.status] = (acc[recipient.status] || 0) + 1;
      return acc;
    }, {});
    
    this.metadata.delivered = statusCounts.delivered || 0;
    this.metadata.opened = statusCounts.opened || 0;
    this.metadata.accepted = statusCounts.accepted || 0;
    this.metadata.declined = statusCounts.declined || 0;
    this.metadata.pending = this.metadata.totalRecipients - 
      (this.metadata.accepted + this.metadata.declined);
  }
  
  next();
});

// Add indexes for efficient querying
invitationSchema.index({ batchTransitionId: 1 });
invitationSchema.index({ collegeId: 1 });
invitationSchema.index({ 'recipients.studentId': 1 });
invitationSchema.index({ 'recipients.token': 1 });
invitationSchema.index({ scheduledFor: 1 });

export const Invitation = mongoose.model('Invitation', invitationSchema); 