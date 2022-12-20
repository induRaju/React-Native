// Root saga function which invokes all saga functions here

import { loginSaga } from './LoginSaga';
import { forgetPwdSaga } from './ForgetPwdSaga';
import {all} from 'redux-saga/effects';
import { registrationSaga } from './RegistrationSaga';
import { addListingSaga } from './AddListingSaga';
import { listingSaga } from './ListingSaga';
import {updateListingSaga} from './UpdateListingSaga'
import {deleteListingSaga} from './DeleteListingSaga'
import { HomeSaga } from './HomeSaga';
import { HomeListingSaga } from './HomeListingSaga';

import { likeProfile } from './ProfileLikeSaga';
import { likeListing } from './ListingLikeSaga';
import { logoutSaga } from './LogoutSaga';
import {IndividualChatSaga} from  './IndividualChatSaga'
import { profileEditSaga } from './ProfileEditSaga';
import { profileViewSaga } from './ProfileViewSaga';
import {RequestSaga} from './RequestSaga';
import { ProfileModalSaga } from './ProfileModalSaga';
import { ChatListSaga } from './ChatListSaga';
import { preferenceEditSaga } from './PreferenceEditSaga';
import { friendsViewSaga } from './FriendsSaga';
import { DeactivateSaga } from './DeactivateSaga';
import {ConfirmRoommateSaga} from './ConfirmRoommateSaga'
import { confirmedUsersSaga } from './ConfirmedUsersSaga';

export default function *watchAll() {
    yield all([
        ...loginSaga,
        ...forgetPwdSaga,
        ...registrationSaga,
        ...addListingSaga,
        ...listingSaga,
        ...updateListingSaga,
        ...deleteListingSaga,
        ...HomeSaga,
        ...HomeListingSaga,
        ...logoutSaga,
        ...likeProfile,
        ...IndividualChatSaga,
        ...profileEditSaga,
        ...likeListing,
        ...profileViewSaga,
        ...RequestSaga,
        ...ProfileModalSaga,
        ...ChatListSaga,
        ...preferenceEditSaga,
        ...friendsViewSaga,
        ...DeactivateSaga,
        ...ConfirmRoommateSaga,
        ...confirmedUsersSaga,
    ]);
}