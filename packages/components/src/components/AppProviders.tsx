import React from 'react'
import ReduxProvider from '@wora/redux/lib/react/ReduxProvider'

import { HelmetProvider } from '../libs/helmet'
import { SafeAreaProvider } from '../libs/safe-area-view'
import { configureStore } from '../redux/store'
import { ColumnFiltersProvider } from './context/ColumnFiltersContext'
import { ColumnFocusProvider } from './context/ColumnFocusContext'
import { ColumnWidthProvider } from './context/ColumnWidthContext'
import { DeepLinkProvider } from './context/DeepLinkContext'
import { AppLayoutProvider } from './context/LayoutContext'
import { ThemeProvider } from './context/ThemeContext'

const { store } = configureStore()

export interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders(props: AppProvidersProps) {
  return (
    <HelmetProvider>
      <ReduxProvider store={store} loading={null}>
          <DeepLinkProvider>
            <AppLayoutProvider>
              <ColumnFocusProvider>
                <ColumnFiltersProvider>
                  <ColumnWidthProvider>
                    <ThemeProvider>
                      <SafeAreaProvider>{props.children}</SafeAreaProvider>
                    </ThemeProvider>
                  </ColumnWidthProvider>
                </ColumnFiltersProvider>
              </ColumnFocusProvider>
            </AppLayoutProvider>
          </DeepLinkProvider>
      </ReduxProvider>
    </HelmetProvider>
  )
}
