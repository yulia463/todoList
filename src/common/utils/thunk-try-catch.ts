import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ResponseType } from "common/types";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>,
  logic: Function,
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  // dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
  // finally {
  //   // dispatch(appActions.setAppStatus({ status: "idle" }));
  // }
};
