import styled from "@emotion/styled"

export const button = {
    height: '55px',
    marginRight: '30px',
    marginLeft: '5px'
}


export const Item = styled('div')(() => ({
    marginRight: '10px',
    '&:last-child': {
        marginRight: 0
    }
}))