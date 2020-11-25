import { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import wordsToNumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles'
const ALAN_KEY = '6d72f89563d0d24946cf63b8a302c2ba2e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const classes = useStyles()
  useEffect(() => {
    alanBtn({
      key: ALAN_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
        }
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        }
        else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  }, [])
  return (
    <div className={classes.logoContainer}>
      {/* <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" /> */}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
