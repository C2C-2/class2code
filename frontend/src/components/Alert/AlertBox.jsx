import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import './AlertBox.css'

const AlertBox = ({ text }) => {
  const icon = <IconInfoCircle />;
  return (
    <Alert id="Alert" variant="filled" color="red" title="Alert title" icon={icon}>
      {text}
    </Alert>
  );
};

export default AlertBox;
