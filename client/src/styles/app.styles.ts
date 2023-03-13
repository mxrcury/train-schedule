import styled from "@emotion/styled"

export const button = {
    height: '55px',
    marginRight: '30px',
    marginLeft: '5px'
}

export const alert = {position:'absolute', bottom:0}

export const headTitle = { textAlign: 'center', marginBottom: '50px' }

export const newScheduleContainer = {display:"flex", justifyContent:"center", alignItems:"center", mb:'40px'}

export const TrainScheduleListContainer = {display:"flex", justifyContent:"center",alignItems:"center"}

export const SearchFormContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

export const Item = styled('div')(() => ({
    marginRight: '10px',
    '&:last-child': {
        marginRight: 0
    }
}))