import { Request, Response } from "express";
import Note from "../models/note";

export class NoteController {
    static async getAllNotes(req: Request, res: Response) {
        // TODO: add pagination, sorting, filtering
        try {
            const notes = await Note.find().sort({ createdAt: -1 });

            res.status(200).send({ message: 'All notes fetched successfully', notes });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }

    static async getNoteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const note = await Note.findById(id);
            if (!note) res.status(404).json({ message: 'Note not found' });

            res.status(200).send({ message: 'Note fetched successfully', note });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }

    static async createNote(req: Request, res: Response) {
        try {
            const { title, content, labels = [], isPinned = false } = req.body;
            const note = new Note({ title, content, labels, isPinned });
            await note.save();

            res.status(201).send({ message: 'Note created successfully', note });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }

    static async updateNote(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content, labels, isPinned } = req.body;
            const note = await Note.findByIdAndUpdate(id, { title, content, labels, isPinned }, { new: true });

            if (!note) res.status(404).json({ message: 'Note not found' });

            res.status(200).send({ message: 'Note updated successfully', note });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }

    static async deleteNote(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const note = await Note.findByIdAndDelete(id);

            if (!note) res.status(404).json({ message: 'Note not found' });

            res.status(200).send({ message: 'Note deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }
}
