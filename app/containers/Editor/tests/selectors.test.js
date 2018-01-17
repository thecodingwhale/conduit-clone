import { fromJS } from 'immutable';
import {
  selectEditorDomain,
  makeSelectFetching,
  makeSelectSuccess,
  makeSelectSlug,
} from '../selectors';

describe('selectEditorDomain', () => {
  it('should match the expected default selectors', () => {
    const editorState = fromJS({
      fetching: false,
      success: false,
      slug: '',
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectEditorDomain(mockedState)).toEqual(editorState);
  });
});

describe('makeSelectFetching', () => {
  const selectFetching = makeSelectFetching();
  it('should match fetching from the selectors', () => {
    const editorState = fromJS({
      fetching: false,
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectFetching(mockedState)).toEqual(false);
  });
});

describe('makeSelectSuccess', () => {
  const selectSuccess = makeSelectSuccess();
  it('should match success from the selectors', () => {
    const editorState = fromJS({
      success: false,
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectSuccess(mockedState)).toEqual(false);
  });
});

describe('makeSelectSlug', () => {
  const selectSlug = makeSelectSlug();
  it('should match slug from the selectors', () => {
    const editorState = fromJS({
      slug: false,
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectSlug(mockedState)).toEqual(false);
  });
});
