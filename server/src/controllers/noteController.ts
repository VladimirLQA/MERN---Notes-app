import { Request, Response } from "express";
import Note from "../models/note";

export class NoteController {
    static async getAllNotes(req: Request, res: Response) {
        try {
            const notes = await Note.find();
            res.status(200).send({ message: 'All notes fetched successfully', notes });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }
    static async createNote(req: Request, res: Response) {
        try {
            const { title, content, category, isPinned } = req.body;
            const note = new Note({ title, content, category, isPinned });
            await note.save();

            res.status(200).send({ message: 'Note created successfully', note });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong', error }); 
        }
    }
    static async updateNote(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            // const note = await Note.findByIdAndUpdate(id, { title, content });
            // if (!note) {
            //     return res.status(404).json({ message: 'Note not found' });
            // }
            res.status(200).send({ message: 'Note updated successfully' });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong' }); 
        }
    }
    static async deleteNote(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // const note = await Note.findByIdAndDelete(id);
            // if (!note) {
            //     return res.status(404).json({ message: 'Note not found' });
            // }
            res.status(200).send({ message: 'Note deleted successfully' });
        } catch (error) {
           res.status(500).json({ message: 'Something went wrong' }); 
        }
    }
}
