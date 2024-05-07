"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

import CreateNewPost from "@/app/new-post/page"

export function Modal() {
  const router = useRouter()
  const dialogRef = useRef<React.ElementRef<"dialog">>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    e.target === dialogRef.current && router.back()

  return (
    <dialog
      ref={dialogRef}
      onClick={closeModal}
      onClose={router.back}
      className="backdrop:bg-black/10 backdrop:backdrop-blur-sm rounded-lg border-2 border-black p-10 w-auto max-w-7xl h-auto"
    >
      <CreateNewPost />
    </dialog>
  )
}