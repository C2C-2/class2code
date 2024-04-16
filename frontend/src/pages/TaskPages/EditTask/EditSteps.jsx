import { useState } from 'react';
import { Modal, Button } from '@mantine/core';

function EditSteps({ isOpen, onClose, onSave, initialStep }) {
  const [step, setStep] = useState(initialStep);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setStep(value);
  };

  const handleSave = () => {
    onSave(step);
    onClose();
  };

  return (
    <Modal title="Edit Step" opened={isOpen} onClose={onClose}>
      <div>
        <input type="text" value={step} onChange={handleInputChange} />
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Modal>
  );
}

export default EditSteps;
