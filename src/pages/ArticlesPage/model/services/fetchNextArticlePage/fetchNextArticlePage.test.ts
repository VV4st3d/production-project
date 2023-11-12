import {TestAsyncThunk} from "shared/config/Tests/TestAsyncThunk/TestAsyncThunk";
import {fetchNextArticlePage} from "./fetchNextArticlePage";
import {fetchArticlesList} from "../fetchArticlesList/fetchArticlesList";


jest.mock('../fetchArticlesList/fetchArticlesList')

describe('fetchNextArticlesPage.test', ()=>{
    test('success', async ()=>{
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage:{
                page: 2,
                ids: [],
                entities:{},
                limit: 5,
                isLoading: false,
                hasMore: true
            }
        })

        await thunk.callFunc()

        expect(thunk.dispatch).toBeCalledTimes(4)
        expect(fetchArticlesList).toBeCalledWith({page: 3})
    })
    test('fetchArticleList not called', async ()=>{
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage:{
                page: 2,
                ids: [],
                entities:{},
                limit: 5,
                isLoading: false,
                hasMore: false
            }
        })

        await thunk.callFunc()

        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })
    test('fetchArticleList not called with isLoading', async ()=>{
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage:{
                page: 2,
                ids: [],
                entities:{},
                limit: 5,
                isLoading: true,
                hasMore: true
            }
        })

        await thunk.callFunc()

        expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()
    })
})
