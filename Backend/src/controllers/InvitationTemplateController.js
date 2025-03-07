import { InvitationTemplate } from '../models/InvitationTemplate.js';
import logger from '../utils/logger.js';

// Get all invitation templates
const getAllTemplates = async (req, res) => {
  try {
    const { type } = req.query;
    const collegeId = req.user.collegeId;
    
    // Build query to get college-specific and global templates
    const query = {
      $or: [
        { collegeId },
        { collegeId: null } // Global templates
      ]
    };
    
    if (type) {
      query.type = type;
    }
    
    const templates = await InvitationTemplate.find(query)
      .sort({ isDefault: -1, createdAt: -1 })
      .populate('createdBy', 'name');
    
    res.status(200).json({ templates });
  } catch (error) {
    logger.error('Error fetching invitation templates:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get template by ID
const getTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;
    const collegeId = req.user.collegeId;
    
    const template = await InvitationTemplate.findOne({
      _id: templateId,
      $or: [
        { collegeId },
        { collegeId: null } // Global templates
      ]
    }).populate('createdBy', 'name');
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    res.status(200).json({ template });
  } catch (error) {
    logger.error('Error fetching invitation template:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Create new template
const createTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      subject,
      body,
      variables,
      type,
      isDefault
    } = req.body;
    
    const collegeId = req.user.collegeId;
    
    // If setting as default, unset any existing default templates of the same type
    if (isDefault) {
      await InvitationTemplate.updateMany(
        { collegeId, type, isDefault: true },
        { $set: { isDefault: false } }
      );
    }
    
    const template = new InvitationTemplate({
      name,
      description,
      subject,
      body,
      variables,
      type,
      isDefault: isDefault || false,
      createdBy: req.user._id,
      collegeId
    });
    
    await template.save();
    
    res.status(201).json({
      message: 'Template created successfully',
      template
    });
  } catch (error) {
    logger.error('Error creating invitation template:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update template
const updateTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const {
      name,
      description,
      subject,
      body,
      variables,
      type,
      isDefault
    } = req.body;
    
    const collegeId = req.user.collegeId;
    
    // Find template
    const template = await InvitationTemplate.findOne({
      _id: templateId,
      collegeId
    });
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found or you do not have permission to edit it' });
    }
    
    // If setting as default, unset any existing default templates of the same type
    if (isDefault && !template.isDefault) {
      await InvitationTemplate.updateMany(
        { collegeId, type, isDefault: true },
        { $set: { isDefault: false } }
      );
    }
    
    // Update fields
    if (name) template.name = name;
    if (description !== undefined) template.description = description;
    if (subject) template.subject = subject;
    if (body) template.body = body;
    if (variables) template.variables = variables;
    if (type) template.type = type;
    if (isDefault !== undefined) template.isDefault = isDefault;
    
    await template.save();
    
    res.status(200).json({
      message: 'Template updated successfully',
      template
    });
  } catch (error) {
    logger.error('Error updating invitation template:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete template
const deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const collegeId = req.user.collegeId;
    
    // Find template
    const template = await InvitationTemplate.findOne({
      _id: templateId,
      collegeId
    });
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found or you do not have permission to delete it' });
    }
    
    // Check if it's a default template
    if (template.isDefault) {
      return res.status(400).json({ message: 'Cannot delete a default template. Set another template as default first.' });
    }
    
    await template.deleteOne();
    
    res.status(200).json({
      message: 'Template deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting invitation template:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Create default templates for a college
const createDefaultTemplates = async (collegeId, createdBy) => {
  try {
    // Check if default templates already exist
    const existingTemplates = await InvitationTemplate.find({
      collegeId,
      isDefault: true
    });
    
    if (existingTemplates.length > 0) {
      return; // Default templates already exist
    }
    
    // Create semester progression template
    const semesterTemplate = new InvitationTemplate({
      name: 'Semester Progression',
      description: 'Default template for semester progression',
      subject: '{{college.name}} - Invitation to Join Semester {{destination.semester}}',
      body: `
Dear {{student.name}},

We are pleased to inform you that you have successfully completed Semester {{source.semester}} and are now eligible to progress to Semester {{destination.semester}} in the {{department.name}} department.

**Transition Details:**
- Current Batch: {{source.batch}} (Semester {{source.semester}})
- New Batch: {{destination.batch}} (Semester {{destination.semester}})
- Transition Date: {{transition.date}}

**Important Information:**
- Classes Begin: {{semester.startDate}}
- Fee Payment Deadline: {{fee.deadline}}

To confirm your enrollment in the new semester, please click the button below:

[ACCEPT INVITATION]

If you have any questions or concerns, please contact the department office.

Best regards,
{{department.name}} Department
{{college.name}}

Note: This invitation will expire on {{invitation.expiryDate}}.
      `,
      variables: [
        'student.name', 'source.semester', 'destination.semester', 
        'department.name', 'source.batch', 'destination.batch',
        'transition.date', 'semester.startDate', 'fee.deadline',
        'invitation.expiryDate', 'college.name'
      ],
      type: 'semester-progression',
      isDefault: true,
      createdBy,
      collegeId
    });
    
    // Create year progression template
    const yearTemplate = new InvitationTemplate({
      name: 'Year Progression',
      description: 'Default template for academic year progression',
      subject: '{{college.name}} - Invitation to Join {{destination.year}} Year',
      body: `
Dear {{student.name}},

Congratulations on successfully completing your {{source.year}} year! We are pleased to invite you to join the {{destination.year}} year in the {{department.name}} department.

**Transition Details:**
- Current Year: {{source.year}} Year
- New Year: {{destination.year}} Year
- Transition Date: {{transition.date}}

**Important Information:**
- Academic Year Begins: {{year.startDate}}
- Fee Payment Deadline: {{fee.deadline}}
- Required Documents: {{documents.list}}

To confirm your enrollment for the new academic year, please click the button below:

[ACCEPT INVITATION]

If you have any questions or concerns, please contact the department office.

Best regards,
{{department.name}} Department
{{college.name}}

Note: This invitation will expire on {{invitation.expiryDate}}.
      `,
      variables: [
        'student.name', 'source.year', 'destination.year', 
        'department.name', 'transition.date', 'year.startDate', 
        'fee.deadline', 'documents.list', 'invitation.expiryDate',
        'college.name'
      ],
      type: 'year-progression',
      isDefault: true,
      createdBy,
      collegeId
    });
    
    // Create custom template
    const customTemplate = new InvitationTemplate({
      name: 'Custom Batch Transfer',
      description: 'Default template for custom batch transfers',
      subject: '{{college.name}} - Important: Batch Transfer Notification',
      body: `
Dear {{student.name}},

This is to inform you that you are being transferred to a new batch as part of our academic reorganization.

**Transfer Details:**
- Current Batch: {{source.batch}}
- New Batch: {{destination.batch}}
- Effective Date: {{transition.date}}

**Reason for Transfer:**
{{transition.reason}}

**Next Steps:**
Please review the details and confirm your acknowledgment by clicking the button below:

[ACCEPT TRANSFER]

If you have any concerns about this transfer, please contact your department office before {{invitation.expiryDate}}.

Best regards,
Administration
{{college.name}}
      `,
      variables: [
        'student.name', 'source.batch', 'destination.batch', 
        'transition.date', 'transition.reason', 'invitation.expiryDate',
        'college.name'
      ],
      type: 'custom',
      isDefault: true,
      createdBy,
      collegeId
    });
    
    // Save all templates
    await Promise.all([
      semesterTemplate.save(),
      yearTemplate.save(),
      customTemplate.save()
    ]);
    
    logger.info(`Created default invitation templates for college ${collegeId}`);
    
  } catch (error) {
    logger.error('Error creating default templates:', error);
    throw error;
  }
};

// Get HOD-specific templates
const getHODTemplates = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;
    const departmentId = req.user.departmentId;
    
    // Build query to get department-specific, college-specific and global templates
    const query = {
      $or: [
        { collegeId, departmentId },
        { collegeId, departmentId: null },
        { collegeId: null } // Global templates
      ]
    };
    
    const templates = await InvitationTemplate.find(query)
      .sort({ isDefault: -1, createdAt: -1 })
      .populate('createdBy', 'name');
    
    res.status(200).json({ templates });
  } catch (error) {
    logger.error('Error fetching HOD templates:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  createDefaultTemplates,
  getHODTemplates
};