# Redux-Saga

[官方中文链接](http://leonshi.com/redux-saga-in-chinese/index.html)
[Github链接](https://github.com/redux-saga/redux-saga)

## 1 基本过程

UI页面

```
    class UserComponent extends Component {
        ...
        onSomeButtonClicked() {
            const { userId, dispatch } = this.props
            dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
        }
        ...
    }
```

Saga.js创建监听这个Action的事件

```
    import { takeEvery, takeLatest } from 'redux-saga'
    import { call, put } from 'redux-saga/effects'
    import Api from '...'

    // workder Saga : 将在 USER_FETCH_REQUESTED action 被发起时调用
    function* fetchUser(action) {
        try {
            const user = yield call(Api.fetchUser, action.payload.userId);
            yield put({type: "USER_FETCH_SUCCEEDED", user: user});
        } catch (e) {
            yield put({type: "USER_FETCH_FAILED", message: e.message});
        }
    }

    /*
    在每个 `USER_FETCH_REQUESTED` action 被发起时调用 fetchUser
    允许并发（译注：即同时处理多个相同的 action）
    */
    function* mySaga() {
        yield* takeEvery("USER_FETCH_REQUESTED", fetchUser);
    }

    /*
    也可以使用 takeLatest

    不允许并发，发起一个 `USER_FETCH_REQUESTED` action 时，
    如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
    那么处理中的 action 会被取消，只会执行当前的
    */
    function* mySaga() {
        yield* takeLatest("USER_FETCH_REQUESTED", fetchUser);
    }
```

连接store

```
    import { createStore, applyMiddleware } from 'redux'
    import createSagaMiddleware from 'redux-saga'

    import reducer from './reducers'
    import mySaga from './sagas'

    const sagaMiddleware = createSagaMiddleware(mySaga)
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    )

    // render the application
```
