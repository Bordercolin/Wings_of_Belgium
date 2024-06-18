import React from "react";

import newsData from "../../../data/newsData.json";
import styles from "./article.module.css";

export default function ArticleContent() {
  return (
    <div className={styles.container}>
      <h1>News</h1>
      {newsData.map((newsItem, index) => (
        <a key={`key-${index}`} className={styles.container_context} target="_blank" href={newsItem.link}>
          <div>
            <p className={styles.news_date}>{newsItem.date} </p>
          </div>
          <img src={newsItem.image} alt="" />
          <div>
            <h2 className={styles.news_Title}>{newsItem.title}</h2>
          </div>
        </a>
      ))}
    </div>
  );
}
