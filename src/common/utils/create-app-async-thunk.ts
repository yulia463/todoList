import { AppDispatch, AppRootStateType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "common/types";

/**
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
  data: ResponseType;
  showGlobalError: boolean;
};
