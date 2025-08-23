// Rate Limiting Utility for Production
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
  statusCode?: number;
    }
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig {
    this.config = {
      windowMs: 15 * 60 * 1000, // 15 minutes default
      maxRequests: 100, message: 'Too many requests, please try again later.', statusCode: 429,
      ...config 
    };
  }

  // Check if request is allowed
  isAllowed(identifier: string: { allowed: boolean; remaining: number; resetTime: number 
    } {
    const now = Date.now();
    const key = this.getKey(identifier);
    
    if (!this.store[key] || now > this.store[key].resetTime) {
      // Reset or create new entry
      this.store[key] = {
        count: 1, resetTime: now + this.config.windowMs 
    };
      return {
        allowed: true, remaining: this.config.maxRequests - 1, resetTime: this.store[key].resetTime };
    }

    if (this.store[key].count >= this.config.maxRequests) {
      return {
        allowed: false, remaining: 0, resetTime: this.store[key].resetTime };
    }

    // Increment count
    this.store[key].count++;
    
    return {
      allowed: true, remaining: this.config.maxRequests - this.store[key].count, resetTime: this.store[key].resetTime 
    };
  }

  // Get rate limit info
  getInfo(identifier: string: { count: number; remaining: number; resetTime: number 
    } {
    const key = this.getKey(identifier);
    const entry = this.store[key];
    
    if (!entry) {
      return {
        count: 0, remaining: this.config.maxRequests, resetTime: Date.now() + this.config.windowMs };
    }

    return {
      count: entry.count, remaining: Math.max(0, this.config.maxRequests - entry.count), resetTime: entry.resetTime };
  }

  // Reset rate limit for an identifier
  reset(identifier: string: void {
    const key = this.getKey(identifier);
    delete this.store[key];
    }
  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key =>) {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
    }
    });
  }

  // Get storage size
  getSize(): number {
    return Object.keys(this.store).length;
    }
  private getKey(identifier: string: string {
    return `rate_limit:${identifier}`;
  }
}

// API Rate Limiter
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, message: 'API rate limit exceeded. Please try again later.'

    });

// Authentication Rate Limiter
export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, message: 'Too many authentication attempts. Please try again later.'

    });

// File Upload Rate Limiter
export const uploadRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, message: 'Too many file uploads. Please try again later.'

    });

// Assessment Creation Rate Limiter
export const assessmentRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 20, message: 'Too many assessment creations. Please try again later.'

    });

// Rate limiting middleware for API calls
export const withRateLimit = (
  rateLimiter: RateLimiter, identifier: string, callback: () => Promise<any>
): Promise<any> => {
  const result = rateLimiter.isAllowed(identifier);
  
  if (!result.allowed) {
    return Promise.reject(new Error(rateLimiter.config.message));
    }
  return callback();
};

// Rate limiting hook for React components
export const useRateLimit = (rateLimiter: RateLimiter, identifier: string) => {
  const checkRateLimit = () => {
    return rateLimiter.isAllowed(identifier);
  
    };

  const getRateLimitInfo = () => {
    return rateLimiter.getInfo(identifier);
  };

  const resetRateLimit = () => {
    rateLimiter.reset(identifier);
  };

  return {
    checkRateLimit, getRateLimitInfo, resetRateLimit };
};

// Cleanup expired rate limit entries every 5 minutes
setInterval(() => {
  apiRateLimiter.cleanup();
  authRateLimiter.cleanup();
  uploadRateLimiter.cleanup();
  assessmentRateLimiter.cleanup();

    }, 5 * 60 * 1000);

export default RateLimiter;