"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export function Modal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const dialogRef = useRef<React.ElementRef<"dialog">>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    // Disable scrolling on the body by setting overflow to hidden
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={router.back}
      className="backdrop:bg-black/10 backdrop:backdrop-blur-sm rounded-lg border-2 border-black p-10 max-w-3xl w-full h-auto"
    >
      <button onClick={router.back} className="fixed top-6 right-6 bg-slate-50 rounded-full p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div>{ children }</div>
    </dialog>,
    document.getElementById('modal-root')!
  )
}
