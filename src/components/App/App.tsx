import { useState } from 'react';
import { Button } from '../Button/Button';
import TextField from '../TextField/TextField';
import CheckBox from '../CheckBox/CheckBox';
import Switch from '../Switch/Switch';
import { Modal } from '../Modal/Modal';
import { Select } from '../Select/Select';

const options = [
  { id: 1, value: 'apple', label: 'Apple ' },
  { id: 2, value: 'banana', label: 'Banana ' },
  { id: 3, value: 'orange', label: 'Orange ' },
  { id: 4, value: 'grapesssssssssss', label: 'Grape ' },
  { id: 5, value: 'grapesssssssssss', label: 'Grape ' },
  { id: 6, value: 'grapesssssssssss', label: 'Grape ' },
];

export const App = () => {
  const [email, setEmail] = useState('');
  const [checked, setCheked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('');

  return (
    <div className="container">
      <div>
        <Button size="large" variant="outlined">
          Click me
        </Button>
      </div>
      <div>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          helperText="wrong email"
          label="Email"
        />
        <div>{email}</div>
      </div>
      <div>
        <CheckBox
          label="IF u agree pls "
          required
          checked={checked}
          onChange={(e) => setCheked(e.target.checked)}
        />
      </div>
      <div>
        <Switch checked={switched} onChange={(e) => setSwitched(e.target.checked)} />
      </div>
      <div>
        <Button variant="text" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal IsOpen={open} onClose={() => setOpen(false)}>
          Are u sure?
        </Modal>
      </div>
      <div>
        <Select
          options={options}
          placeholder="Select you Item"
          label="Select"
          value={state}
          onChange={(value) => setState(value)}
        />
      </div>
    </div>
  );
};
