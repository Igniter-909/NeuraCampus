import { Branch } from '../models/Branch.js';
import { Batch } from '../models/Batch.js';

export const createBranch = async (req, res) => {
    try {
        const { name, code, totalSemesters } = req.body;
        const collegeId = req.user.college;

        const branch = new Branch({
            name,
            code,
            collegeId,
            hodId: req.user._id,
            totalSemesters
        });

        await branch.save();

        res.status(201).json({
            message: 'Branch created successfully',
            branch
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const createBatch = async (req, res) => {
    try {
        const { branchId, year, section, capacity, currentSemester } = req.body;

        // Verify HOD has access to this branch
        const branch = await Branch.findOne({
            _id: branchId,
            hodId: req.user._id
        });

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found or unauthorized' });
        }

        const batch = new Batch({
            branchId,
            year,
            section,
            capacity,
            currentSemester
        });

        await batch.save();

        // Add batch to branch
        branch.batches.push(batch._id);
        await branch.save();

        res.status(201).json({
            message: 'Batch created successfully',
            batch
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getBranchDetails = async (req, res) => {
    try {
        const branch = await Branch.findOne({
            _id: req.params.branchId,
            hodId: req.user._id
        }).populate('batches');

        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 