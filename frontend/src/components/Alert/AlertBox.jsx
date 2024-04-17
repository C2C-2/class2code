import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import './AlertBox.css'

const AlertBox = ({ text, color, title }) => {
  const icon = <IconInfoCircle />;
  return (
    <Alert id="Alert" variant="filled" color={color} title={title} icon={icon}>
      {text}
    </Alert>
  );
};

export default AlertBox;
