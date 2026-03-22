export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(new RegExp(`(?:^|;)\\s*${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : null
}

export function setCookie(name: string, value: string, maxAge = 60 * 60 * 24 * 365) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`
}
