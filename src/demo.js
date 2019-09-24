import React from "react";
import { Button } from "@material-ui/core";
import useOpenModal from "./useOpenModal";
import CreateOrEditUserDialog from "./CreateOrEditUserDialog";

const Demo = () => {
  const openModal = useOpenModal();
  const handleClick = () =>
    openModal(<CreateOrEditUserDialog id={123} />, {
      disableBackdropClick: true
    }).then(
      ({ username }) => {
        console.log("保存成功", username);
      },
      error => {
        console.error("保存失败", error.message);
      }
    );

  return (
    <>
      <Button variant="outlined" onClick={handleClick} color="primary">
        Open Modal
      </Button>
    </>
  );
};

export default Demo;
