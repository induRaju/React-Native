import * as actions from './actionTypes';

export const UpdateListingRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.UPDATELISTING_REQUEST,
    payload: {
        Authorization:data.Authorization,
        title:data.title,
        address_for_listing:data.address_for_listing,
        place_id: data.place_id,
        monthly_rent: data.monthly_rent,
        address_lat: data.address_lat,
        address_lng: data.address_lng,
        about_listing: data.about_listing,
        img_0: data.img_0,
        img_1: data.img_1,
        img_2: data.img_2,
        listing_id: data.listing_id,
        number_of_bedrooms: data.number_of_bedrooms,
        lease_duration: data.lease_duration
    }
  }
}

export const UpdateListingSuccess = (data) => {
  return {
    type: actions.UPDATELISTING_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const UpdateListingFailure = (data) => {
  return {
    type: actions.UPDATELISTING_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

export const ListingsMediaUpdate = (data) => {
  //console.log('actions-data>>>>>Media', data);
    return {
    type: actions.LISTINGS_MEDIA_UPDATE,
    payload: {
        data: data,
        apiStatus: 'success'
    }
    }
}

export const ListingsMediaSuccess = (data) => {
      //console.log('actions-data-success>>Media', data);
      return {
        type: actions.LISTINGS_MEDIA_SUCCESS,
        payload: {
        data: data,
          apiStatus: 'success'
        }
      }
    }
    
export const ListingsMediaFailure = (data) => {
    //console.log('actions-data-failure>>Media', data);
    return {
    type: actions.LISTINGS_MEDIA_FAILURE,
    payload: {
        data: data,
        apiStatus: 'error'
    }
    }
}

export const ListingsMediaDelete = (data) => {
  //console.log('actions-data>>>>>Media delete', data);
    return {
    type: actions.LISTINGS_MEDIA_DELETE,
    payload: {
        data: data,
        apiStatus: 'success'
    }
    }
}

export const ListingsMediaDeleteSuccess = (data) => {
      //console.log('actions-data-success>>Media delete', data);
      return {
        type: actions.LISTINGS_MEDIA_DELETE_SUCCESS,
        payload: {
        data: data,
          apiStatus: 'success'
        }
      }
    }
    
export const ListingsMediaDeleteFailure = (data) => {
    //console.log('actions-data-failure>>Media delete', data);
    return {
    type: actions.LISTINGS_MEDIA_DELETE_FAILURE,
    payload: {
        data: data,
        apiStatus: 'error'
    }
    }
}
