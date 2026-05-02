import { GET_ALL_WEBS } from '@/graphql/queries'
import { gql } from '@/lib/graphql'
import type { StoreInfo } from '@/types'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook de revalidación — llamado por el backend cuando cambian las tiendas.
 *
 * En simulación: también activa el cambio de INITIAL → FULL en el mock.
 * En producción: solo revalida el tag y precalienta el cache.
 */
export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidate-secret')

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // En simulación, cambiar el mock al set completo antes de revalidar
    const { mockState } = await import('@/data/mock-state')
    mockState.setFull()

    // 1. Purgar el cache del tag 'stores'
    // 'max' = perfil de máxima duración (indefinido hasta próximo revalidate)
    revalidateTag('stores', 'max')
    console.log('[revalidate] Tag "stores" invalidado')

    // 2. Precalentar el cache inmediatamente — ningún usuario pagará el costo del refetch
    const data = await gql<{ allWebs: StoreInfo[] }>(GET_ALL_WEBS)
    console.log(`[revalidate] Cache precalentado con ${data.allWebs.length} tiendas`)

    return NextResponse.json({
        revalidated: true,
        stores: data.allWebs.length,
    })
}
