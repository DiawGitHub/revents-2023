import { ChangeEvent, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { createId } from "@paralleldrive/cuid2";

type Props = {
    setFormOpen: (value: boolean) => void;
    addEvent: (event: AppEvent) => void;
    selectedEvent: AppEvent | null
    updateEvent: (event: AppEvent) => void;
}

export default function EventForm({ setFormOpen, addEvent, selectedEvent, updateEvent }: Props) {
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const [values, setValues] = useState(initialValues);

    function onSubmit() {
        selectedEvent 
            ? updateEvent({...selectedEvent, ...values})
            : addEvent({...values, id: createId(), hostedBy: 'bob', attendees: [], hostPhotoURL: ''})
        setFormOpen(false);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Update event' : 'Create Event'} />
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Event title"
                        name='title'
                        value={values.title}
                        onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Category"
                        name='category'
                        value={values.category}
                        onChange={e => handleInputChange(e)} />

                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        placeholder="Description"
                        name='description'
                        value={values.description}
                        onChange={e => handleInputChange(e)} />

                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="City"
                        name='city'
                        value={values.city}
                        onChange={e => handleInputChange(e)} />

                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Venue"
                        name='venue'
                        value={values.venue}
                        onChange={e => handleInputChange(e)} />

                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder="Date"
                        name='date'
                        value={values.date}
                        onChange={e => handleInputChange(e)} />

                </Form.Field>

                <Button type="submit" floated="right" positive content='Submit' />
                <Button type="button" onClick={() => setFormOpen(false)} floated="right" content='Cancel' />
            </Form>
        </Segment>
    )
}