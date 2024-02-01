import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Spinner } from '~/components/common/Spinner'

export type WarningModalLayoutProps = {
  header: string
  body: string
  loading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const WarningModalLayout: React.FC<WarningModalLayoutProps> = ({
  header,
  body,
  loading = false,
  onCancel,
  onConfirm
}) => {
  return (
    <div>
      <div className="bg-grey25 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-grey90">
              {header}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-grey90">
                {body}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-grey25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        {loading ? (
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            disabled
          >
            <Spinner />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={onConfirm}
          >
            Confirm
          </button>
        )}
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onCancel}
          // ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}