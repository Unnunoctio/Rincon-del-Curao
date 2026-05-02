import { mockState } from '@/data/mock-state'
import { MOCK_STORES_FULL, MOCK_STORES_INITIAL } from '@/data/stores'

/**
 * Backend falso que simula el endpoint GraphQL real.
 * Retorna MOCK_STORES_INITIAL o MOCK_STORES_FULL según el estado en memoria.
 *
 * Solo para desarrollo — reemplazar GRAPHQL_URL por el backend real en producción.
 */
export async function POST() {
    // Simula latencia de red
    await new Promise((r) => setTimeout(r, 10000)) // 10 seg

    const stores = mockState.useFull ? MOCK_STORES_FULL : MOCK_STORES_INITIAL

    console.log(`[mock-graphql] Retornando ${stores.length} tiendas (${mockState.useFull ? 'FULL' : 'INITIAL'})`)

    return Response.json({
        data: {
            allWebs: stores,
        },
    })
}
