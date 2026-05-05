import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

import { dev } from '$app/environment';

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();