import {
  ForwardedRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

export type NotificationModalHandler = {
  handleOpen: () => void;
  handleClose: () => void;
};

export type ReceivedProps = PropsWithChildren<{
  innerRef?: ForwardedRef<NotificationModalHandler>;
}>;

const useSettingsModal = (props: ReceivedProps) => {
  const { innerRef: ref } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const openChangeHandler = (open: boolean) => {
    setOpen(open);
  };

  useImperativeHandle(
    ref,
    () => ({
      handleOpen,
      handleClose,
    }),
    [handleClose, handleOpen],
  );

  return {
    open,
    openChangeHandler,
    ...props,
  };
};

export type Props = ReturnType<typeof useSettingsModal>;

export default useSettingsModal;
