import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'

const Demo = () => {
  const [article, setArticle] = useState(
    {
      url: '',
      title: '',
      summary: ''
    }
  )
  const handleSubmit = async (event) => {

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
      </div>
      {/* results */}
    </section>
  )
}

export default Demo