import * as React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";

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
  // const { errorModal } = useSelector((state) => state.openModal);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // dispatch(changeErrorModal(true));
  };

  const handleClose = () => {
    // dispatch(changeErrorModal(false));
  };

  // return (
    // <div>
    //   <Modal
    //     aria-labelledby="transition-modal-title"
    //     aria-describedby="transition-modal-description"
    //     className={classes.modal}
    //     // open={errorModal}
    //     onClose={handleClose}
    //     closeAfterTransition
    //     BackdropComponent={Backdrop}
    //     BackdropProps={{
    //       timeout: 500,
    //     }}
    //   >
    //     {/*<Fade in={errorModal}>*/}
    //       <div className={classes.paper}>
    //         <h2 id="transition-modal-title">Произошла ошибка</h2>
    //         <p id="transition-modal-description">
    //           {" "}
    //           Попрубуйте еще раз или напишите нам asdasd@assdas.ru
    //         </p>
    //       </div>
    //     {/*</Fade>*/}
    //   </Modal>
    // </div>
  // );
};

export default ErrorModal;
