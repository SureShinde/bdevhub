import immer from 'immer'
import _ from 'lodash'

import { BannerMessage } from '@devhub/core'
import { REHYDRATE } from '@wora/redux';
import { Reducer } from '../types'

export interface State {
  banners: BannerMessage[]
}

const initialState: State = {
  banners: [],
}

export const appReducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE as any: {
      return {
        ...state,
        banners: _.uniqBy(
          ((state && state.banners) || [])
            .concat(initialState.banners)
            .map(banner => {
              if (!(banner && banner.id)) return banner
              if (banner.id === 'join_our_slack') return
              if (banner.id === 'new_layout_mode') return

              const updatedBanner = initialState.banners.find(
                b => b.id === banner.id,
              )
              if (updatedBanner) {
                return {
                  ...banner,
                  ..._.omit(updatedBanner, ['closedAt', 'createdAt']),
                }
              }

              return banner
            })
            .filter(Boolean) as State['banners'],
          'id',
        ),
      }
    }

    case 'CLOSE_BANNER_MESSAGE':
      return immer(state, draft => {
        draft.banners = draft.banners || []

        draft.banners.forEach(banner => {
          if (!(banner && banner.id === action.payload)) return

          banner.closedAt = new Date().toISOString()
        })
      })

    default:
      return state
  }
}
