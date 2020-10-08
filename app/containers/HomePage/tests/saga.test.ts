/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import ActionTypes from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import phones, { getPhones } from '../saga';
const username = 'mxstbr';

describe('getPhones Saga', () => {
  let getPhonesGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getPhonesGenerator = getPhones();

    const selectDescriptor = getPhonesGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getPhonesGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First repo',
      },
      {
        name: 'Second repo',
      },
    ] as any[];
    const putDescriptor = getPhonesGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getPhonesGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('phonesSaga Saga', () => {
  const phonesSaga = phones();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = phonesSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ActionTypes.LOAD_REPOS, getPhones),
    );
  });
});
