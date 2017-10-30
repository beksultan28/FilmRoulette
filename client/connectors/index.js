import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import {
  searchFilms,
  updateQuery,
  updateSearchBy,
  updateSortBy,
  getFilmById,
  sortFilms,
  getRecommendations,
} from '../actions';

import SearchFormComponent from '../components/search-form/index.jsx';
import ResultsListComponent from '../components/results-list/index.jsx';
import DetailComponent from '../components/detail/index.jsx';


// Connecting SearchFormComponent with redux, redux-form and withRouter
const mapSearchFormStates = state => ({
  searchResults: state.searchResults,
  sortBy: state.sortBy,
  searchBy: state.searchBy,
});

const SearchFormRedux = reduxForm({
  form: 'search',
  initialValues: {
    searchQuery: '',
  },
  destroyOnUnmount: false,
})(SearchFormComponent);

export const ConnectedSearchForm = withRouter(
  connect(
    mapSearchFormStates,
    { searchFilms, updateQuery, updateSearchBy },
  )(SearchFormRedux),
);
// Connecting SearchFormComponent with redux, redux-form and withRouter


// Connecting ResultsListComponent with redux
const mapResultsListStates = state => ({
  searchResults: state.searchResults,
  sortBy: state.sortBy,
  searchBy: state.searchBy,
  detailItem: state.detailItem,
});

export const ConnectedResultsList = connect(
  mapResultsListStates,
  { searchFilms, sortFilms, updateSortBy },
)(ResultsListComponent);
// Connecting ResultsListComponent with redux


// Connecting DetailComponent with redux and withRouter
const mapDetailStates = state => ({
  searchResults: state.searchResults,
  detailItem: state.detailItem,
});

export const ConnectedDetail = withRouter(
  connect(
    mapDetailStates,
    { getRecommendations, getFilmById, updateSearchBy },
  )(DetailComponent),
);
// Connecting DetailComponent with redux and withRouter
