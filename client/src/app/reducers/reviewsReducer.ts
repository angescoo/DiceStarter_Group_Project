import {RootState} from '../store';
import {ReviewState} from '../../types';
import {
  SEND_REVIEW_BEGIN,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  GET_REVIEWS_BEGIN,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  DELETE_REVIEWS_BEGIN,
  DELETE_REVIEWS_SUCCESS,
  DELETE_REVIEWS_FAILURE,
  CHANGE_REVIEWS_BEGIN,
  CHANGE_REVIEWS_SUCCESS,
  CHANGE_REVIEWS_FAILURE,
  SET_REVIEWS,
} from '../constants/constants';

const initialState: ReviewState = {
  reviewsResponse: null,
  body: '',
  postReviewStatus: 'idle',
  getReviewsStatus: 'idle',
  deleteReviewStatus: 'idle',
  changeReviewStatus: 'idle',
  id: '',
};

const reviewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEND_REVIEW_BEGIN:
      return {
        ...state,
        reviewStatus: 'loading',
      };
    case SEND_REVIEW_SUCCESS:
      return {
        ...state,
        reviewStatus: 'idle',
      };
    case SEND_REVIEW_FAILURE:
      return {
        ...state,
        reviewStatus: 'failed',
      };
    case GET_REVIEWS_BEGIN:
      return {
        ...state,
        reviewStatus: 'loading',
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewStatus: 'idle',
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        reviewStatus: 'failed',
      };
    case DELETE_REVIEWS_BEGIN:
      return {
        ...state,
        reviewStatus: 'loading',
      };
    case DELETE_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewStatus: 'idle',
      };
    case DELETE_REVIEWS_FAILURE:
      return {
        ...state,
        reviewStatus: 'failed',
      };
    case CHANGE_REVIEWS_BEGIN:
      return {
        ...state,
        reviewStatus: 'loading',
      };
    case CHANGE_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewStatus: 'idle',
      };
    case CHANGE_REVIEWS_FAILURE:
      return {
        ...state,
        reviewStatus: 'failed',
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviewsResponse: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;

export const postReviewStatus = (state: RootState) =>
  state.handleReview.postReviewStatus;
export const reviewsResponse = (state: RootState) =>
  state.handleReview.reviewsResponse;
