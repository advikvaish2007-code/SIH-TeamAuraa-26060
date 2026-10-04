import Dexie, { Table } from 'dexie';

export interface Station {
  id: number;
  name: string;
  location: string;
  established: string;
}

export interface Alert {
  id: number;
  station_id: number;
  title: string;
  description: string;
  severity: string;
  affected_system: string;
  status: string;
  created_at: string;
  acknowledged_at?: string | null;
  resolved_at?: string | null;
}

export interface SyncEvent {
  id?: number;
  operation: 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  payload: any;
  status: 'PENDING' | 'SYNCING' | 'FAILED' | 'SYNCED';
  timestamp: number;
  error?: string;
}

export interface InventoryItem {
  id: number;
  station_id: number;
  item_name: string;
  category: string;
  quantity: number;
  minimum_quantity: number;
  unit: string;
}

export class PolarOpsDB extends Dexie {
  stations!: Table<Station, number>;
  alerts!: Table<Alert, number>;
  inventory!: Table<InventoryItem, number>;
  syncQueue!: Table<SyncEvent, number>;

  constructor() {
    super('PolarOpsDatabase');
    this.version(2).stores({
      stations: 'id, name',
      alerts: 'id, station_id, status',
      inventory: 'id, station_id, category',
      syncQueue: '++id, status, timestamp'
    });
  }
}

export const db = new PolarOpsDB();
