import React from 'react'

export default ({ hover, active }) => (
  <svg width="12" height="12">
    <defs>
      <circle id="a" cx="6" cy="6" r="6"/>
    </defs>

    { active &&
      <g fill="none" fillRule="evenodd">
        <use fill="#FF6157" xlinkHref="#a"/>
        <circle cx="6" cy="6" r="5.75" stroke="#E24640" strokeWidth=".5"/>

        { hover &&
          <g stroke="#4D0000" strokeLinecap="square" strokeWidth=".8">
            <path d="M3.53 3.5l4.95 4.95M8.48 3.5L3.53 8.45"/>
          </g>
        }
      </g>
    }

    { !active &&
      <g fill="none" fillRule="evenodd" fillOpacity=".5">
        <use fill="#D0D0D0" xlinkHref="#a"/>
        <circle cx="26" cy="6" r="5.75" stroke="#B2B2B2" strokeWidth=".5"/>
      </g>
    }
  </svg>
)
