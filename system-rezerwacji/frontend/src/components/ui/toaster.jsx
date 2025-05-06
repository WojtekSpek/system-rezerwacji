'use client'

import {
  Button,
  Toaster as ChakraToaster,
  Portal,
  ProgressCircle,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}



export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }} whiteSpace='pre-line'>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }} >
            {toast.type === 'loading' ? (
              <ProgressCircle.Root value={null} size="sm" color='blue.solid'>
                <ProgressCircle.Circle>
                  <ProgressCircle.Track />
                  <ProgressCircle.Range />
                </ProgressCircle.Circle>
              </ProgressCircle.Root>
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {_optionalChain([
              toast,
              'access',
              (_) => _.meta,
              'optionalAccess',
              (_2) => _2.closable,
            ]) && <Toast.CloseTrigger/>}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
