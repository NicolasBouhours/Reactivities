import React from 'react';
import { IActivity } from '../../../app/models/activity';
import { Card, Button, Image } from 'semantic-ui-react';

interface IProps {
  activity: IActivity;
  setSelectedActivity: (selectedActivity: IActivity | null) => void;
  setEditMode: (editMode: boolean) => void;
}

export const ActivityDetails: React.FC<IProps> = ({
  activity,
  setSelectedActivity,
  setEditMode
}) => {
  const { title, date, description, category } = activity;

  return (
    <Card fluid>
      <Image src={`./assets/categoryImages/${category}.jpg`} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span>{date}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color='blue'
            content='Edit'
            onClick={() => setEditMode(true)}
          ></Button>
          <Button
            onClick={() => setSelectedActivity(null)}
            basic
            color='grey'
            content='Cancel'
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
