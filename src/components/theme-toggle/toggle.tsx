/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 **/

import React, { FunctionComponent, MouseEvent, TouchEvent, useState, useRef, FocusEvent } from 'react'
import styled from 'styled-components'
import { Icon } from '../icon'

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts
function pointerCoord(event: MouseEvent & TouchEvent) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    const changedTouches = event.changedTouches
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0]
      return { x: touch.clientX, y: touch.clientY }
    }
    const pageX = event.pageX
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY }
    }
  }
  return { x: 0, y: 0 }
}

interface ToggleInterface {
  checked: boolean
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onChange?: () => void
  className?: string
}

interface Touch {
  moved: boolean
  startX: number | null
  started: boolean
  hadFocusAtStart: boolean
}

const ToggleContainer = styled.div<{ hasFocus: boolean }>`
  touch-action: pan-x;

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  .screen-reader-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .track {
    position: relative;
    width: 50px;
    height: 24px;
    padding: 0;
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.background.color};
    border: 2px solid ${({ theme }) => theme.palette.foreground.color};
    transition: ${({ theme }) => theme.transition(['border', 'background-color'])};
  }

  .track-icon {
    position: absolute;
    width: 18px;
    height: 18px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    transition: ${({ theme }) => theme.transition('opacity', 250)};
  }

  .track-check {
    opacity: ${({ theme }) => (theme.isDark ? 1 : 0)};
    color: ${({ theme }) => theme.palette.secondary.color};
    left: 2px;
  }

  .track-x {
    opacity: ${({ theme }) => (theme.isDark ? 0 : 1)};
    color: ${({ theme }) => theme.palette.primary.color};
    right: 2px;
  }

  .thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.foreground.color};
    box-sizing: border-box;
    transition: ${({ theme }) => theme.transition(['transform', 'box-shadow'], 500)},
      ${({ theme }) => theme.transition('background-color', 250)};
    transform: ${({ theme }) => (theme.isDark ? `translateX(26px)` : 'translateX(0)')};
    ${({ hasFocus, theme }) => hasFocus && `box-shadow: 0px 0px 2px 3px ${theme.palette.primary.color};`}
  }

  svg {
    transition: none;
    font-size: 18px;
  }

  &:active .thumb {
    box-shadow: 0px 0px 5px 5px ${({ theme }) => theme.palette.primary.color};
  }
`

export const Toggle: FunctionComponent<ToggleInterface> = ({ checked, onFocus, onBlur, className, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const touch = useRef<Touch>({
    moved: false,
    startX: null,
    started: false,
    hadFocusAtStart: false,
  })
  const [hasFocus, setHasFocus] = useState(false)

  const handleClick = (event: MouseEvent) => {
    const input = inputRef.current!
    if (event.target !== input && !touch.current.moved) {
      event.preventDefault()
      input.focus()
      input.click()
      return
    }
  }

  const handleTouchStart = (event: MouseEvent | TouchEvent) => {
    touch.current = {
      ...touch.current,
      startX: pointerCoord(event as any).x,
      started: true,
      hadFocusAtStart: hasFocus,
    }
    setHasFocus(true)
  }

  const handleTouchMove = (event: MouseEvent | TouchEvent) => {
    if (!touch.current.started) return
    touch.current = { ...touch.current, moved: true }
    if (touch.current.startX !== null) {
      const currentX = pointerCoord(event as any).x
      if (checked && currentX + 15 < touch.current.startX) {
        touch.current = { ...touch.current, startX: currentX }
      } else if (!checked && currentX - 15 > touch.current.startX) {
        touch.current = { ...touch.current, startX: currentX }
      }
    }
  }

  const handleTouchEnd = (event: MouseEvent | TouchEvent) => {
    if (!touch.current.moved) return
    const input = inputRef.current!
    event.preventDefault()

    if (touch.current.startX !== null) {
      input.click()
      touch.current = {
        ...touch.current,
        started: false,
        startX: null,
        moved: false,
      }
    }

    if (!touch.current.hadFocusAtStart) {
      setHasFocus(false)
    }
  }

  const handleTouchCancel = (event: MouseEvent | TouchEvent) => {
    if (touch.current.startX !== null) {
      touch.current = {
        ...touch.current,
        started: false,
        startX: null,
        moved: false,
      }
    }

    if (!touch.current.hadFocusAtStart) {
      setHasFocus(false)
    }
  }

  const handleFocus = (event: FocusEvent) => {
    if (onFocus) onFocus(event)

    touch.current = { ...touch.current, hadFocusAtStart: true }
    setHasFocus(true)
  }

  const handleBlur = (event: FocusEvent) => {
    if (onBlur) onBlur(event)

    touch.current = { ...touch.current, hadFocusAtStart: false }
    setHasFocus(false)
  }

  return (
    <ToggleContainer
      className={className}
      hasFocus={hasFocus}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className="track">
        <div className="track-icon track-check">
          <Icon.Moon />
        </div>
        <div className="track-icon track-x">
          <Icon.Sun />
        </div>
      </div>
      <div className="thumb" />

      <input
        ref={ref => {
          inputRef.current = ref
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className="screen-reader-only"
        type="checkbox"
        aria-label="Switch between Dark and Light mode"
      />
    </ToggleContainer>
  )
}
