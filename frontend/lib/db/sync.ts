import { db, SyncEvent } from './index';
import { apiClient } from '../api/client';

export const syncEngine = {
  async addSyncEvent(operation: 'POST' | 'PATCH' | 'DELETE', endpoint: string, payload: any) {
    await db.syncQueue.add({
      operation,
      endpoint,
      payload,
      status: 'PENDING',
      timestamp: Date.now(),
    });
    this.processQueue();
  },

  async processQueue() {
    if (!navigator.onLine) return;

    const pendingEvents = await db.syncQueue
      .where('status')
      .anyOf('PENDING', 'FAILED')
      .sortBy('timestamp');

    for (const event of pendingEvents) {
      if (!event.id) continue;
      
      try {
        await db.syncQueue.update(event.id, { status: 'SYNCING' });

        if (event.operation === 'POST') {
          await apiClient.post(event.endpoint, event.payload);
        } else if (event.operation === 'PATCH') {
          await apiClient.patch(event.endpoint, event.payload);
        } else if (event.operation === 'DELETE') {
          await apiClient.delete(event.endpoint);
        }

        await db.syncQueue.update(event.id, { status: 'SYNCED' });
        // Optionally remove synced events after a delay to keep the queue clean
      } catch (error: any) {
        console.error('Sync failed for event', event.id, error);
        await db.syncQueue.update(event.id, { 
          status: 'FAILED',
          error: error.message || 'Unknown error'
        });
      }
    }
  }
};
