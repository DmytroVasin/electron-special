import React from 'react'

export default ({ hover, active }) => (
  <svg width="12" height="12">
    <defs>
      <circle id="a" cx="6" cy="6" r="6"/>
    </defs>

    { active &&
      <g fill="none" fillRule="evenodd">
        <use fill="#2ACB42" xlinkHref="#a"/>
        <circle cx="6" cy="6" r="5.75" stroke="#1BAC2C" strokeWidth=".5"/>

        { hover &&
          <path fill="#11661E" d="M3.01 4.54L7.43 9H3.31a.3.3 0 0 1-.3-.3V4.54zM9.03 7.49L4.61 3.03h4.12c.17 0 .3.13.3.3v4.16z"/>
        }
      </g>
    }

    { !active &&
      <g fill="none" fillRule="evenodd" fillOpacity=".5">
        <use fill="#D0D0D0" xlinkHref="#a"/>
        <circle cx="26" cy="6" r="5.75" stroke="#B2B2B2" strokeWidth=".5" fillOpacity=".5"/>
      </g>
    }
  </svg>
)
