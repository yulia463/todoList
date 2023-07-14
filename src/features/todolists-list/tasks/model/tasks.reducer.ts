import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import { todolistsThunks } from "features/todolists-list/todolists/model/todolists.reducer";

import { createAppAsyncThunk } from "common/utils";
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums";
import { clearTasksAndTodolists } from "common/actions";
import { tasksApi } from "features/todolists-list/tasks/api/tasks.api";
import {
  AddTaskArgType,
  RemoveTaskArgType,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "features/todolists-list/tasks/api/tasks.api.types";

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId) => {
    const res = await tasksApi.getTasks(todolistId);
    const tasks = res.data.items;
    return { tasks, todolistId };
  },
);

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "tasks/addTask",
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.createTask(arg);
    if (res.data.resultCode === ResultCode.Success) {
      const task = res.data.data.item;
      return { task };
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false });
    }
  },
);

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  "tasks/updateTask",
  async (arg, { dispatch, rejectWithValue, getState }) => {
    const state = getState();
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found in the state" }));
      return rejectWithValue(null);
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel,
    };

    const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, apiModel);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(null);
    }
  },
);

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
  "tasks/removeTask",
  async (arg, { rejectWithValue }) => {
    const res = await tasksApi.deleteTask(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(null);
    }
  },
);

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
