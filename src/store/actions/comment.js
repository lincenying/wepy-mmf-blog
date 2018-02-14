import wepy from 'wepy'
import { createAction } from 'redux-actions'

export const getComments = createAction('getComments', async ({ id, page }) => {
    const { data: { code, data } } = await wepy.request(`https://www.mmxiaowu.com/api/frontend/comment/list?id=${id}&page=${page}&limit=10`)
    if (code === 200) {
        return {
            ...data,
            page
        }
    }
})
