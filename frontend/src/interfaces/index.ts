
export interface EventResult {
  id?: number
  title: string
  date: string
  city: string
  tickets: Ticket[]
}

interface Ticket {
  barcode: string
  firstName: string
  lastName: string
}