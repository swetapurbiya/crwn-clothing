import React from 'react';

import {Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading : true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

/*     this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    }); */
 
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false});
    }); 

/*     fetch('https://firestore.googleapis.com/v1/projects/test-c2df9/databases/(default)/documents/collections')
      .then(response => response.json())
      .then(collections => console.log(collections)); */
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return(
      <div className='shop-page'> 
        {/* <Route exact path={`${match.path}`} component={CollectionOverview} /> */}
        <Route 
          exact 
          path={`${match.path}`} 
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
            )} 
        />
        <Route 
          path={`${match.path}/:categoryId`} 
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )} 
        />
        {/* <Route path={`${match.path}/:categoryId`} component={CollectionPage} /> */}
      </div>
    );
  }
} 

const mapDispatchToProps = dispatch => ({
  updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);