import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
  setEditMode,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          value={activity.title}
          onChange={handleInputChange}
          name='title'
          placeholder='Title'
        />
        <Form.TextArea
          value={activity.description}
          onChange={handleInputChange}
          rows={2}
          name='description'
          placeholder='Description'
        />
        <Form.Input
          value={activity.category}
          onChange={handleInputChange}
          name='category'
          placeholder='Category'
        />
        <Form.Input
          value={activity.date}
          onChange={handleInputChange}
          type='datetime-local'
          name='date'
          placeholder='Date'
        />
        <Form.Input
          value={activity.city}
          onChange={handleInputChange}
          name='city'
          placeholder='City'
        />
        <Form.Input
          value={activity.venue}
          onChange={handleInputChange}
          name='venue'
          placeholder='Venue'
        />
        <Button
          floated='right'
          positive
          type='submit'
          content='Submit'
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='submit'
          content='Cancel'
        ></Button>
      </Form>
    </Segment>
  );
};
