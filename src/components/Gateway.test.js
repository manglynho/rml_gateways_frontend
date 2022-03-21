import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Gateway from './Gateway'

describe('<Gateway />', () => {
  let component

  beforeEach(() => {
    const gateway = {
      title: 'S111000',
      author: 'TP-LINK',
      url: '192.168.3.3',
    }

    component = render(
      <Gateway gateway={gateway}/>
    )
  })

  test('at start moreDataPanel are not displayed', () => {
    const div = component.container.querySelector('.moreDataPanel')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, moreDataPanel are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.moreDataPanel')
    expect(div).not.toHaveStyle('display: none')
  })

})

