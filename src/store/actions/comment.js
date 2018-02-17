import wepy from 'wepy'
import { createAction } from 'redux-actions'
import api from '@/api'
import config from '@/config'

export const getComments = createAction('getComments', async ({ id, page }) => {
    const { code, data } = await api.get(`frontend/comment/list?id=${id}&page=${page}&limit=10`)
    if (code === 200) {
        return {
            ...data,
            page
        }
    }
})
export const insertComments = createAction('insertComments', payload => payload)
