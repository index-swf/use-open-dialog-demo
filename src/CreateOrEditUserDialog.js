import React, { useContext } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { ModalContext } from "./useOpenModal";
import Demo from "./demo";

const CreateOrEditUserDialog = ({ id }) => {
  const [successCallback, errorCallback] = useContext(ModalContext);
  const onSuccess = () => {
    successCallback({ username: "张三" });
  };
  const onCancel = () => {
    errorCallback(new Error("用户取消"));
  };

  return (
    <>
      <DialogTitle>{id ? "编辑用户信息" : "创建用户"}</DialogTitle>
      <DialogContent>
        <DialogContentText>用户信息编辑{Math.random()}</DialogContentText>
        <Demo />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSuccess} variant="outlined" color="primary">
          确定
        </Button>
        <Button onClick={onCancel} variant="outlined" color="primary" autoFocus>
          取消
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateOrEditUserDialog;
