import React from 'react'

export default ({ active }) => (
  <svg width="12" height="12">
    <defs>
      <circle id="a" cx="6" cy="6" r="6"/>
    </defs>

    { active &&
      <g fill="none" fillRule="evenodd">
        <use fill="#D0D0D0" xlinkHref="#a"/>
        <circle cx="26" cy="6" r="5.75" stroke="#B2B2B2" strokeWidth=".5"/>
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
