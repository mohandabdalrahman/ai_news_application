import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from './styles';

const infoCards = [
  { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  {
    color: '#1565c0',
    title: 'News by Categories',
    info:
      'Business, Entertainment, General, Health, Science, Sports, Technology',
    text: 'Give me the latest Technology news',
  },
  {
    color: '#4527a0',
    title: 'News by Terms',
    info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...',
    text: "What's up with PlayStation 5",
  },
  {
    color: '#283593',
    title: 'News by Sources',
    info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...',
    text: 'Give me the news from CNN',
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();
  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map(({ color, title, info, text }) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div className={classes.card} style={{ backgroundColor: color }}>
                <Typography variant="h6" component="h5">
                  {title}
                </Typography>
                {info ? (
                  <Typography variant="h6" component="h6">
                    <strong>{title.split(' ')[2]}</strong>: <br />
                    {info}
                  </Typography>
                ) : null}
                <Typography variant="h6" component="h6">
                  Try saying: <br /> <i>{text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard
              key={index}
              article={article}
              index={index}
              activeArticle={activeArticle}
            />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
