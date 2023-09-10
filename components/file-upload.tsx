'use client'

import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'

import { UploadthingRouter } from '@/app/api/uploadthing/core'
import { Button } from '@/components/ui/button'

type Props = {
  endpoint: keyof UploadthingRouter
  value: string
  onChange: (url: string | null) => void
  disabled?: boolean
}

export function FileUpload({ onChange, value, endpoint, disabled }: Props) {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className='flex w-full flex-col items-center gap-5'>
        <div className='relative w-40 h-40'>
          <Image
            src={value}
            alt='Upload'
            fill
            className='rounded-full'
          />
        </div>

        <Button
          variant='destructive'
          type='button'
          disabled={disabled}
          onClick={onChange.bind(null, '')}>
          remover
        </Button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url || null)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
