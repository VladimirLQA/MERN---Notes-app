import { Router} from "express";
import { NoteController } from "../controllers/noteController";

const noteRoutes = Router();

noteRoutes.get('/', NoteController.getAllNotes);
noteRoutes.post('/', NoteController.createNote);
noteRoutes.put('/:id', NoteController.updateNote);
noteRoutes.delete('/:id', NoteController.deleteNote);

export default noteRoutes;