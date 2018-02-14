import wepy from 'wepy'
import { createAction } from 'redux-actions'

export const getTopics = createAction('getTopics', async ({ page }) => {
    const { data: { code, data } } = await wepy.request(`https://www.mmxiaowu.com/api/frontend/article/list?page=${page}&limit=10`)
    if (code === 200) {
        return {
            ...data,
            page
        }
    }
})
