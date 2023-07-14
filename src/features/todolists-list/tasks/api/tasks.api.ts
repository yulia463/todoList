import { instance } from "common/api";
import { ResponseType } from "common/types";
import {
  AddTaskArgType,
  GetTasksResponse,
  RemoveTaskArgType,
  TaskType,
  UpdateTaskModelType,
} from "features/todolists-list/tasks/api/tasks.api.types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<
      ResponseType<{
        item: TaskType;
      }>
    >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
