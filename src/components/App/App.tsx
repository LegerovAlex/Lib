import { useState } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import '../main.scss';
import TextField from '../TextField/TextField';
import { Button } from '../Button/Button';
import Switch from '../Switch/Switch';

export const App = () => {
  const [state, setState] = useState(false);
  const [email, setEmail] = useState('');
  const [value, setValue] = useState(false);

  return (
    <>
      <div>
        <CheckBox checked={state} onChange={(e) => setState(e.target.checked)} label="LOl" />
        <p>Checkbox is {state ? 'checked' : 'unchecked'}</p>
      </div>
      <div>
        <TextField
          placeholder="Enter Email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{email}</p>
      </div>
      <div>
        <Button
          onClick={() => {
            console.log('asd');
          }}
          size="large"
          variant="outlined"
        >
          BIGGGGG
        </Button>
      </div>
      <div>
        <Switch checked={value} onChange={setValue} />
      </div>
    </>
  );
};
