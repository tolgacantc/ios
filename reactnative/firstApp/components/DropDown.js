import React from 'react'
import {
    Dropdown
} from 'semantic-ui-react'

const friendOptions = [{
        key: 'Sleep Start',
        text: 'Sleep Start',
        value: 'SLEEP_START',
    },
    {
        key: 'Sleep Emd',
        text: 'Sleep End',
        value: 'SLEEP_END',
    },
]

const DropdownExampleSelection = () => ( <
    Dropdown placeholder = 'Select Action'
    fluid selection options = {
        friendOptions
    }
    />
)

export default DropdownExampleSelection
