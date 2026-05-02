import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

/**
 * Estado persistido en disco para la simulación del backend.
 * Usa un archivo en .next/ para sobrevivir entre módulos y reinicios.
 * Solo para desarrollo — no existe en producción.
 */
const STATE_FILE = join(process.cwd(), '.next', 'mock-state.json')

function read(): boolean {
    try {
        if (!existsSync(STATE_FILE)) return false
        const data = JSON.parse(readFileSync(STATE_FILE, 'utf-8'))
        return data.useFull ?? false
    } catch {
        return false
    }
}

function write(useFull: boolean) {
    try {
        writeFileSync(STATE_FILE, JSON.stringify({ useFull }))
    } catch {
        console.warn('[mock-state] No se pudo escribir el estado')
    }
}

export const mockState = {
    get useFull() {
        return read()
    },
    setFull() {
        write(true)
        console.log('[mock] Estado → MOCK_STORES_FULL (12 tiendas)')
    },
    reset() {
        write(false)
        console.log('[mock] Estado → MOCK_STORES_INITIAL (5 tiendas)')
    },
}
