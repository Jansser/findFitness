import React from 'react';
import { 
  Comment,
  Header
} from 'semantic-ui-react';
import { formatDate } from '../../utils/helpers';
import StarRatingComponent from 'react-star-rating-component';

const ReviewList = props => {
  const { reviews } = props;

  return (
    <Comment.Group id='reviews-list'>
      <Header as='h3' dividing>Avaliações</Header>
      
      {reviews.map(review => (
        <Comment key={review.id}>
          <Comment.Content>
            <Comment.Author as='a'>{review.user.firstName}</Comment.Author>
            <Comment.Metadata>
              <div>{formatDate(review.createdAt)}</div>
            </Comment.Metadata>
            <Comment.Text>
              <div>
                <StarRatingComponent 
                  name="rate-average" 
                  editing={false}
                  value={review.rate}
                  />
              </div>
              {review.content}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
}

export default ReviewList;
