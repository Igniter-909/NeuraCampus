import { BatchTransition } from '../models/BatchTransition.js';
import { Invitation } from '../models/Invitation.js';
import { User } from '../models/User.js';
import { Batch } from '../models/Batch.js';
import { InvitationTemplate } from '../models/InvitationTemplate.js';
import { sendEmail } from '../utils/emailService.js';
import logger from '../utils/logger.js';

// Get all batch transitions
const getAllBatchTransitions = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const collegeId = req.user.collegeId;
    
    // Build query
    const query = { collegeId };
    if (status) query.status = status;
    if (type) query.transitionType = type;
    
    // Count total documents
    const total = await BatchTransition.countDocuments(query);
    
    // Get paginated results
    const transitions = await BatchTransition.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email')
      .populate('sourceBatches.batchId', 'name')
      .populate('destinationBatches.batchId', 'name');
    
    res.status(200).json({
      transitions,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching batch transitions:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get batch transition by ID
const getBatchTransitionById = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const collegeId = req.user.collegeId;
    
    const transition = await BatchTransition.findOne({ 
      _id: transitionId, 
      collegeId 
    })
      .populate('createdBy', 'name email')
      .populate('sourceBatches.batchId', 'name department')
      .populate('destinationBatches.batchId', 'name department')
      .populate('students.studentId', 'name email');
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    res.status(200).json({ transition });
  } catch (error) {
    logger.error('Error fetching batch transition:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Create new batch transition
const createBatchTransition = async (req, res) => {
  try {
    const {
      name,
      description,
      sourceBatchIds,
      destinationBatchIds,
      transitionType,
      scheduledDate,
      requiresAcceptance,
      autoTransition,
      deadline
    } = req.body;
    
    const collegeId = req.user.collegeId;
    
    // Validate source batches
    const sourceBatches = await Batch.find({ 
      _id: { $in: sourceBatchIds },
      collegeId
    });
    
    if (sourceBatches.length !== sourceBatchIds.length) {
      return res.status(400).json({ message: 'One or more source batches not found' });
    }
    
    // Validate destination batches
    const destinationBatches = await Batch.find({ 
      _id: { $in: destinationBatchIds },
      collegeId
    });
    
    if (destinationBatches.length !== destinationBatchIds.length) {
      return res.status(400).json({ message: 'One or more destination batches not found' });
    }
    
    // Get students from source batches
    const students = await User.find({
      batchId: { $in: sourceBatchIds },
      role: 'student',
      status: 'active',
      collegeId
    });
    
    // Format source batches
    const formattedSourceBatches = sourceBatches.map(batch => ({
      batchId: batch._id,
      name: batch.name,
      department: batch.departmentId,
      semester: batch.semester,
      section: batch.section
    }));
    
    // Format destination batches
    const formattedDestinationBatches = destinationBatches.map(batch => ({
      batchId: batch._id,
      name: batch.name,
      department: batch.departmentId,
      semester: batch.semester,
      section: batch.section
    }));
    
    // Format students
    const formattedStudents = students.map(student => ({
      studentId: student._id,
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber || '',
      sourceBatchId: student.batchId,
      destinationBatchId: null, // Will be assigned later
      status: 'pending',
      invitationSent: false
    }));
    
    // Create batch transition
    const batchTransition = new BatchTransition({
      name,
      description,
      sourceBatches: formattedSourceBatches,
      destinationBatches: formattedDestinationBatches,
      students: formattedStudents,
      transitionType,
      scheduledDate: new Date(scheduledDate),
      status: 'draft',
      requiresAcceptance: requiresAcceptance || true,
      autoTransition: autoTransition || false,
      deadline: deadline ? new Date(deadline) : null,
      createdBy: req.user._id,
      collegeId
    });
    
    await batchTransition.save();
    
    res.status(201).json({
      message: 'Batch transition created successfully',
      transition: batchTransition
    });
  } catch (error) {
    logger.error('Error creating batch transition:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update batch transition status
const updateBatchTransitionStatus = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const { status } = req.body;
    const collegeId = req.user.collegeId;
    
    // Validate status
    const validStatuses = ['draft', 'scheduled', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const transition = await BatchTransition.findOne({ _id: transitionId, collegeId });
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    // Update status
    transition.status = status;
    await transition.save();
    
    // If status is completed, update student batch assignments
    if (status === 'completed') {
      for (const student of transition.students) {
        if (student.status === 'accepted' || !transition.requiresAcceptance) {
          // Update student batch
          await User.findByIdAndUpdate(student.studentId, {
            batchId: student.destinationBatchId
          });
          
          // Update student status in transition
          student.status = 'completed';
        }
      }
      await transition.save();
    }
    
    res.status(200).json({
      message: 'Batch transition status updated successfully',
      transition
    });
  } catch (error) {
    logger.error('Error updating batch transition status:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Assign students to destination batches
const assignStudentsToBatches = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const { assignments } = req.body;
    const collegeId = req.user.collegeId;
    
    const transition = await BatchTransition.findOne({ _id: transitionId, collegeId });
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    if (transition.status !== 'draft' && transition.status !== 'scheduled') {
      return res.status(400).json({ 
        message: 'Cannot modify assignments for transitions that are in progress or completed' 
      });
    }
    
    // Validate destination batches
    const destinationBatchIds = transition.destinationBatches.map(batch => 
      batch.batchId.toString()
    );
    
    for (const assignment of assignments) {
      if (!destinationBatchIds.includes(assignment.destinationBatchId)) {
        return res.status(400).json({ 
          message: `Destination batch ${assignment.destinationBatchId} is not valid for this transition` 
        });
      }
    }
    
    // Update student assignments
    for (const assignment of assignments) {
      const studentIndex = transition.students.findIndex(
        s => s.studentId.toString() === assignment.studentId
      );
      
      if (studentIndex !== -1) {
        transition.students[studentIndex].destinationBatchId = assignment.destinationBatchId;
      }
    }
    
    await transition.save();
    
    res.status(200).json({
      message: 'Student batch assignments updated successfully',
      transition
    });
  } catch (error) {
    logger.error('Error assigning students to batches:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Send invitations to students
const sendInvitations = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const { 
      templateId, 
      customSubject, 
      customMessage,
      sendVia = ['email'],
      studentIds // Optional: specific students to send to
    } = req.body;
    
    const collegeId = req.user.collegeId;
    
    // Find the transition
    const transition = await BatchTransition.findOne({ _id: transitionId, collegeId })
      .populate('sourceBatches.batchId', 'name')
      .populate('destinationBatches.batchId', 'name');
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    // Get template if provided
    let template;
    let subject = customSubject;
    let message = customMessage;
    
    if (templateId) {
      template = await InvitationTemplate.findOne({ 
        _id: templateId,
        $or: [{ collegeId }, { collegeId: null }] // Allow global templates
      });
      
      if (!template) {
        return res.status(404).json({ message: 'Template not found' });
      }
      
      subject = template.subject;
      message = template.body;
    }
    
    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject and message are required' });
    }
    
    // Filter students if studentIds provided
    let studentsToInvite = transition.students;
    if (studentIds && studentIds.length > 0) {
      studentsToInvite = transition.students.filter(student => 
        studentIds.includes(student.studentId.toString())
      );
    }
    
    // Create invitation
    const invitation = new Invitation({
      batchTransitionId: transition._id,
      recipientType: studentIds ? 'custom' : 'batch',
      recipients: studentsToInvite.map(student => ({
        studentId: student.studentId,
        email: student.email,
        name: student.name,
        status: 'sent'
      })),
      subject,
      message,
      templateId: template ? template._id : null,
      sentVia,
      scheduledFor: new Date(),
      sentAt: new Date(),
      expiresAt: transition.deadline,
      metadata: {
        totalRecipients: studentsToInvite.length,
        pending: studentsToInvite.length
      },
      createdBy: req.user._id,
      collegeId
    });
    
    await invitation.save();
    
    // Update transition with invitation sent status
    for (const student of studentsToInvite) {
      const studentIndex = transition.students.findIndex(
        s => s.studentId.toString() === student.studentId.toString()
      );
      
      if (studentIndex !== -1) {
        transition.students[studentIndex].invitationSent = true;
        transition.students[studentIndex].invitationSentAt = new Date();
      }
    }
    
    await transition.save();
    
    // Send emails in background
    if (sendVia.includes('email')) {
      for (const recipient of invitation.recipients) {
        // Get student details
        const student = transition.students.find(
          s => s.studentId.toString() === recipient.studentId.toString()
        );
        
        if (!student) continue;
        
        // Get source and destination batch
        const sourceBatch = transition.sourceBatches.find(
          b => b.batchId.toString() === student.sourceBatchId.toString()
        );
        
        const destinationBatch = transition.destinationBatches.find(
          b => b.batchId.toString() === student.destinationBatchId.toString()
        );
        
        if (!sourceBatch || !destinationBatch) continue;
        
        // Replace template variables
        let emailSubject = subject
          .replace(/{{student\.name}}/g, student.name)
          .replace(/{{source\.batch}}/g, sourceBatch.name)
          .replace(/{{source\.semester}}/g, sourceBatch.semester)
          .replace(/{{destination\.batch}}/g, destinationBatch.name)
          .replace(/{{destination\.semester}}/g, destinationBatch.semester);
        
        let emailBody = message
          .replace(/{{student\.name}}/g, student.name)
          .replace(/{{source\.batch}}/g, sourceBatch.name)
          .replace(/{{source\.semester}}/g, sourceBatch.semester)
          .replace(/{{destination\.batch}}/g, destinationBatch.name)
          .replace(/{{destination\.semester}}/g, destinationBatch.semester)
          .replace(/{{transition\.date}}/g, new Date(transition.scheduledDate).toLocaleDateString())
          .replace(/{{invitation\.expiryDate}}/g, transition.deadline ? 
            new Date(transition.deadline).toLocaleDateString() : 'N/A');
        
        // Add accept/decline links
        const acceptUrl = `${process.env.FRONTEND_URL}/student/invitations/${invitation._id}/accept?token=${recipient.token}`;
        const declineUrl = `${process.env.FRONTEND_URL}/student/invitations/${invitation._id}/decline?token=${recipient.token}`;
        
        emailBody = emailBody.replace('[ACCEPT INVITATION]', 
          `<a href="${acceptUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Accept Invitation</a>`
        );
        
        // Add decline link if not already in template
        if (!emailBody.includes('[DECLINE INVITATION]')) {
          emailBody += `<p>If you wish to decline, <a href="${declineUrl}">click here</a>.</p>`;
        } else {
          emailBody = emailBody.replace('[DECLINE INVITATION]', 
            `<a href="${declineUrl}" style="display: inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px;">Decline Invitation</a>`
          );
        }
        
        // Send email
        try {
          await sendEmail({
            to: recipient.email,
            subject: emailSubject,
            html: emailBody
          });
        } catch (emailError) {
          logger.error(`Error sending email to ${recipient.email}:`, emailError);
        }
      }
    }
    
    // TODO: Implement SMS and in-app notifications if needed
    
    res.status(200).json({
      message: 'Invitations sent successfully',
      invitation
    });
  } catch (error) {
    logger.error('Error sending invitations:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get all invitations for a batch transition
const getInvitations = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const collegeId = req.user.collegeId;
    
    const invitations = await Invitation.find({ 
      batchTransitionId: transitionId,
      collegeId
    }).sort({ createdAt: -1 });
    
    res.status(200).json({ invitations });
  } catch (error) {
    logger.error('Error fetching invitations:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Student: Get received invitations
const getStudentInvitations = async (req, res) => {
  try {
    const studentId = req.user._id;
    
    const invitations = await Invitation.find({
      'recipients.studentId': studentId
    })
      .populate({
        path: 'batchTransitionId',
        select: 'name description scheduledDate deadline status',
        populate: [
          { path: 'sourceBatches.batchId', select: 'name' },
          { path: 'destinationBatches.batchId', select: 'name' }
        ]
      })
      .sort({ createdAt: -1 });
    
    // Format response
    const formattedInvitations = invitations.map(invitation => {
      const recipient = invitation.recipients.find(
        r => r.studentId.toString() === studentId.toString()
      );
      
      return {
        id: invitation._id,
        subject: invitation.subject,
        message: invitation.message,
        sentAt: invitation.sentAt,
        expiresAt: invitation.expiresAt,
        status: recipient ? recipient.status : 'unknown',
        transition: invitation.batchTransitionId,
        token: recipient ? recipient.token : null
      };
    });
    
    res.status(200).json({ invitations: formattedInvitations });
  } catch (error) {
    logger.error('Error fetching student invitations:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Student: Respond to invitation
const respondToInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const { response, token } = req.body;
    const studentId = req.user._id;
    
    if (!['accepted', 'declined'].includes(response)) {
      return res.status(400).json({ message: 'Invalid response' });
    }
    
    // Find invitation
    const invitation = await Invitation.findById(invitationId);
    
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }
    
    // Find recipient
    const recipientIndex = invitation.recipients.findIndex(
      r => r.studentId.toString() === studentId.toString() && r.token === token
    );
    
    if (recipientIndex === -1) {
      return res.status(403).json({ message: 'Invalid token or not authorized' });
    }
    
    // Check if invitation has expired
    if (invitation.expiresAt && new Date() > new Date(invitation.expiresAt)) {
      return res.status(400).json({ message: 'Invitation has expired' });
    }
    
    // Update recipient status
    invitation.recipients[recipientIndex].status = response;
    
    if (response === 'accepted') {
      invitation.recipients[recipientIndex].acceptedAt = new Date();
      invitation.metadata.accepted += 1;
    } else {
      invitation.recipients[recipientIndex].declinedAt = new Date();
      invitation.metadata.declined += 1;
    }
    
    invitation.metadata.pending -= 1;
    
    await invitation.save();
    
    // Update batch transition
    const transition = await BatchTransition.findById(invitation.batchTransitionId);
    
    if (transition) {
      const studentIndex = transition.students.findIndex(
        s => s.studentId.toString() === studentId.toString()
      );
      
      if (studentIndex !== -1) {
        transition.students[studentIndex].status = response;
        transition.students[studentIndex].responseAt = new Date();
        await transition.save();
      }
    }
    
    res.status(200).json({
      message: `Invitation ${response} successfully`,
      status: response
    });
  } catch (error) {
    logger.error('Error responding to invitation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update batch transition
const updateBatchTransition = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const {
      name,
      description,
      scheduledDate,
      requiresAcceptance,
      autoTransition,
      deadline,
      destinationBatchIds
    } = req.body;
    
    const collegeId = req.user.collegeId;
    
    // Find transition
    const transition = await BatchTransition.findOne({
      _id: transitionId,
      collegeId
    });
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    // Check if transition can be updated
    if (['completed', 'cancelled'].includes(transition.status)) {
      return res.status(400).json({ 
        message: `Cannot update transition in ${transition.status} status` 
      });
    }
    
    // Update basic fields
    if (name) transition.name = name;
    if (description) transition.description = description;
    if (scheduledDate) transition.scheduledDate = scheduledDate;
    if (requiresAcceptance !== undefined) transition.requiresAcceptance = requiresAcceptance;
    if (autoTransition !== undefined) transition.autoTransition = autoTransition;
    if (deadline) transition.deadline = deadline;
    
    // Update destination batches if provided
    if (destinationBatchIds && destinationBatchIds.length > 0) {
      // Validate destination batches
      const destinationBatches = await Batch.find({ 
        _id: { $in: destinationBatchIds },
        collegeId
      });
      
      if (destinationBatches.length !== destinationBatchIds.length) {
        return res.status(400).json({ message: 'One or more destination batches not found' });
      }
      
      // Format destination batches
      const formattedDestinationBatches = destinationBatches.map(batch => ({
        batchId: batch._id,
        name: batch.name,
        department: batch.department,
        semester: batch.semester,
        section: batch.section
      }));
      
      transition.destinationBatches = formattedDestinationBatches;
    }
    
    await transition.save();
    
    res.status(200).json({
      message: 'Batch transition updated successfully',
      transition
    });
  } catch (error) {
    logger.error('Error updating batch transition:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get transition students
const getTransitionStudents = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const collegeId = req.user.collegeId;
    
    const transition = await BatchTransition.findOne({ 
      _id: transitionId, 
      collegeId 
    }).populate('students.studentId', 'name email rollNumber');
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    res.status(200).json({ students: transition.students });
  } catch (error) {
    logger.error('Error fetching transition students:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update transition students
const updateTransitionStudents = async (req, res) => {
  try {
    const { transitionId } = req.params;
    const { students } = req.body;
    const collegeId = req.user.collegeId;
    
    const transition = await BatchTransition.findOne({ 
      _id: transitionId, 
      collegeId 
    });
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    // Update student records
    for (const updatedStudent of students) {
      const studentIndex = transition.students.findIndex(
        s => s.studentId.toString() === updatedStudent.studentId
      );
      
      if (studentIndex !== -1) {
        transition.students[studentIndex] = {
          ...transition.students[studentIndex],
          ...updatedStudent
        };
      }
    }
    
    await transition.save();
    
    res.status(200).json({
      message: 'Students updated successfully',
      students: transition.students
    });
  } catch (error) {
    logger.error('Error updating transition students:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Transition batch
const transitionBatch = async (req, res) => {
  try {
    const { transitionId } = req.body;
    const collegeId = req.user.collegeId;
    
    const transition = await BatchTransition.findOne({ 
      _id: transitionId, 
      collegeId 
    });
    
    if (!transition) {
      return res.status(404).json({ message: 'Batch transition not found' });
    }
    
    // Update student batch assignments
    for (const student of transition.students) {
      if (student.status === 'accepted' || !transition.requiresAcceptance) {
        await User.findByIdAndUpdate(student.studentId, {
          batchId: student.destinationBatchId
        });
        student.status = 'completed';
      }
    }
    
    transition.status = 'completed';
    await transition.save();
    
    res.status(200).json({
      message: 'Batch transition completed successfully',
      transition
    });
  } catch (error) {
    logger.error('Error transitioning batch:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get invitation details by ID
const getInvitationById = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const collegeId = req.user.collegeId;
    
    const invitation = await Invitation.findOne({ 
      _id: invitationId,
      collegeId 
    }).populate({
      path: 'batchTransitionId',
      select: 'name description scheduledDate deadline status',
      populate: [
        { path: 'sourceBatches.batchId', select: 'name' },
        { path: 'destinationBatches.batchId', select: 'name' }
      ]
    });
    
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }
    
    res.status(200).json({ invitation });
  } catch (error) {
    logger.error('Error fetching invitation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Resend invitation to students who haven't responded
const resendInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const collegeId = req.user.collegeId;
    
    const invitation = await Invitation.findOne({ 
      _id: invitationId,
      collegeId 
    }).populate('batchTransitionId');
    
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }
    
    // Filter recipients who haven't responded
    const pendingRecipients = invitation.recipients.filter(
      recipient => recipient.status === 'sent'
    );
    
    if (pendingRecipients.length === 0) {
      return res.status(400).json({ 
        message: 'No pending recipients to resend invitation to' 
      });
    }
    
    // Send emails to pending recipients
    for (const recipient of pendingRecipients) {
      try {
        await sendEmail({
          to: recipient.email,
          subject: invitation.subject,
          html: invitation.message
        });
        
        // Update resent timestamp
        recipient.resentAt = new Date();
        recipient.resendCount = (recipient.resendCount || 0) + 1;
      } catch (emailError) {
        logger.error(`Error resending email to ${recipient.email}:`, emailError);
      }
    }
    
    await invitation.save();
    
    res.status(200).json({
      message: `Invitation resent to ${pendingRecipients.length} recipients`,
      invitation
    });
  } catch (error) {
    logger.error('Error resending invitation:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get student's batch transitions
const getStudentTransitions = async (req, res) => {
  try {
    const studentId = req.user._id;
    const collegeId = req.user.collegeId;
    
    // Find transitions where the student is involved
    const transitions = await BatchTransition.find({
      collegeId,
      'students.studentId': studentId
    })
      .populate('sourceBatches.batchId', 'name department')
      .populate('destinationBatches.batchId', 'name department')
      .sort({ createdAt: -1 });
    
    // Format response to include student-specific details
    const formattedTransitions = transitions.map(transition => {
      const studentDetails = transition.students.find(
        s => s.studentId.toString() === studentId.toString()
      );
      
      return {
        id: transition._id,
        name: transition.name,
        description: transition.description,
        status: transition.status,
        scheduledDate: transition.scheduledDate,
        deadline: transition.deadline,
        studentStatus: studentDetails?.status || 'unknown',
        sourceBatch: transition.sourceBatches.find(
          b => b.batchId._id.toString() === studentDetails?.sourceBatchId?.toString()
        )?.batchId,
        destinationBatch: transition.destinationBatches.find(
          b => b.batchId._id.toString() === studentDetails?.destinationBatchId?.toString()
        )?.batchId,
        invitationSent: studentDetails?.invitationSent || false,
        invitationSentAt: studentDetails?.invitationSentAt,
        responseAt: studentDetails?.responseAt
      };
    });
    
    res.status(200).json({ transitions: formattedTransitions });
  } catch (error) {
    logger.error('Error fetching student transitions:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export {
    getAllBatchTransitions,
    getBatchTransitionById,
    createBatchTransition,
    updateBatchTransition,
    updateBatchTransitionStatus,
    getTransitionStudents,
    updateTransitionStudents,
    sendInvitations,
    getInvitations,
    getStudentInvitations,
    respondToInvitation,
    transitionBatch,
    getInvitationById,
    resendInvitation,
    getStudentTransitions
}