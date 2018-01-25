import { fromJS } from 'immutable';
import {
  selectEditorDomain,
  makeSelectFetching,
  makeSelectSuccess,
  makeSelectSlug,
  makeSelectError,
  makeSelectArticle,
  makeSelectUpdating,
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

describe('makeSelectError', () => {
  const selectError = makeSelectError();
  it('should match error from the selectors', () => {
    const editorState = fromJS({
      error: false,
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectError(mockedState)).toEqual(false);
  });
});

describe('makeSelectArticle', () => {
  const selectArticle = makeSelectArticle();
  it('should match article from the selectors', () => {
    const expectedState = {
      foo: 'bar',
    };
    const editorState = fromJS({
      article: expectedState,
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectArticle(mockedState)).toEqual(fromJS(expectedState));
  });
});

describe('makeSelectUpdating', () => {
  const selectUpdating = makeSelectUpdating();
  it('should match updating from the selectors', () => {
    const expectedState = false;
    const editorState = fromJS({
      updating: expectedState,
    });
    const mockedState = fromJS({
      editor: editorState,
    });
    expect(selectUpdating(mockedState)).toEqual(fromJS(expectedState));
  });
});
