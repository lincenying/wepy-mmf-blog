import wepy from 'wepy'
import { createAction } from 'redux-actions'

export const getArticle = createAction('getArticle', async ({ id }) => {
    const { data: { code, data } } = await wepy.request(`https://www.mmxiaowu.com/api/frontend/article/item?id=${id}&markdown=1`)
    if (code === 200) {
        return {
            item: data
        }
    }
})
