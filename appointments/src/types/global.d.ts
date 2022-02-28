export interface Appointment extends NewAppointment {
  id: string | number
}

export interface NewAppointment {
  date: Date | string
  email: string
  ownerName: string
  petName: string
  phone?: string
  symptoms: string
}
