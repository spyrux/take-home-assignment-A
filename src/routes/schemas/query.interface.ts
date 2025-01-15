import { IFormData } from "./formData.interface"

export interface IQuery {
    id: string
    title: string
    description?: string | null
    createdAt: Date
    updatedAt: Date
    status: 'OPEN' | 'RESOLVED'
    formData?: IFormData
    formDataId: string
  }
  
export interface IQueryRequest {
    title: string
    description?: string
    formDataId: string
}