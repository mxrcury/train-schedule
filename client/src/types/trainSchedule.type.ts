export type TrainSchedule = {
    _id: string
    startingStation: string
    terminalStation: string
    departureDate:string
    arrivalDate: string
    fullTicketPrice: string
}
export type TrainScheduleOptional = {
    _id?: string
    startingStation?: string
    terminalStation?: string
    departureDate?:string
    arrivalDate?: string
    fullTicketPrice?: string
}