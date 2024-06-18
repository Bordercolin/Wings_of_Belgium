import React from "react";
import ArticleContent from "../../components/global/event-news/ArticleContent";
import MenuButton from "../../components/global/buttons/MenuButton";
import { Helmet } from "react-helmet";

export default function News() {
  return (
    <>
      <Helmet>
        <title>News</title>
      </Helmet>
      <nav>
        <MenuButton />
      </nav>
      <div>
        <ArticleContent />
      </div>
    </>
  );
}
