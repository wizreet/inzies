/**
 * Performance utilities for optimized client-side operations
 * @module utils/performance
 */

/**
 * Creates a memoized version of a function that caches results
 * @template T - Arguments tuple type
 * @template R - Return type
 * @param fn - Function to memoize
 * @param keyFn - Optional function to generate cache key from arguments
 * @returns Memoized function with cache control methods
 *
 * @example
 * ```ts
 * const expensiveCalc = memoize((n: number) => {
 *   // expensive computation
 *   return n * n;
 * });
 *
 * expensiveCalc(5); // Computed
 * expensiveCalc(5); // Cached
 * expensiveCalc.clear(); // Clear cache
 * ```
 */
export function memoize<T extends unknown[], R>(
	fn: (...args: T) => R,
	keyFn: (...args: T) => string = (...args) => JSON.stringify(args)
): ((...args: T) => R) & { clear: () => void; has: (...args: T) => boolean } {
	const cache = new Map<string, R>();

	const memoized = (...args: T): R => {
		const key = keyFn(...args);

		if (cache.has(key)) {
			return cache.get(key) as R;
		}

		const result = fn(...args);
		cache.set(key, result);
		return result;
	};

	memoized.clear = () => cache.clear();
	memoized.has = (...args: T) => cache.has(keyFn(...args));

	return memoized;
}

/**
 * Creates a debounced function that delays execution
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function with cancel method
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   // API call
 * }, 300);
 *
 * input.addEventListener('input', (e) => debouncedSearch(e.target.value));
 * ```
 */
export function debounce<T extends unknown[]>(
	fn: (...args: T) => void,
	delay: number
): ((...args: T) => void) & { cancel: () => void; flush: () => void } {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let lastArgs: T | null = null;

	const debounced = (...args: T): void => {
		lastArgs = args;

		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			fn(...args);
			timeoutId = null;
			lastArgs = null;
		}, delay);
	};

	debounced.cancel = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
			lastArgs = null;
		}
	};

	debounced.flush = () => {
		if (timeoutId !== null && lastArgs !== null) {
			clearTimeout(timeoutId);
			fn(...lastArgs);
			timeoutId = null;
			lastArgs = null;
		}
	};

	return debounced;
}

/**
 * Creates a throttled function that limits execution rate
 * @param fn - Function to throttle
 * @param limit - Minimum time between executions in milliseconds
 * @returns Throttled function
 *
 * @example
 * ```ts
 * const throttledScroll = throttle(() => {
 *   // Handle scroll
 * }, 100);
 *
 * window.addEventListener('scroll', throttledScroll);
 * ```
 */
export function throttle<T extends unknown[]>(
	fn: (...args: T) => void,
	limit: number
): ((...args: T) => void) & { cancel: () => void } {
	let inThrottle = false;
	let lastArgs: T | null = null;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const throttled = (...args: T): void => {
		if (!inThrottle) {
			fn(...args);
			inThrottle = true;

			timeoutId = setTimeout(() => {
				inThrottle = false;
				if (lastArgs !== null) {
					throttled(...lastArgs);
					lastArgs = null;
				}
			}, limit);
		} else {
			lastArgs = args;
		}
	};

	throttled.cancel = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		inThrottle = false;
		lastArgs = null;
	};

	return throttled;
}

/**
 * Schedules a callback to run during idle time
 * Falls back to setTimeout in unsupported browsers
 * @param callback - Callback to execute
 * @param options - Options including timeout
 * @returns Cancel function
 */
export function onIdle(callback: () => void, options: { timeout?: number } = {}): () => void {
	if (typeof window !== "undefined" && "requestIdleCallback" in window) {
		const id = window.requestIdleCallback(callback, options);
		return () => window.cancelIdleCallback(id);
	}

	// Fallback for browsers without requestIdleCallback
	const id = setTimeout(callback, options.timeout ?? 1);
	return () => clearTimeout(id);
}

/**
 * Runs a callback on the next animation frame
 * @param callback - Callback to execute
 * @returns Cancel function
 */
export function onNextFrame(callback: () => void): () => void {
	if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
		const id = window.requestAnimationFrame(callback);
		return () => window.cancelAnimationFrame(id);
	}

	const id = setTimeout(callback, 16); // ~60fps fallback
	return () => clearTimeout(id);
}

/**
 * Creates an intersection observer with automatic cleanup
 * @param callback - Callback when elements intersect
 * @param options - IntersectionObserver options
 * @returns Object with observe, unobserve, and disconnect methods
 */
export function createIntersectionObserver(
	callback: (entries: IntersectionObserverEntry[]) => void,
	options: IntersectionObserverInit = {}
): {
	observe: (element: Element) => void;
	unobserve: (element: Element) => void;
	disconnect: () => void;
} | null {
	if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
		return null;
	}

	const observer = new IntersectionObserver(callback, options);

	return {
		observe: (element) => observer.observe(element),
		unobserve: (element) => observer.unobserve(element),
		disconnect: () => observer.disconnect(),
	};
}

/**
 * Preloads an image and returns a promise
 * @param src - Image source URL
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

/**
 * Batch DOM reads/writes to prevent layout thrashing
 * @param reads - Functions that read from DOM
 * @param writes - Functions that write to DOM
 */
export function batchDOM(reads: (() => void)[], writes: (() => void)[]): void {
	// Execute all reads first
	reads.forEach((read) => read());

	// Then execute all writes
	onNextFrame(() => {
		writes.forEach((write) => write());
	});
}

/**
 * Creates a lazy initializer that defers computation until first access
 * @param initializer - Function that returns the value
 * @returns Getter function that caches the result
 */
export function lazy<T>(initializer: () => T): () => T {
	let value: T | undefined;
	let initialized = false;

	return () => {
		if (!initialized) {
			value = initializer();
			initialized = true;
		}
		return value as T;
	};
}
