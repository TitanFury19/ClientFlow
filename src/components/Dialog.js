import {
  useTheme,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const DialogMessage = ({title, textContent, ...props}) => {
  return (
    <Dialog open={props.openModal} onClose={props.onclose}>
      <DialogTitle>{title}</DialogTitle>
      {textContent &&
        textContent.length > 0 &&
        textContent.map((a, index) => (
          <DialogContent>
            <DialogContentText>{a.value ? a.value : ""}</DialogContentText>
          </DialogContent>
        ))}
      <DialogActions>
        <Button onClick={props.cancel}>Cancel</Button>
        <Button onClick={props.onClick}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMessage;
