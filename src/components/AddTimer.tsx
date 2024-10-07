import {useRef} from 'react';

import Button from './UI/Button.tsx';
import Form, {FormHandle} from './UI/Form.tsx';
import Input from './UI/Input.tsx';
import {useTimersContext} from "../store/timers-context.tsx";

const AddTimer = () => {
    const form = useRef<FormHandle>(null);
    const {addTimer} = useTimersContext();
    const saveTimerHandler = (data: unknown) => {
        const extractedData = data as { name: string; duration: string };
        addTimer({name: extractedData.name, duration: +extractedData.duration});
        form.current?.clear();
    }

    return (
        <Form ref={form} onSave={saveTimerHandler} id="add-timer">
            <Input type="text" label="Name" id="name"/>
            <Input type="number" label="Duration" id="duration"/>
            <p>
                <Button>Add Timer</Button>
            </p>
        </Form>
    );
}

export default AddTimer;
