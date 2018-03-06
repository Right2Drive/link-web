import * as R from 'ramda'

import { groupMsgsByUser, filterMostRecentMsg } from './messages'

export const indexUserById = R.indexBy(R.prop('userId'))

export const indexUsersWithRecentMsg = R.curry((users, messages, activeUserId) => {
  const recentMsgsByUser = R.pipe(
    groupMsgsByUser(activeUserId),
    filterMostRecentMsg,
    R.map(R.pick(['message', 'lastModified']))
  )(messages)

  const indexedUsers = R.pipe(
    R.filter(R.pipe(
      R.propEq('userId', activeUserId),
      R.not
    )),
    indexUserById,
    R.map(R.pick(['name', 'username', 'color', 'userId', 'createdAt']))
  )(users)

  return R.mergeDeepRight(indexedUsers, recentMsgsByUser)
})
