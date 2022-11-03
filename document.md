# Note

```js
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
}

function createStore() {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state

  const getState = () => state

  const subscribe = () => {
    
  }

  return {
    getState
  }
}
```


/**
 * useLayoutEffect
 * Bạn sẽ gây ra 1 event (thay đổi state/props, re-render từ component cha,...)
 * Render component.
 * Chạy useLayoutEffect, và react sẽ đợi đến khi nào nó hoàn thành.
 * Màn hình UI được cập nhật.
 */

/**
 * useEffect
 * Bạn sẽ gây ra 1 event (thay đổi state/props, re-render từ component cha,...)
 * Render component.
 * Màn hình UI được cập nhật.
 * Chạy useEffect.
 */

<!-- nho mat khau firebase -->
 firebase.auth().setPersistence(this.remember.checked ? fireauth.Auth.Persistence.LOCAL : fireauth.Auth.Persistence.SESSION)