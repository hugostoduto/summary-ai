import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { articleApi, useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {

  const [article, setArticle] = useState(
    {
      url: '',
      title: '',
      summary: ''
    }
  )
  const [allArticles, setAllArticles] = useState([])
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()
  const [copied, setCopied] = useState('')
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data } = await getSummary({ articleUrl: article.url })
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles]
      setArticle(newArticle)
      setAllArticles(updatedAllArticles)
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex-col w-full gap-2">
        <form onSubmit={handleSubmit} className="relative flex justify-center items-center">
          <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter  a URL" required onChange={(event) => setArticle({ ...article, url: event.target.value })} value={article.url} className="url_input peer" />
          <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" type='submit'>
            <p>↵</p>
          </button>
        </form>
        {/* historico */}
        <div className="flex mt-5 flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain' />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (<img src={loader} alt="Loader" className='h-20 2-20 object-contain' />) : error ? (
          <p className='font-intern font-bold text-black text-center'>
            Well, thats wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className="blue_gradient">
                  Summary
                </span>
              </h2>
              <div className="summary-box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo