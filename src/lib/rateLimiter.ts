// Rate Limiting Implementation
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyGenerator?: (req: any) => string;
    }
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private config: RateLimitConfig;

  constructor(config): RateLimitConfig {
    this.config = config;
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
    }
  isAllowed(key: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    // If no entry or entry is expired, create new one
    if (!entry || now > entry.resetTime) {
      const newEntry: RateLimitEntry = {
        count: 1, resetTime: now + this.config.windowMs 
    };
      this.store.set(key, newEntry);
      
      return {
        allowed: true, remaining: this.config.maxRequests - 1, resetTime: newEntry.resetTime };
    }

    // Check if limit exceeded
    if (entry.count >= this.config.maxRequests) {
      return {
        allowed: false, remaining: 0, resetTime: entry.resetTime 
    };
    }

    // Increment count
    entry.count++;
    this.store.set(key, entry);

    return {
      allowed: true, remaining: this.config.maxRequests - entry.count, resetTime: entry.resetTime 
    };
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

// Pre-configured rate limiters
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // 100 requests per 15 minutes 
    });

export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // 5 login attempts per 15 minutes 
    });

export const uploadRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10 // 10 uploads per minute 
    });

// Utility function to get client identifier
export const getClientId = (): string => {
  // In a real app, you might use IP address, user ID, or session ID
  // For client-side rate limiting, we'll use a combination of factors
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  
  // Create a simple hash of browser characteristics
  const identifier = btoa(`${userAgent 
    }-${language }-${platform }`).slice(0, 16);
  return identifier;
};