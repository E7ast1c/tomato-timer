import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { changeErrorModal } from "../../store/actions/modalActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      borderRadius: 7,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const ErrorModal = () => {
  const classes = useStyles();
  const { errorModal } = useTypedSelector((state) => state.openModal);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    dispatch(changeErrorModal(true));
  };

  const handleClose = () => {
    dispatch(changeErrorModal(false));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={errorModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={errorModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Произошла ошибка</h2>
            <p id="transition-modal-description">
              {" "}
              Попрубуйте еще раз или напишите нам asdasd@assdas.ru
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ErrorModal;
