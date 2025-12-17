import React, { useEffect } from "react";
import ModalVariants from "common/components/Modal/ModalVariants/ModalVariants";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import { setModalType } from "app/appSlice";
import { modalTypeSelector } from "app/appSelectors";
import { Modal } from "antd";

const ModalWrapper = () => {
  const modal = useAppSelector(modalTypeSelector) !== "idle";
  const dispatch = useAppDispatch();

  let listener = (e: any) => {
    if (e.key === "Escape" && !modal) {
      closeHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const closeHandler = () => {
    dispatch(setModalType("idle"));
    document.removeEventListener("keydown", listener);
  };

  return (
    // <Portal>
    //   <div className={s.container} onClick={closeHandler} id={"modal"}>
    //     <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
    //       <ModalVariants />
    //     </div>
    //   </div>
    // </Portal>
    <Modal
      open={modal}
      centered
      destroyOnClose
      onCancel={closeHandler}
      footer={false}
      closeIcon={false}
      style={{ padding: "0" }}
    >
      <ModalVariants />
    </Modal>
  );
};

export default ModalWrapper;
