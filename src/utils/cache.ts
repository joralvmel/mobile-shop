interface CacheItem<T> {
    data: T;
    timestamp: number;
}

const CACHE_DURATION = 60 * 60 * 1000;

class Cache {
    private getItem<T>(key: string): CacheItem<T> | null {
        try {
            const item = localStorage. getItem(key);
            if (!item) return null;
            return JSON.parse(item);
        } catch {
            return null;
        }
    }

    private setItem<T>(key: string, data: T): void {
        try {
            const item:  CacheItem<T> = {
                data,
                timestamp:  Date.now(),
            };
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('Error saving to cache:', error);
        }
    }

    get<T>(key: string): T | null {
        const item = this.getItem<T>(key);

        if (!item) return null;

        const now = Date.now();
        const isExpired = now - item.timestamp > CACHE_DURATION;

        if (isExpired) {
            this.remove(key);
            return null;
        }

        return item. data;
    }

    set<T>(key: string, data: T): void {
        this.setItem(key, data);
    }

    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from cache:', error);
        }
    }

    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing cache:', error);
        }
    }
}

export const cache = new Cache();
