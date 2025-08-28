'use client'

import { NextUIProvider } from '@nextui-org/react'
import { FilterProvider } from '@/Store/FilterContext'
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <FilterProvider>
                {children}
            </FilterProvider>
        </NextUIProvider>
    )
}