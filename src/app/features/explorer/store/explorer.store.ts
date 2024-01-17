import { MessageModel } from "src/app/shared/models/message-model";
import { ProjectModel } from "../models/project-model";

export const EXPLORER_ACTION_KEY = '[EXPLORER]';

export interface ExplorerState {
    projects: ProjectModel[],
    messages: MessageModel[]
}

export const initialExplorerState: ExplorerState = {
    projects: <ProjectModel[]>[],
    messages: <MessageModel[]>[]
}