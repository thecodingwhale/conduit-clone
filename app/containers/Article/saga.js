import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_ARTICLE,
  GET_ARTICLE_SLUG,
  DELETE_ARTICLE,
  POST_COMMENT,
} from 'containers/Article/constants';
import {
  getArticleSlug,
  articleLoaded,
  articleLoadingError,
  commentsLoaded,
  commentsLoadingError,
  deletingArticle,
  deleteArticleCompleted,
  deleteArticleError,
  postingComment,
  postCommentCompleted,
  postCommentError,
} from 'containers/Article/actions';

import request from 'utils/request';
import api from '../../utils/api';

const API_DOMAIN = 'https://conduit.productionready.io/api';
const ARTICLE_ENDPOINT = `${API_DOMAIN}/articles`;

export function* getArticle(param) {
  const { slug } = param;
  const endpoint = `${ARTICLE_ENDPOINT}/${slug}`;

  try {
    const payload = yield call(request, endpoint);
    yield put(getArticleSlug(slug));
    yield put(articleLoaded(payload.article));
  } catch (err) {
    yield put(articleLoadingError());
  }
}

export function* getComments(param) {
  const { slug } = param;
  const endpoint = `${ARTICLE_ENDPOINT}/${slug}/comments`;

  try {
    const payload = yield call(request, endpoint);
    yield put(commentsLoaded(payload.comments));
  } catch (err) {
    yield put(commentsLoadingError(err));
  }
}

export function* deleteArticle({ slug }) {
  yield put(deletingArticle());
  try {
    yield call(api.Article.delete, slug);
    yield put(deleteArticleCompleted());
  } catch (err) {
    yield put(deleteArticleError(err));
  }
}

export function* postComment({ slug, comment }) {
  yield put(postingComment());
  try {
    const payload = yield call(api.Comments.add, slug, comment);
    yield put(postCommentCompleted(payload));
  } catch (err) {
    yield put(postCommentError(err));
  }
}

export default function* articleData() {
  yield takeLatest(FETCH_ARTICLE, getArticle);
  yield takeLatest(GET_ARTICLE_SLUG, getComments);
  yield takeLatest(DELETE_ARTICLE, deleteArticle);
  yield takeLatest(POST_COMMENT, postComment);
}
