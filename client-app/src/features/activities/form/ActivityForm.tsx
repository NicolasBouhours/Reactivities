import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

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
      createActivity(newActivity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
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
              loading={submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            ></Button>
            <Button
              onClick={() => history.push('/activities')}
              floated='right'
              type='submit'
              content='Cancel'
            ></Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default ActivityForm;
