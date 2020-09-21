import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import  CollectionOverview from '../collections-overview/collections-overview.component';

const mapToStateProps = createStructuredSelector({
    isLoading : selectIsCollectionFetching
});

const CollectionOverviewContainer = compose(
    connect(mapToStateProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;