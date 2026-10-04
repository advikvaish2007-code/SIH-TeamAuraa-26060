'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '@/components/providers'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { syncEngine } from '@/lib/db/sync'
import { apiClient } from '@/lib/api/client'
import { Sidebar } from '@/components/polar/sidebar'
import { Topbar } from '@/components/polar/topbar'
import { PolarBackdrop } from '@/components/polar/polar-backdrop'

export default function InventoryPage() {
  const { stationId, setStationId, isOnline } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)

  // Fetch from API and update Dexie
  useEffect(() => {
    const fetchInventory = async () => {
      if (isOnline) {
        try {
          const items: any[] = await apiClient.get(`/inventory/${stationId}`)
          // Ensure table exists in Dexie (Need to add inventory to db setup, see next steps)
          // For now, let's pretend it's updating Dexie
          console.log('Fetched inventory from API:', items)
        } catch (error) {
          console.error('Failed to fetch inventory:', error)
        }
      }
    }
    fetchInventory()
  }, [stationId, isOnline])

  const handleInventoryChange = async (itemId: number, newQuantity: number) => {
    // 1. Optimistic UI update in Dexie (to be implemented)
    
    // 2. Add to Sync Queue
    await syncEngine.addSyncEvent('PATCH', `/inventory/${itemId}`, { quantity: newQuantity })
    
    alert(`Inventory change queued! Quantity updated to ${newQuantity}. (Online: ${isOnline})`)
  }

  return (
    <div className="relative isolate flex min-h-dvh text-polar-text">
      <PolarBackdrop />
      <Sidebar
        stationName={stationId === 1 ? 'Maitri' : 'Bharati'}
        region="Antarctica"
        alertCount={0}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          station={stationId === 1 ? 'maitri' : 'bharati'}
          onStationChange={(id) => setStationId(id === 'maitri' ? 1 : 2)}
          alertCount={0}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-5 md:p-6">
           <h1 className="text-2xl font-semibold mb-4">Inventory Management</h1>
           
           <div className="bg-polar-card p-6 rounded-lg border border-polar-border">
              <h2 className="text-xl mb-4">Fuel Reserve</h2>
              <p className="mb-4">Use the button below to simulate an inventory adjustment. It will instantly queue the change locally in Dexie and push to FastAPI.</p>
              
              <button 
                onClick={() => handleInventoryChange(stationId === 1 ? 1 : 2, Math.floor(Math.random() * 1000) + 2000)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
              >
                Adjust Fuel Quantity
              </button>
           </div>
        </main>
      </div>
    </div>
  )
}
