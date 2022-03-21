import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import GatewayForm from './GatewayForm'

test('<GatewayForm /> inputs data and calls onSubmit', () => {
  const createGateway = jest.fn()

  const component = render(
    <GatewayForm createGateway={createGateway} />
  )

  const serial = component.container.querySelector('#serial')
  const name = component.container.querySelector('#name')
  const ip_v4 = component.container.querySelector('#ip_v4')
  const form = component.container.querySelector('form')

  fireEvent.change(serial, {
    target: { value: 'S111000' }
  })
  fireEvent.change(name, {
    target: { value: 'TP-LINK' }
  })
  fireEvent.change(ip_v4, {
    target: { value: '192.168.3.3' }
  })
  fireEvent.submit(form)

  expect(createGateway.mock.calls).toHaveLength(1)
  expect(createGateway.mock.calls[0][0].serial).toBe('S111000' )
  expect(createGateway.mock.calls[0][0].name).toBe('TP-LINK' )
  expect(createGateway.mock.calls[0][0].ip_v4).toBe('192.168.3.3' )
})